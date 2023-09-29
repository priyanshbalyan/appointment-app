import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { SlotsService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SlotEntity } from './entities/slot.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

export interface AuthUser extends Express.User {
  id: number;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

@Controller('slots')
@ApiTags('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  // get all booked slots of user
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: SlotEntity, isArray: true })
  async findAll(@Req() request: AuthRequest, @Query('docId') docId: string) {
    const authorId = request.user.id;
    const slots = await this.slotsService.findAll(authorId, docId);
    return slots.map((slot) => new SlotEntity(slot));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SlotEntity, isArray: true })
  async create(@Req() request: AuthRequest) {
    const createSlotDto: CreateSlotDto | CreateSlotDto[] = request.body;
    try {
      console.log(createSlotDto);
      if (Array.isArray(createSlotDto)) {
        const createdSlots = await Promise.all(
          createSlotDto.map((slotDto) => {
            slotDto.authorId = request.user.id;
            return this.slotsService.create(slotDto);
          })
        );
        return createdSlots.map((slot) => new SlotEntity(slot));
      } else {
        console.log(createSlotDto);
        return new SlotEntity(await this.slotsService.create(createSlotDto));
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return new BadRequestException('Slot is already booked.');
        }
      }
      throw error;
    }
  }

  // @Get(':id')
  // @ApiOkResponse({ type: SlotEntity })
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   return new SlotEntity(await this.slotsService.findOne(id));
  // }

  @Patch(':id')
  @ApiCreatedResponse({ type: SlotEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSlotDto: UpdateSlotDto
  ) {
    return new SlotEntity(await this.slotsService.update(id, updateSlotDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: SlotEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new SlotEntity(await this.slotsService.remove(id));
  }
}
