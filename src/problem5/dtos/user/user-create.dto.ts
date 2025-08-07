import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsNotEmpty({ message: "Tên người dùng không được để trống." })
  @IsString({ message: "Tên người dùng phải là chuỗi." })
  @Length(3, 50, { message: "Tên người dùng phải có từ 3 đến 50 ký tự." })
  firstName!: string;

  @Expose()
  @IsNotEmpty({ message: "Email không được để trống." })
  @IsString({ message: "Email phải là chuỗi." })
  @Length(5, 100, { message: "Email phải có từ 5 đến 100 ký tự." })
  @IsEmail({}, { message: "Email không hợp lệ." })
  email!: string;

  @Expose()
  @IsNotEmpty({ message: "Mật khẩu không được để trống." })
  @IsString({ message: "Mật khẩu phải là chuỗi." })
  @Length(6, 100, { message: "Mật khẩu phải có từ 6 đến 100 ký tự." })
  password!: string;
}
