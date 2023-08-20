import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileSystemVTEXService } from './profile-system.service';

const HttpServiceProvider = {
  provide: HttpService,
  useFactory: () => ({}),
};

describe('ProfileSystemService', () => {
  let service: ProfileSystemVTEXService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileSystemVTEXService, HttpServiceProvider],
    }).compile();

    service = module.get<ProfileSystemVTEXService>(ProfileSystemVTEXService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
