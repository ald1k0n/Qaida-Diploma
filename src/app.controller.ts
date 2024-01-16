import { Controller, Get, Param, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileDTO } from './schema/dtos/FileDTO';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(@InjectModel('File') private readonly file: Model<FileDTO>) {}

  @Get('/image/:id')
  async getImage(@Param('id') id: ObjectId, @Res() res: Response) {
    const image = await this.file.findById(id);

    res.set({
      'Content-Type': image.mimetype,
      'Content-Length': image.size,
    });
    res.send(image.buffer);
  }
}
