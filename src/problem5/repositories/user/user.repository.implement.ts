import { CreateUserDto } from "../../dtos/user/user-create.dto";
import { UpdateUserDto } from "../../dtos/user/user-update.dto";
import { User } from "../../generated/prisma";

export interface IUserRepository {
    findMany(skip: number, take: number): Promise<User[]>;
    count(): Promise<number>;
    countByName(name: string): Promise<number>;
    findById(id: number): Promise<User | null>;
    update(id: number, data: UpdateUserDto): Promise<User>;
    delete(id: number): Promise<User | null>;
    create(payload : CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    searchByName(name: string,skip: number, take: number): Promise<User[]>;
}