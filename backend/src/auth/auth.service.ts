import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateTokens(user);
  }

  // async registration(userDto: CreateUserDto) {
  //   const candidate = await this.userService.getUserByEmail(userDto.email);
  //   if (candidate) {
  //     throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
  //   }
  //   const hashPassword = await bcrypt.hash(userDto.password, 5);
  //   const user = await this.userService.createUser({ ...userDto, password: hashPassword })
  //   return this.generateToken(user)
  // }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.userService.getUserById(payload.id);
      if (!user) {
        throw new UnauthorizedException('User not exist');
      }

      const newAccessToken = this.jwtService.sign(
        { id: user.id, email: user.email, roles: user.roles },
        { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '1d' },
      );

      const newRefreshToken = this.jwtService.sign(
        { id: user.id },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Refresh token is expired');
      }
      throw new UnauthorizedException('Wrong refresh token');
    }
  }

  private async generateTokens(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles.map((role) => role.value),
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals =
      user && (await bcrypt.compare(userDto.password, user.password));
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Unknown password or email',
    });
  }
}
