import { Test, TestingModule } from '@nestjs/testing';
import { AccountsLinksController } from './accounts-links.controller';
import { AccountsLinksService } from './accounts-links.service';

describe('AccountsLinksController', () => {
  let controller: AccountsLinksController;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: AccountsLinksService,
      useFactory: () => ({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsLinksController],
      providers: [ApiServiceProvider],
    }).compile();

    controller = module.get<AccountsLinksController>(AccountsLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
