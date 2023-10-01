import { Module } from '@nestjs/common';
import { SlotsService } from 'src/slots/slots.service';
import { SlotsController } from 'src/slots/slots.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SlotsController],
  providers: [SlotsService],
  imports: [PrismaModule],
})
export class SlotsModule {}
