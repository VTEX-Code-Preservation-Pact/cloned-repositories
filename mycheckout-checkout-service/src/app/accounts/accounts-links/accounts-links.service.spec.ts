import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-dynamoose';
import { AccountsLinksService } from './accounts-links.service';
import { AccountLink } from './schemas/account-link.schema';

describe('AccountsLinksService', () => {
  let service: AccountsLinksService;

  beforeEach(async () => {
    const AccountLinkModel = {
      provide: getModelToken(AccountLink.name),
      useFactory: () => ({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsLinksService, AccountLinkModel],
    }).compile();

    service = module.get<AccountsLinksService>(AccountsLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
