import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TransformationTrim } from 'src/shared/transform/transformation-trim.pipe';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { MaskInterceptor } from '../../../shared/interceptors/mask.interceptor';
import { CreateProfileDto } from './dtos/createProfile.dto';
import { UpdateProfileDto } from './dtos/updateProfile.dto';
import { ProfilesService } from './profiles.service';

@Controller('/users/profiles')
export class ProfilesController {
  constructor(
    @Inject(REQUEST) protected readonly request: any,
    private profilesService: ProfilesService,
  ) {}

  @Get(':email')
  @UseInterceptors(MaskInterceptor)
  getProfileInfo(
    @Param('email') email: string,
    @Query('an') an: string,
    @Headers() header,
  ) {
    return this.profilesService.getProfileInfo(email, an, {
      VtexIdclientAutCookie: header.vtexidclientautcookie,
    });
  }

  @Post(`/phone`)
  @UseInterceptors(MaskInterceptor)
  getUserByPhone(
    @Body('countryCode') countryCode: number,
    @Body('number') number: number,
  ) {
    return this.profilesService.getByPhone(countryCode, number);
  }

  @Post()
  create(
    @Body(new TransformationTrim()) createProfileDto: CreateProfileDto,
    @Query('an') an: string,
  ) {
    return this.profilesService.create(createProfileDto, an);
  }

  @Put()
  @UseGuards(AuthGuard)
  update(
    @Body(new TransformationTrim()) updateProfileDto: UpdateProfileDto,
    @Headers() header,
  ) {
    return this.profilesService.update(
      this.request.user,
      this.request.account,
      updateProfileDto,
      header.vtexidclientautcookie,
    );
  }
}
