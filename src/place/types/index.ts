import { ApiPropertyOptional } from '@nestjs/swagger';

export interface IParams {
  _id?: string;
  limit?: number;
  page?: number;
  score2gis?: number;
  address?: string | { $regex: string };
  title?: string | { $regex: string };
}

export class ParamsDTO implements IParams {
  @ApiPropertyOptional()
  _id?: string;
  @ApiPropertyOptional()
  address?: string;
  @ApiPropertyOptional()
  limit?: number;
  @ApiPropertyOptional()
  page?: number;
  @ApiPropertyOptional()
  score2gis?: number;
  @ApiPropertyOptional()
  title?: string;
}
