import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/createAccount.dto';
import { createMock } from '@golevelup/ts-jest';
import { Account } from './schemas/account.schema';

describe('AccountsController', () => {
  let controller: AccountsController;
  let service: AccountsService;

  beforeEach(async () => {
    const ApiServiceProvider: Provider = {
      provide: AccountsService,
      useValue: {
        save: jest
          .fn()
          .mockImplementation((createAccountDto: CreateAccountDto) =>
            Promise.resolve({ _id: 'a uuid', ...createAccountDto }),
          ),
        get: jest
          .fn()
          .mockImplementation(({ account }: { account: string }) => {
            return Promise.resolve({
              _id: 'a uuid',
              account,
              cvcRequired: false,
              paymentMethodId: '201',
              visualization: [],
            });
          }),
        getStoreFrontSettings: jest.fn().mockImplementation(() =>
          Promise.resolve({
            cvcRequired: false,
            paymentMethodId: '201',
            visualization: [],
          }),
        ),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [ApiServiceProvider],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('save', () => {
    it('should call the service', () => {
      const createAccountDto = new CreateAccountDto();

      controller.save(createAccountDto);

      expect(service.save).toHaveBeenCalled();
    });

    it('should receive a valid body', async () => {
      const createAccountDto = new CreateAccountDto();
      createAccountDto.account = 'test';
      createAccountDto.cvcRequired = true;
      createAccountDto.paymentMethodId = '201';
      createAccountDto.visualization = [];

      const validationResult = await validate(createAccountDto).then(
        (errors: unknown[]) => errors,
      );

      expect(validationResult.length).toEqual(0);
    });

    it('should return a non-empty result', async () => {
      const createAccountDto = new CreateAccountDto();
      createAccountDto.account = 'test';
      createAccountDto.cvcRequired = true;
      createAccountDto.paymentMethodId = '201';
      createAccountDto.visualization = [];

      expect(controller.save(createAccountDto)).resolves.toEqual({
        _id: 'a uuid',
        ...createAccountDto,
      });
    });
  });

  describe('get', () => {
    it('should call the service', () => {
      const account = 'test';

      controller.findByAccount(account);

      expect(service.get).toHaveBeenCalled();
    });

    it('should return a non-empty result', async () => {
      const account = 'test';

      await expect(controller.findByAccount(account)).resolves.toEqual({
        _id: 'a uuid',
        account,
        cvcRequired: false,
        paymentMethodId: '201',
        visualization: [],
      });

      const accountMock = createMock<Account>({
        account: 'test2',
        cvcRequired: false,
        paymentMethodId: '201',
        visualization: [],
      });

      const getSpy = jest
        .spyOn(service, 'get')
        .mockResolvedValueOnce(accountMock as any);

      const getResponse = await controller.findByAccount('test2');

      expect(getResponse).toEqual(accountMock);
      expect(getSpy).toBeCalledWith({ account: 'test2' });
    });
  });

  describe('storeFront settings', () => {
    it('should call the service', () => {
      const account = 'test';

      controller.getStoreFrontSettings(account);

      expect(service.getStoreFrontSettings).toHaveBeenCalled();
    });

    it('should return a non-empty result', async () => {
      const account = 'test';

      expect(controller.getStoreFrontSettings(account)).resolves.toBe({
        cvcRequired: false,
        paymentMethodId: '201',
        visualization: [],
      });
    });
  });
});
