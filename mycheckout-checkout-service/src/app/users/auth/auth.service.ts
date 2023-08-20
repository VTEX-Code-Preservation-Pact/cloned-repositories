import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';
import { MailerService } from '../../common/mailer/mailer.service';
import { SMSService } from '../../common/sms/sms.service';
import { ApiResponse } from '../../../shared/responses';
import { ProfilesService } from '../profiles/profiles.service';
import { UserDoc } from '../schemas/user.schema';
import { UsersService } from '../users.service';
import { ODTCodeData } from './dtos/odt.code.data';
import { PasswordCodes } from './dtos/password_codes.enum';
import { Auth, AuthModel } from './schemas/auth.schema';
import { InjectModel } from 'nestjs-dynamoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: AuthModel,
    private readonly usersService: UsersService,
    private profilesService: ProfilesService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly smsService: SMSService,
    private readonly i18nService: I18nService,
  ) {}

  async login(
    email: string,
    accountName: string,
    origin: string,
    authToken: string,
  ): Promise<any> {
    try {
      const user = await this.usersService.getUserByEmail(email);

      if (!user) {
        throw ApiResponse.error('errors.user_doesnt_exist');
      }

      const headers = {
        VtexIdclientAutCookie: authToken,
      };

      return this.codeAssign(user, accountName, origin, headers);
    } catch {
      throw ApiResponse.error('errors.bad_gateway');
    }
  }

  async validate(
    email: string,
    code: number,
    account: string,
    authToken: string,
  ): Promise<any> {
    try {
      const auth = await this.authModel.findOne({ email }).exec();

      if (!auth) {
        throw ApiResponse.error(
          'errors.non_existent_code',
          null,
          HttpStatus.FORBIDDEN,
        );
      }

      const passwordCode = await auth.validatePassword(String(code));

      if (passwordCode !== PasswordCodes.valid) {
        auth.set({
          attempts: auth.attempts,
          validateLockedUntil: auth.validateLockedUntil,
        });

        await auth.save();

        throw ApiResponse.error(
          `errors.${passwordCode}`,
          null,
          HttpStatus.FORBIDDEN,
        );
      } else {
        await auth.delete();
        const headers = {
          VtexIdclientAutCookie: authToken,
        };
        const profile = await this.profilesService.getProfileInfo(
          email,
          account,
          headers,
        );
        const accessToken = this.jwtService.sign(
          classToPlain({ email, id: profile.id, account }),
        );

        return ApiResponse.send('authenticated', {
          ...profile.toJSON(),
          accessToken,
        });
      }
    } catch (e) {
      if (e?.response?.message) throw e;
      throw ApiResponse.error('errors.bad_gateway');
    }
  }

  private async codeAssign(
    user: UserDoc,
    accountName: string,
    origin: string,
    headers: any,
  ) {
    const auth = await this.authModel.findOne({ email: user.email }).exec();

    const newAuth = this.authModel.build({ email: user.email });
    const password = this.authModel.generatePassword();
    if (!auth) {
      newAuth.set({
        password,
      });
      await newAuth.save();
      return this.notify(user, password, accountName, origin, headers);
    } else {
      if (auth.isLocked()) {
        throw ApiResponse.error('errors.locked_action');
      } else {
        await auth.delete();
        newAuth.set({
          password,
        });

        await newAuth.save();

        return this.notify(user, password, accountName, origin, headers);
      }
    }
  }

  private async notify(
    user: UserDoc,
    password: string,
    accountName: string,
    origin: string,
    headers: any,
  ) {
    try {
      const profile = await this.profilesService.getProfileInfo(
        user.email,
        accountName,
        headers,
      );

      const data = ODTCodeData;
      data.JsonData.to[0].email = user.email;
      data.JsonData.to[0].name = profile.name;
      data.JsonData.aditionalData.accessKey = password;

      this.mailerService.notify(data);

      // Disabling sms service notification
      // const body = await this.i18nService.translate('responses.sms_body', {
      //   args: { name: profile.name, code: password, origin },
      // });
      // this.smsService.notify({
      //   to: profile.phoneCode + profile.phoneNumber,
      //   body,
      // });

      return ApiResponse.send('responses.user_login_sent');
    } catch {
      throw ApiResponse.error('errors.internal_error');
    }
  }
}
