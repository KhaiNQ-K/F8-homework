import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_ACCESS_EXPIRED } from 'src/config';
import { PrismaService } from 'src/services/prisma.service';
import { RedisService } from 'src/services/redis/redis.service';
import { UsersService } from 'src/users/users.service';
import { Hashing } from 'src/utils/hasing';
import { JWTUtil } from 'src/utils/jwtUtil';
import { AuthLoginDto } from './dto/auth.login';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private redisService: RedisService,
    private prisma: PrismaService,
  ) {}
  async login(data: AuthLoginDto): Promise<{
    access_token: string;
    refresh_token: string;
    expiresIn: string;
  }> {
    const user = await this.userService.findByEmail(data.email);
    const isVerify = Hashing.verify(data.password, user.passwordHash);
    if (!user?.passwordHash || !isVerify) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, email: user.email };
    const accessToken = JWTUtil.generateAccessToken(payload);
    const refreshToken = JWTUtil.generateRefreshToken();
    await this.redisService.set(
      `refreshToken_${refreshToken}`,
      JSON.stringify({ userId: user.id, email: user.email }),
    );
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expiresIn: JWT_ACCESS_EXPIRED,
    };
  }
  async getUserByField(key: string, value: string) {
    return this.prisma.user.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      where: {
        [key]: value,
      },
    });
  }
}
