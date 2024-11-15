import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth.login';
import { Hashing } from 'src/utils/hasing';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(data: AuthLoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(data.email);
    const isVerify = Hashing.verify(data.password, user.passwordHash);
    if (!user?.passwordHash && !isVerify) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
