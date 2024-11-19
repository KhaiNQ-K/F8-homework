import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RedisService } from 'src/services/redis/redis.service';
import { JWTUtil } from 'src/utils/jwtUtil';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private redisService: RedisService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ').slice(-1).join();
    console.log('authorization', req.headers.authorization);
    // verify token
    const decode = JWTUtil.verifyToken(token);
    const isBlackList = await this.redisService.get(`blacklist_${token}`);
    if (!decode || isBlackList) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    const user = await this.authService.getUserByField('id', decode.userId);
    req.user = user;
    req.token = token;
    next();
  }
}
