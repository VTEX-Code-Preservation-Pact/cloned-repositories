import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AccountDoc } from '../../accounts/schemas/account.schema';
import { ProfileDoc } from '../../users/profiles/schemas/profile.schema';

@Injectable()
export class ProfileSystemVTEXService {
  private readonly headers;
  constructor(private httpService: HttpService) {}

  getUserInfo(account: AccountDoc, email: string, headers: any) {
    try {
      return this.httpService
        .get(
          `https://${account.account}.vtexcommercestable.com.br/api/dataentities/CL/search`,
          {
            params: {
              email: email,
              _fields:
                'id,email,firstName,lastName,phone,homePhone,businessPhone,documentType,document',
            },
            headers: {
              ...headers,
            },
          },
        )
        .pipe(
          map((response) => {
            const phone = response.data[0].phone
              ? response.data[0].phone
              : response.data[0].homePhone
              ? response.data[0].homePhone
              : response.data[0].businessPhone
              ? response.data[0].businessPhone
              : '';
            return {
              name: response.data[0].firstName,
              lastname: response.data[0].lastName,
              email: response.data[0].email,
              phoneCode: '',
              phoneNumber: phone,
              documentType: response.data[0].documentType,
              document: response.data[0].document,
              id: response.data[0].id,
            };
          }),
        )
        .toPromise()
        .catch((error) => {
          console.log('ProfileSystemVTEXService.getUserInfo', error);
          return null;
        });
    } catch {
      return null;
    }
  }

  getUserAddress(
    account: AccountDoc,
    profile: ProfileDoc,
    params: any,
    headers: any,
  ) {
    try {
      return this.httpService
        .get(
          `https://${account.account}.vtexcommercestable.com.br/api/dataentities/AD/search`,
          {
            params: {
              ...params,
              _fields: '_all',
            },
            headers: {
              ...headers,
            },
          },
        )
        .pipe(
          map((response) => {
            const addresses = [];
            response.data.forEach((data) => {
              addresses.push({
                addressName: data.addressName,
                profile: profile,
                user: profile.user,
                country: data.country,
                state: data.state,
                city: data.city,
                neighborhood: data.neighborhood,
                street: data.street,
                number: data.number || '0',
                postalCode: data.postalCode,
                reference: data.reference,
                receiverName:
                  data.receiverName ?? `${profile.name} ${profile.lastname}`,
                addressType: data.addressType,
                geoCoordinates: data.geoCoordinate
                  ? {
                      latitude: data.geoCoordinate[1]?.toString() ?? '0',
                      longitude: data.geoCoordinate[0]?.toString() ?? '0',
                    }
                  : {
                      latitude: '0',
                      longitude: '0',
                    },
              });
            });
            return addresses;
          }),
        )
        .toPromise()
        .catch((error) => {
          console.log('ProfileSystemVTEXService.getUserAddress', error);
          return null;
        });
    } catch {
      return null;
    }
  }
}
