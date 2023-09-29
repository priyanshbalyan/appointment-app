// src/slots/dto/create-slot.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSlotDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  time: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  specialist: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  authorId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  doctorId: number;
}
