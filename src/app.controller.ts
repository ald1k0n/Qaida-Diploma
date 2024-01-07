import { Controller, Get, Param, Res } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/image/:id')
  async getImage(@Param('id') id: number, @Res() res: Response) {
    const file = await this.prisma.image.findFirst({
      where: { id: Number(id) },
    });
    res.set({
      'Content-Type': file.mimetype,
      'Content-Length': file.size,
    });
    res.send(file.buffer);
  }
}
