import { JWTPayload } from '@/domain';
import { LoginDto } from '@/domain/dto/auth';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserService } from './user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(input: LoginDto) {
    const user = await this.userService.findByEmail(input.email);
    const passwordMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Bad Credentials');
    }
    const token = this.jwtService.sign({
      userId: user.id,
    } as JWTPayload);

    return {
      token,
      user,
    };
  }
}
