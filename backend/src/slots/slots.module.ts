import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SlotsController],
  providers: [SlotsService],
  imports: [PrismaModule],
})
export class SlotsModule {}
