import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { TransformationTrim } from 'src/shared/transform/transformation-trim.pipe';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { MaskInterceptor } from '../../../shared/interceptors/mask.interceptor';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { ExternalAddressDto } from './dtos/externalAddress.dto';

@Controller('/users/addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Post()
  create(@Body(new TransformationTrim()) createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Post('external')
  external(
    @Body() externalAddress: ExternalAddressDto,
    @Query('an') an: string,
    @Headers() headers,
  ) {
    return this.addressesService.external(
      externalAddress,
      an,
      headers.vtexidclientautcookie,
    );
  }

  @Get(':email')
  @UseInterceptors(MaskInterceptor)
  getAllByEmail(@Param('email') email, @Query('an') an: string) {
    return this.addressesService.findByEmail(email, an);
  }

  @Get('id/:id')
  get(@Param('id') id: string) {
    return this.addressesService.get(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    return this.addressesService.delete(id);
  }

  @Delete('/profile/:profileId')
  async deleteProfileAddresses(@Param('profileId') profileId: string) {
    return this.addressesService.deleteProfileAddresses(profileId);
  }
}
