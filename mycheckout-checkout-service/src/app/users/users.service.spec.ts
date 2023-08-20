import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useFactory: () => ({
            findOne: jest.fn(({ email }: { email: string }) => {
              let result: Record<string, string>;

              if (email === 'test@vtex.com.br') {
                result = {
                  email,
                };
              }

              return {
                exec: () => result,
              };
            }),
          }),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('save', () => {
    it('should not save existent email', () => {});
  });
});
