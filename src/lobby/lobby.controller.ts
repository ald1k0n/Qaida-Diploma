import { LobbyService } from './lobby.service';
import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Req,
  Param,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { LobbyDTO } from 'src/schema/dtos';

import { Request } from 'express';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ObjectId } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lobby')
@Controller('lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async createLobby(
    @Body() body: Omit<LobbyDTO, 'owner_id' | 'image'> & { image_id: ObjectId },
    @Req() req: Request,
  ) {
    const payload = {
      ...body,
      owner_id: req['user'].id,
      image: body.image_id,
    };

    return await this.lobbyService.createLobby(payload);
  }

  @Get('/')
  async getLobbies(@Query('skip') skip: number, @Query('limit') limit: number) {
    return await this.lobbyService.getLobbies(skip, limit);
  }

  @Get('/:id')
  async getLobbyId(@Param('id') _id: ObjectId) {
    return await this.lobbyService.getLobbyById(_id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async updateLobby(
    @Req() req: Request,
    @Body() payload: Omit<LobbyDTO, 'owner_id'>,
    @Param('id') _id: ObjectId,
  ) {
    const data = {
      _id,
      ...payload,
    };

    return await this.lobbyService.updateLobby(req['user'].id, data);
  }

  @Put('/handleLobby/:lobby_id')
  @UseGuards(AuthGuard)
  async handleUser(@Req() req: Request, @Param('lobby_id') lobby_id: ObjectId) {
    return await this.lobbyService.handleUser(req['user'].id, lobby_id);
  }
}
