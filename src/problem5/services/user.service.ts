import { Service } from "typedi";
import Paginator from "./paginator";
import { UserResponseDto } from "../dtos/user/user.dto";
import { UserRepository } from "../repositories/user/user.repository";
import { ConflictError, NotFoundError } from "../errors/custom/http-errors";
import { CreateUserDto } from "../dtos/user/user-create.dto";
import { UpdateUserDto } from "../dtos/user/user-update.dto";

@Service()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(
    page: number | string,
    limit: number | string
  ): Promise<{
    data: UserResponseDto[];
    metadata: any;
  }> {
    try {
      const paginator = new Paginator(page, limit);
      const [users, totalRecords] = await Promise.all([
        this.userRepository.findMany(paginator.offset, paginator.limit),
        this.userRepository.count(),
      ]);

      const userDtos = users.map((user: any) =>
        UserResponseDto.fromEntity(user)
      );
      const metadata = paginator.getMetadata(totalRecords);
      return {
        data: userDtos,
        metadata,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number): Promise<UserResponseDto | null> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) throw new NotFoundError("User not found");
      return UserResponseDto.fromEntity(user);
    } catch (error) {
      throw error;
    }
  }

  async createUser(payload: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(payload.email);
    if (existingUser) {
      throw new ConflictError("User already exists");
    }
    try {
      const user = await this.userRepository.create(payload);
      return UserResponseDto.fromEntity(user);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    id: number,
    data: UpdateUserDto
  ): Promise<UserResponseDto | null> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }
    try {
      const updatedUser = await this.userRepository.update(id, data);
      return UserResponseDto.fromEntity(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number): Promise<UserResponseDto | null> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }
    try {
      const deletedUser = await this.userRepository.delete(id);
      return UserResponseDto.fromEntity(existingUser);
    } catch (error) {
      throw error;
    }
  }

  async searchUsersByName(name: string, page: number | string,
    limit: number | string): Promise<{
    data: UserResponseDto[];
    metadata: any;
  }> {
    try {
      const paginator = new Paginator(page, limit);
      const [users, totalRecords] = await Promise.all([
        this.userRepository.searchByName(name, paginator.offset, paginator.limit),
        this.userRepository.countByName(name),
      ]);
      const userDtos = users.map((user: any) =>
        UserResponseDto.fromEntity(user)
      );
      const metadata = paginator.getMetadata(totalRecords);
      return {
        data: userDtos,
        metadata,
      };
    } catch (error) {
      throw error;
    }
  }
}
