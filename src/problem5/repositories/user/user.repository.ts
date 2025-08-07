import { Service, Inject } from "typedi";

import { IUserRepository } from "./user.repository.implement";
import { PrismaClient, User } from "../../generated/prisma";
import { CreateUserDto } from "../../dtos/user/user-create.dto";
import { UpdateUserDto } from "../../dtos/user/user-update.dto";

@Service()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}
  findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }
  update(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
  delete(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
  create(payload: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: payload,
    });
  }

  async count(): Promise<number> {
    return await this.prisma.user.count();
  }

  async findMany(skip: number, take: number) {
    return await this.prisma.user.findMany({
      skip,
      take,
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  countByName(name: string): Promise<number> {
  return this.prisma.user.count({
    where: {
      firstName: {
        contains: name,
      },
    },
  });
}


  async searchByName(name: string,skip: number, take: number): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        firstName: {
          contains: name,
        },

      },
      skip,
      take,
    },
  );
  }
}
