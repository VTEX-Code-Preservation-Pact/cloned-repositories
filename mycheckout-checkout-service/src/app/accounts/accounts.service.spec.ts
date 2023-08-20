import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-dynamoose';
import { NotFoundException } from '../../shared/exceptions/not-found-exception';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/createAccount.dto';
import { PaymentMethodsService } from './payment-methods/payment-methods.service';
import { PaymentMethod } from './payment-methods/schemas/payment-method.schema';
import { Account, AccountDoc, AccountModel } from './schemas/account.schema';

const mockAccountDoc = (mock?: Partial<AccountDoc>): Partial<AccountDoc> => ({
  account: mock?.account || 'test',
  id: 'a uuid',
  cvcRequired: mock?.cvcRequired || false,
  paymentMethodId: mock?.paymentMethodId || '201',
  visualization: mock?.visualization || [
    { type: 'category', key: '123', secondaryKey: 'vestidos' },
  ],
  set(updateMock: any) {
    for (const key in updateMock) {
      if (this[key] !== undefined) {
        this[key] = updateMock[key];
      }
    }

    return this;
  },
  save() {
    return this;
  },
});

describe('AccountsService', () => {
  let service: AccountsService;
  let paymentMethodsService: PaymentMethodsService;
  let accountModel: AccountModel;

  beforeEach(async () => {
    const AccountModel: Provider = {
      provide: getModelToken(Account.name),
      useValue: {
        findOne: jest.fn(),
        build: jest.fn(),
      },
    };

    const PaymentMethodsModel: Provider = {
      provide: getModelToken(PaymentMethod.name),
      useValue: {},
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        PaymentMethodsService,
        AccountModel,
        PaymentMethodsModel,
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    paymentMethodsService = module.get<PaymentMethodsService>(
      PaymentMethodsService,
    );
    accountModel = module.get<AccountModel>(getModelToken(Account.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('save a new account', async () => {
      const createAccountDto = new CreateAccountDto();
      createAccountDto.account = 'NotTest';
      createAccountDto.cvcRequired = true;
      createAccountDto.paymentMethodId = '201';
      createAccountDto.visualization = [];

      jest.spyOn(accountModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      const spiedBuild = jest
        .spyOn(accountModel, 'build')
        .mockImplementationOnce(
          () => mockAccountDoc({ ...createAccountDto }) as any,
        );

      await expect(service.save(createAccountDto)).resolves.toMatchObject({
        ...createAccountDto,
      });

      expect(spiedBuild).toHaveBeenCalled();
    });

    it('update existent account', async () => {
      const createAccountDto = new CreateAccountDto();
      createAccountDto.cvcRequired = true;

      jest.spyOn(accountModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockAccountDoc()),
      } as any);

      const response = await service.save(createAccountDto);

      expect(response).toMatchObject({
        ...createAccountDto,
      });
    });
  });

  describe('get', () => {
    it('should return NotFoundException if the account does not exist', async () => {
      const account = 'test';

      jest.spyOn(accountModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.get({ account })).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('should return an existing account', () => {
      const account = 'test';

      jest.spyOn(accountModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockAccountDoc()),
      } as any);

      expect(service.get({ account })).resolves.toMatchObject({
        account: 'test',
        id: 'a uuid',
        cvcRequired: false,
        paymentMethodId: '201',
        visualization: [
          { type: 'category', key: '123', secondaryKey: 'vestidos' },
        ],
      });
    });
  });

  describe('storeFront', () => {
    it('should return NotFoundException if the account does not exist', async () => {
      const account = 'test';

      jest.spyOn(accountModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(
        service.getStoreFrontSettings(account),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should return an existing account storeFront setting', () => {
      const account = 'test';

      jest.spyOn(accountModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockAccountDoc()),
      } as any);

      jest
        .spyOn(paymentMethodsService, 'findByAccount')
        .mockReturnValueOnce([] as any);

      expect(service.getStoreFrontSettings(account)).resolves.toMatchObject({
        cvcRequired: false,
        paymentMethodId: '201',
        visualization: [
          { type: 'category', key: '123', secondaryKey: 'vestidos' },
        ],
        PaymentMethod: [],
      });
    });
  });
});
