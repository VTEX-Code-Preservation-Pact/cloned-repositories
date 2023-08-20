import { AuthGuard } from '../../../shared/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardDto } from './dtos/card.dto';
import { ProfileDoc } from '../profiles/schemas/profile.schema';

@Controller('users/cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get(':email')
  getAllByEmail(@Param('email') email: string, @Query('an') an: string) {
    return this.cardsService.findByEmail(email, an);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.cardsService.delete(id);
  }

  @Post()
  create(@Body() card: CardDto) {
    return this.cardsService.create(card, { id: null } as ProfileDoc);
  }

  @Post('update')
  update(@Body() card: CardDto) {
    return this.cardsService.update(card, '');
  }
}
