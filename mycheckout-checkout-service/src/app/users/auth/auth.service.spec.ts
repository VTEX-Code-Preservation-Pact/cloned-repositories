import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { SMSService } from '../../common/sms/sms.service';
import { MailerService } from '../../common/mailer/mailer.service';
import { ProfilesService } from '../profiles/profiles.service';
import { UsersService } from '../users.service';
import { AuthService } from './auth.service';
import { Auth } from './schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';

const UserServiceProvider = {
  provide: UsersService,
  useFactory: () => ({}),
};

const AuthModel = {
  provide: getModelToken(Auth.name),
  useFactory: () => ({}),
};

const ProfilesServiceProvider = {
  provide: ProfilesService,
  useFactory: () => ({}),
};

const JwtServiceProvider = {
  provide: JwtService,
  useFactory: () => ({}),
};

const MailerServiceProvider = {
  provide: MailerService,
  useFactory: () => ({}),
};

const SmsServiceProvider = {
  provide: SMSService,
  useFactory: () => ({}),
};

const I18nServiceProvider = {
  provide: I18nService,
  useFactory: () => ({}),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AuthModel,
        UserServiceProvider,
        ProfilesServiceProvider,
        JwtServiceProvider,
        MailerServiceProvider,
        SmsServiceProvider,
        I18nServiceProvider,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
