import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { AuthDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private logger = new Logger();

  private async generateToken(secret: string, expiresIn: string, id: number) {
    return await this.jwt.signAsync(
      { id },
      {
        secret,
        expiresIn,
      },
    );
  }

  public async createUser(payload: AuthDTO) {
    try {
      const candidate = await this.prisma.user.findFirst({
        where: { email: payload.email },
      });

      if (candidate) throw new ConflictException('User already exists');

      return await this.prisma.user.create({
        data: {
          ...payload,
          password: bcrypt.hashSync(payload.password, 7),
        },
        select: {
          id: true,
          email: true,
          name: true,
          surname: true,
          gender: true,
        },
      });
    } catch (error) {
      this.logger.error('ERROR', JSON.stringify(error, null, 2));
      throw new BadRequestException(error);
    }
  }

  public async authorize(payload: AuthDTO) {
    const candidate = await this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (!candidate) throw new UnauthorizedException('User does not exists');

    if (!bcrypt.compareSync(payload.password, candidate.password))
      throw new UnauthorizedException('Password does not match');

    return {
      access_token: await this.generateToken(
        process.env?.ACCESS_TOKEN as string,
        '6h',
        candidate.id,
      ),
      refresh_token: await this.generateToken(
        process.env?.REFRESH_TOKEN as string,
        '3d',
        candidate.id,
      ),
    };
  }

  public async getme(id: number) {
    try {
      return await this.prisma.user.findFirst({ where: { id } });
    } catch (error) {
      this.logger.error('ERROR', JSON.stringify(error, null, 2));
      throw new UnauthorizedException(error);
    }
  }

  public async refresh(token: string) {
    try {
      const { id } = await this.jwt.verifyAsync(token, {
        secret: process.env?.REFRESH_TOKEN,
      });

      const user = await this.prisma.user.findFirst({ where: { id } });

      if (!user) throw new Error('User not found');

      return {
        access_token: await this.generateToken(
          process.env?.ACCESS_TOKEN,
          '3d',
          id,
        ),
      };
    } catch (error) {
      this.logger.error('ERROR', JSON.stringify(error, null, 2));
      throw new UnauthorizedException(error);
    }
  }
}
