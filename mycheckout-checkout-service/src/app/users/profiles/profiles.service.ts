import { AccountsService } from '../../accounts/accounts.service';
import { ProfileSystemVTEXService } from '../../vtex/profile-system/profile-system.service';
import { ApiResponse } from '../../../shared/responses';
import { HttpStatus, Injectable } from '@nestjs/common';
import {
  Address,
  AddressDoc,
  AddressModel,
} from '../addresses/schemas/address.schema';
import { Card, CardDoc, CardModel } from '../cards/schemas/cards.schema';
import { UserDoc } from '../schemas/user.schema';
import { UsersService } from '../users.service';
import { CreateProfileDto } from './dtos/createProfile.dto';
import { UpdateProfileDto } from './dtos/updateProfile.dto';
import { Profile, ProfileDoc, ProfileModel } from './schemas/profile.schema';
import { NotFoundException } from '../../../shared/exceptions/not-found-exception';
import { InjectModel } from 'nestjs-dynamoose';
// import { AcceptanceHabeasDataService } from 'src/app/accounts/habeasData/acceptanceHabeasData/acceptanceHabeasData.service';
// import { HabeasDataService } from 'src/app/accounts/habeasData/habeasData.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private profileModel: ProfileModel,
    @InjectModel(Address.name) private addressModel: AddressModel,
    @InjectModel(Card.name) private cardModel: CardModel,
    // private acceptanceHabeasDataService: AcceptanceHabeasDataService,
    private accountService: AccountsService,
    // private habeasDataService: HabeasDataService,
    private profileSystemVtexService: ProfileSystemVTEXService,
    private userService: UsersService,
  ) {}

  async getProfileInfo(email: string, account: string, headers: any) {
    let user = await this.userService.getUserByEmail(email);

    const profiles = user
      ? await this.profileModel
          .query({
            user: user.id,
          })
          .exec()
      : null;

    if (!profiles || profiles.count === 0) {
      const accountDoc = await this.accountService.get({ account });
      const userVtex = await this.profileSystemVtexService.getUserInfo(
        accountDoc,
        email,
        headers,
      );

      if (
        userVtex &&
        userVtex.name &&
        userVtex.lastname &&
        userVtex.phoneNumber &&
        userVtex.documentType &&
        userVtex.document
      ) {
        if (!user) {
          user = await this.userService.create({
            email,
            account,
          });
        }
        const profile = this.profileModel.build({
          name: userVtex.name,
          lastname: userVtex.lastname,
          phoneCode: '+57',
          phoneNumber: userVtex.phoneNumber,
          documentType: userVtex.documentType,
          document: userVtex.document,
          user,
          account: accountDoc,
          habeasData: false,
          creationDate: new Date().toISOString(),
        });
        await profile.save();
        const addressesVtex =
          await this.profileSystemVtexService.getUserAddress(
            accountDoc,
            profile,
            { userId: userVtex.id },
            headers,
          );

        addressesVtex?.map((addressVtex) => {
          return {
            country: addressVtex.country,
            state: addressVtex.state,
            city: addressVtex.city,
            neighborhood: addressVtex.neighborhood,
            street: addressVtex.street,
            number: addressVtex.number,
            postalCode: addressVtex.postalCode,
            geoCoordinates: addressVtex.geoCoordinates,
            id: addressVtex.addressName,
            profileId: addressVtex.profile.id,
            reference: addressVtex.reference,
            receiverName: addressVtex.receiverName,
          };
        });

        const addresses = await this.addressModel.insertMany(addressesVtex);

        addresses?.forEach((address) => {
          address.profile = profile.id;
        });

        if (addresses && addresses.length > 0) {
          delete addresses[0].profile;
          profile.set({
            selectedAddress: addresses[0],
          });

          await profile.save();

          profile.addresses = addresses.map((address) => {
            delete address.profile;
            return this.addressModel.build(address);
          });
          profile.selectedAddress = this.addressModel.build(
            profile.selectedAddress as AddressDoc,
          );
        }

        profile.email = email;

        return profile;
      }
      throw new NotFoundException('user does not exist');
    }

    const cards = await this.cardModel
      .query({
        user: user.id,
      })
      .where('profile')
      .in(profiles.map((p) => p.id))
      .exec();

    const addresses = await this.addressModel
      .query({
        user: user.id,
      })
      .where('profile')
      .in(profiles.map((p) => p.id))
      .exec();

    // const habeasData = await this.habeasDataService.getByActiveState();

    // const acceptanceHabeasData =
    //   await this.acceptanceHabeasDataService.getByEmail(
    //     email,
    //     habeasData.version,
    //   );

    const profile = this.profileModel.build(profiles[0]);

    // if (habeasData)
    //   profile.habeasData = habeasData.version === acceptanceHabeasData?.version;

    if (profile.selectedAddress) {
      await profile.populate({
        properties: 'selectedAddress',
      });
    }
    profile.addresses = addresses;
    profile.cards = cards;
    if (profile.selectedPayment?.card) {
      if (
        cards.find(
          (card) => card.id === profile.selectedPayment.card.toString(),
        )
      ) {
        await profile.populate({
          properties: 'selectedPayment.card',
        });
      } else delete profile.selectedPayment;
    }
    profile.email = email;

    return profile;
  }

  async create(createProfileDto: CreateProfileDto, an: string) {
    const account = await this.accountService.get({ account: an });
    // const habeasData = await this.habeasDataService.getByActiveState();

    if (!account) {
      throw ApiResponse.error('errors.not_found', {}, HttpStatus.BAD_REQUEST);
    }

    let user: UserDoc = await this.userService.getUserByEmail(
      createProfileDto.email,
    );

    if (!user) {
      user = await this.userService.create({
        email: createProfileDto.email,
        account: an,
      });
    }

    let profile: ProfileDoc = await this.profileModel
      .findOne({ user: user.id })
      .exec();

    const profileDto = {
      name: createProfileDto.name,
      lastname: createProfileDto.lastname,
      document: createProfileDto.id_number,
      documentType: createProfileDto.id_type,
      phoneCode: createProfileDto.phone_code,
      phoneNumber: createProfileDto.phone_number,
      user,
      account,
      habeasData: createProfileDto.habeasData,
      creationDate: new Date().toISOString(),
    };

    if (!profile) profile = this.profileModel.build(profileDto);
    else profile.set(profileDto);

    await profile.save();

    profile.email = user.email;

    // if (profile && profile.habeasData && createProfileDto.ip) {
    //   const acceptanceHabeasDataSave = {
    //     document: createProfileDto.id_number,
    //     documentType: createProfileDto.id_type,
    //     email: user.email,
    //     ip: createProfileDto?.ip,
    //     url: habeasData.url,
    //     version: habeasData.version,
    //   };

    //   this.acceptanceHabeasDataService.create(acceptanceHabeasDataSave);
    // }

    return profile;
  }

  async update(
    profile: ProfileDoc,
    account: string,
    updateProfileDto: UpdateProfileDto,
    authToken: string,
  ) {
    let selectedPayment: { paymentMethod: string; card: string | CardDoc };
    const headers = {
      VtexIdclientAutCookie: authToken,
    };
    if (updateProfileDto.selectedPayment) {
      if (updateProfileDto.selectedPayment === 'promissory') {
        selectedPayment = {
          paymentMethod: 'promissory',
          card: null,
        };
      } else {
        selectedPayment = {
          paymentMethod: 'tc',
          card: updateProfileDto.selectedPayment,
        };
      }
    } else selectedPayment = profile.selectedPayment;
    delete updateProfileDto.email;
    profile.set({
      ...updateProfileDto,
      selectedPayment,
    });

    await profile.save();
    return ApiResponse.send(
      'responses.resource_updated',
      await this.getProfileInfo(profile.email, account, headers),
    );
  }

  getById(id: string) {
    return this.profileModel.get(id);
  }

  getByUserAccount(user: UserDoc) {
    return this.profileModel.query({ user: user.id }).exec();
  }

  async getByPhone(countryCode: number, number: number) {
    const profiles = await this.profileModel
      .query({ phoneNumber: `${number}` })
      .where('phoneCode')
      .eq(`+${countryCode}`)
      .exec();
    const emails = profiles.map((prof) =>
      this.userService.getUserById(prof?.user.toString()),
    );
    return Promise.all(emails);
  }

  async getByEmail(email: string) {
    const user = await this.userService.getUserByEmail(email);

    const profile = await this.profileModel
      .query({
        user: user.id,
      })
      .exec();

    return profile;
  }
}
