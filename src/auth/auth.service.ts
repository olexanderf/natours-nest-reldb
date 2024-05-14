import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { SignUpDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login(dto) {
    return { name: 'login', dto: dto };
  }

  async signUp(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hash,
      },
    });
    delete user.password;
    return { user };
  }

  forgotPassword(dto) {
    return { name: 'forgotPassword', dto: dto };
  }

  resetPassword(id, dto) {
    return { name: `reset password`, dto: dto };
  }
  changePassword(dto) {
    return { name: 'change password', dto: dto };
  }
}
