import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  getAllUser() {
    return this.prisma.user.findMany();
  }
  getUser(id: string) {
    return this.prisma.user.findUnique({
      where: {
        key_id: id,
      },
    });
  }
}
