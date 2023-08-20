import { Body, Controller, Param, Post, Query, Headers } from '@nestjs/common';
import { GeneralResponse } from '../../../shared/responses/general-response';
import { AuthService } from './auth.service';

@Controller('/users/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(`/:email`)
  async login(
    @Body('origin') origin: string,
    @Param('email') email: string,
    @Query('an') an: string,
    @Headers() headers,
  ): Promise<GeneralResponse> {
    return this.authService.login(
      email,
      an,
      origin,
      headers.vtexidclientautcookie,
    );
  }

  @Post(`/verify/:email`)
  async validate(
    @Body('code') code: number,
    @Param('email') email: string,
    @Query('an') account: string,
    @Headers() headers,
  ): Promise<GeneralResponse> {
    return this.authService.validate(
      email,
      code,
      account,
      headers.vtexidclientautcookie,
    );
  }
}
