import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProfilesController } from './profiles/profiles.controller';
import { ProfilesService } from './profiles/profiles.service';
import { AddressesController } from './addresses/addresses.controller';
import { AddressesService } from './addresses/addresses.service';
import { CardsController } from './cards/cards.controller';
import { CardsService } from './cards/cards.service';
import { User } from './schemas/user.schema';
import { Profile } from './profiles/schemas/profile.schema';
import { Address } from './addresses/schemas/address.schema';
import { Card } from './cards/schemas/cards.schema';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { Auth } from './auth/schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VtexModule } from '../vtex/vtex.module';
import { CustomDynamooseModule } from 'src/shared/utils/dynamoose-module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    CustomDynamooseModule.forFeature([User, Auth, Profile, Card, Address]),
    AccountsModule,
    VtexModule,
  ],
  providers: [
    UsersService,
    ProfilesService,
    AddressesService,
    CardsService,
    AuthService,
  ],
  controllers: [
    UsersController,
    ProfilesController,
    AddressesController,
    CardsController,
    AuthController,
  ],
  exports: [ProfilesService, AddressesService, CardsService],
})
export class UsersModule {}
