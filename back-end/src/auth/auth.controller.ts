import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RedisService } from 'src/services/redis/redis.service';
import { ResponseData } from 'src/utils/base-dto/response-data.dto';
import { JWTUtil } from 'src/utils/jwtUtil';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private redisService: RedisService,
    private userService: UsersService,
  ) {}
  @Post('/login')
  async login(@Body() body: AuthLoginDto, @Res() res: Response) {
    const response = new ResponseData();
    response.status = false;
    response.statusCode = HttpStatus.BAD_REQUEST;
    response.error = 'Email hoặc mật khẩu không chính xác';

    if (!body.email || !body.password) {
      return res.status(response.statusCode).json(response);
    }
    // verify password hasing
    try {
      const data = await this.authService.login(body);
      response.data = data;
      response.statusCode = HttpStatus.OK;
      response.status = true;
      response.message = 'Login successfully';
      response.error = '';
      return res.status(response.statusCode).json(response);
    } catch {
      return res.status(response.statusCode).json(response);
    }
  }
  @Get('profile')
  getProfile(@Req() req, @Res() res: Response) {
    console.log('get profile');
    res.status(HttpStatus.OK).json({
      success: true,
      data: req.user,
      message: 'Get profile success',
    });
  }

  @Post('logout')
  async logout(@Req() req) {
    const token = req.token;

    await this.redisService.set(`blacklist_${token}`, 1);
  }

  @Post('refreshToken')
  async refreshToken(@Req() req: any, @Body() body: any, @Res() res: Response) {
    try {
      const refresh_token = body.refreshToken;
      JWTUtil.verifyToken(refresh_token);
      const { email, userId } = JSON.parse(
        await this.redisService.get(`refreshToken_${refresh_token}`),
      );
      const accessToken = JWTUtil.generateAccessToken({ userId, email });
      const refreshToken = JWTUtil.generateRefreshToken();
      await this.redisService.set(
        `refreshToken_${refreshToken}`,
        JSON.stringify({ userId, email }),
      );
      return {
        access_token: accessToken,
        refreshToken,
      };
    } catch {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: 'Unauthorized',
      });
    }
  }
  @Post('register')
  async register(@Body() body: CreateUserDto, @Res() res: Response) {
    const existEmail = await this.authService.getUserByField(
      'email',
      body.email,
    );
    if (existEmail) {
      return res.status(HttpStatus.CONFLICT).json({
        success: false,
        error: 'Email đã tồn tại',
      });
    }
    await this.userService.create(body);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Đăng ký thành công',
    });
  }
}
