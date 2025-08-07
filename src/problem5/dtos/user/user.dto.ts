import { User } from "../../generated/prisma";

export class UserResponseDto {
  constructor(
    public id: number,
    public firstName: string,
    public email: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static fromEntity(user: User): UserResponseDto {
    const { password, ...safeUser } = user;
    return new UserResponseDto(
      safeUser.id,
      safeUser.firstName,
      safeUser.email,
      safeUser.createdAt,
      safeUser.updatedAt
    );
  }
}
