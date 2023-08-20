import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AwsService } from './aws.service';

const ConfigServiceProvider = {
  provide: ConfigService,
  useFactory: () => ({
    get() {
      return {};
    },
  }),
};

describe('AwsService', () => {
  let service: AwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsService, ConfigServiceProvider],
    }).compile();

    service = module.get<AwsService>(AwsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
