import { CreatUserDto } from '@/domain/dto/user';
import { PrismaService } from '@/lib/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async delete(id: string) {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }

  async create(dto: CreatUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prismaService.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        deletedAt: null,
        password: hashedPassword,
      },
    });
  }
}
