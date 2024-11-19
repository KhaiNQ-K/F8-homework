import * as jwt from 'jsonwebtoken';
import {
  JWT_ACCESS_EXPIRED,
  JWT_REFRESH_EXPIRED,
  JWT_SECRET,
} from 'src/config';
export class JWTUtil {
  static generateAccessToken(payload: any) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_ACCESS_EXPIRED,
    });
  }

  static generateRefreshToken() {
    const payload = {
      value: Math.random() * new Date().getTime(),
    };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRED,
    });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return false;
    }
  }
}
