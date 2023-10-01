import { PartialType } from '@nestjs/swagger';
import { CreateSlotDto } from 'src/slots/dto/create-slot.dto';

export class UpdateSlotDto extends PartialType(CreateSlotDto) {}
