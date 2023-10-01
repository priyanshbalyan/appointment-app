import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSlotDto } from 'src/slots/dto/create-slot.dto';
import { UpdateSlotDto } from 'src/slots/dto/update-slot.dto';

@Injectable()
export class SlotsService {
  constructor(private prisma: PrismaService) {}

  create(createSlotDto: CreateSlotDto) {
    return this.prisma.slot.create({ data: createSlotDto });
  }

  findAll(authorId, docId?) {
    const whereQuery = docId
      ? { OR: [{ authorId }, { doctorId: parseInt(docId) }] }
      : { authorId };
    return this.prisma.slot.findMany({
      where: whereQuery,
      include: {
        author: true,
        doctor: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.slot.findUnique({
      where: { id },
      include: {
        author: true,
        doctor: true,
      },
    });
  }

  update(id: number, updateSlotDto: UpdateSlotDto) {
    return this.prisma.slot.update({
      where: { id },
      data: updateSlotDto,
    });
  }

  remove(id: number) {
    return this.prisma.slot.delete({ where: { id } });
  }
}
