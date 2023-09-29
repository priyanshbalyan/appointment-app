// src/slots/entities/slot.entity.ts

import { Slot } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import { Exclude } from 'class-transformer';

export class SlotEntity implements Slot {
  @ApiProperty()
  id: number;

  @ApiProperty()
  specialist: string;

  @ApiProperty()
  time: Date;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  doctorId: number;

  @ApiProperty({ required: false, type: UserEntity })
  author?: UserEntity;

  @ApiProperty({ required: false, type: UserEntity })
  doctor?: UserEntity;

  constructor({ author, doctor, ...data }: Partial<SlotEntity>) {
    Object.assign(this, data);

    if (author) {
      this.author = new UserEntity(author);
    }
    if (doctor) {
      this.doctor = new UserEntity(doctor);
    }
  }
}
