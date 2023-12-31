import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { SlotsService } from 'src/slots/slots.service';

describe('SlotsService', () => {
  let service: SlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotsService, PrismaService],
    }).compile();

    service = module.get<SlotsService>(SlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
