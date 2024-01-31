import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserRegisterInput } from './inputs/auth.input';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async registerUser(user: UserRegisterInput) {
    const createdUser = this.userService.create(user);

    return createdUser;
  }

  async loginUser(email, password) {
    const user = await this.userService.findByEmail(email);
    const payload = { fullName: email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    if (!email) {
      throw new BadRequestException('Invalid email or password');
    }
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return null;
    }

    return user;
  }

  async verifyUserById(id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    delete user.password;
    return user;
  }
}
