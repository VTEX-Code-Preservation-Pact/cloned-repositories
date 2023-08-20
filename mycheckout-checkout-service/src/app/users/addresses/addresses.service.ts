import { HttpStatus, Injectable } from '@nestjs/common';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { ProfileSystemVTEXService } from 'src/app/vtex/profile-system/profile-system.service';
import { ApiResponse } from '../../../shared/responses';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfileDoc } from '../profiles/schemas/profile.schema';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { ExternalAddressDto } from './dtos/externalAddress.dto';
import { Address, AddressDoc, AddressModel } from './schemas/address.schema';
import { findBestMatch } from 'string-similarity';
import { GatewayException } from 'src/shared/exceptions/gateway-exception';
import { UsersService } from '../users.service';
import { InjectModel } from 'nestjs-dynamoose';
import { UserDoc } from '../schemas/user.schema';
import { GeoCoordinateDto } from './dtos/geoCoordinates.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name) private addressModel: AddressModel,
    private profilesService: ProfilesService,
    private usersService: UsersService,
    private profileSystemVtexService: ProfileSystemVTEXService,
    private accountService: AccountsService,
  ) {}

  async create(createAddressDto: CreateAddressDto, isNew = false) {
    const profile = await this.profilesService.getById(
      createAddressDto.profileId,
    );

    if (!profile) {
      throw ApiResponse.error('errors.not_found', {}, HttpStatus.BAD_REQUEST);
    }

    let address: AddressDoc;

    if (createAddressDto.id && !isNew) {
      address = await this.addressModel.get(createAddressDto.id);
      if (!address) {
        address = this.addressModel.build({
          id: createAddressDto.id,
          state: createAddressDto.state,
          city: createAddressDto.city,
          country: createAddressDto.country,
          neighborhood: createAddressDto.neighborhood,
          street: createAddressDto.street,
          number: createAddressDto.number,
          postalCode: createAddressDto.postalCode,
          reference: createAddressDto.reference,
          receiverName: createAddressDto.receiverName,
          geoCoordinates: createAddressDto.geoCoordinates,
          profile,
          user: profile.user as UserDoc,
        });
      } else {
        address.set({
          state: createAddressDto.state,
          city: createAddressDto.city,
          country: createAddressDto.country,
          neighborhood: createAddressDto.neighborhood,
          street: createAddressDto.street,
          number: createAddressDto.number,
          postalCode: createAddressDto.postalCode,
          reference: createAddressDto.reference,
          receiverName: createAddressDto.receiverName,
          geoCoordinates: createAddressDto.geoCoordinates,
          profile,
        });
      }
    } else {
      address = this.addressModel.build({
        state: createAddressDto.state,
        city: createAddressDto.city,
        country: createAddressDto.country,
        neighborhood: createAddressDto.neighborhood,
        street: createAddressDto.street,
        number: createAddressDto.number,
        postalCode: createAddressDto.postalCode,
        reference: createAddressDto.reference,
        receiverName: createAddressDto.receiverName,
        geoCoordinates: createAddressDto.geoCoordinates,
        profile,
        user: profile.user as UserDoc,
        id: createAddressDto.id,
      });
    }

    try {
      await address.save();
    } catch (err) {
      console.log(err);
      throw new GatewayException('ADDRESS: Error creating address', err);
    }

    profile.set({
      selectedAddress: address.id,
    });

    await profile.save();

    address.profile = profile.id;

    return address;
  }

  async findByEmail(email: string, an: string) {
    const user = await this.usersService.getUserByEmail(email);
    const account = await this.accountService.get({ account: an });
    if (!user || !account) return [];
    const addresses = await this.addressModel.query({ user: user.id }).exec();
    return addresses.map((address) => this.addressModel.build(address));
  }

  get(id: string) {
    if (!id) return null;
    return this.addressModel.get(id);
  }

  async external(
    externalAddress: ExternalAddressDto,
    account: string,
    authToken: string,
  ) {
    let address: AddressDoc;
    const profile = await this.profilesService.getById(
      externalAddress.profileId,
    );

    if (!profile)
      throw ApiResponse.error('errors.not_found', {}, HttpStatus.BAD_REQUEST);

    if (externalAddress.addressId) {
      const headers = {
        VtexIdclientAutCookie: authToken,
      };
      const accountDoc = await this.accountService.get({ account });
      const addressVtex = await this.profileSystemVtexService.getUserAddress(
        accountDoc,
        profile,
        { addressName: externalAddress.addressId },
        headers,
      );
      if (addressVtex?.[0]) {
        const userAddresses = await this.addressModel
          .query({ profile: profile.id })
          .exec();

        const existAlternativeAddress = userAddresses.find(
          (alternativeAddress) =>
            alternativeAddress.id === addressVtex[0].addressName,
        );

        if (
          !existAlternativeAddress &&
          addressVtex[0].addressType === 'residential'
        ) {
          const newAddress: CreateAddressDto = {
            country: addressVtex[0].country as string,
            state: addressVtex[0].state as string,
            city: addressVtex[0].city as string,
            neighborhood: addressVtex[0].neighborhood as string,
            street: addressVtex[0].street as string,
            number: addressVtex[0].number as string,
            postalCode: addressVtex[0].postalCode as string,
            geoCoordinates: addressVtex[0].geoCoordinates as GeoCoordinateDto,
            id: addressVtex[0].addressName as string,
            profileId: addressVtex[0].profile.id as string,
            reference: addressVtex[0].reference as string,
            receiverName: addressVtex[0].receiverName as string,
          };

          address = await this.create(newAddress, true);
        } else if (addressVtex[0].addressType === 'residential') {
          address = existAlternativeAddress;
        }
      } else if (!externalAddress.postalCode.includes('*')) {
        const newAddress: CreateAddressDto = {
          country: externalAddress?.country,
          state: externalAddress?.state,
          city: externalAddress?.city,
          neighborhood: externalAddress?.neighborhood,
          street: externalAddress?.street,
          number: externalAddress?.number,
          postalCode: externalAddress.postalCode,
          geoCoordinates: externalAddress?.geoCoordinates,
          id: externalAddress?.addressId,
          profileId: externalAddress?.profileId,
          reference: externalAddress?.reference,
          receiverName: externalAddress?.receiverName,
        };

        address = await this.create(newAddress, true);
      }
    }

    return address?.id ? address : externalAddress;
  }

  // TODO: if it is the selected address by the user we should update it
  async delete(id: string) {
    const address = await this.addressModel.get(id);
    await address?.delete();
    return ApiResponse.send('responses.resource_deleted', address);
  }

  async deleteProfileAddresses(profileId: string) {
    const address = await this.addressModel
      .findOne({ profile: profileId })
      .exec();
    return address.delete();
  }
}
