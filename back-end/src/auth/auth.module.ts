import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RedisService } from 'src/services/redis/redis.service';

@Module({
  providers: [AuthService, UsersService, PrismaService, RedisService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
