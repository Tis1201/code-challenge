import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import { UserService } from "../services/user.service";
import { UserResponseDto } from "../dtos/user/user.dto";
import responseUtil from "../utils/response.util";
import { CreateUserDto } from "../dtos/user/user-create.dto";
import { UpdateUserDto } from "../dtos/user/user-update.dto";

@JsonController("/users")
@Service()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  async getAllUsers(
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10
  ) {
    const { data, metadata } = await this.userService.getAllUsers(page, limit);
    return responseUtil.success<UserResponseDto[]>(data, metadata);
  }

  @Get("/search")
  async searchUsersByName(
    @QueryParam("name") name: string,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10
  ) {
    const { data, metadata } = await this.userService.searchUsersByName(name, page, limit);
    return responseUtil.success<UserResponseDto[]>(data, metadata);
  }

  @Get("/:id")
  async getUserById(@Param("id") id: number) {
    const user = await this.userService.getUserById(id);
    return responseUtil.success<UserResponseDto>(user);
  }

  @Post("/create")
  async createUser(@Body() payload: CreateUserDto) {
    const user = await this.userService.createUser(payload);
    return responseUtil.success<UserResponseDto>(user);
  }

  @Put("/update/:id")
  async updateUser(@Param("id") id: number, @Body() data: UpdateUserDto) {
    const user = await this.userService.updateUser(id, data);
    return responseUtil.success<UserResponseDto>(user);
  }

  @Delete("/delete/:id")
  async deleteUser(@Param("id") id: number) {
    const user = await this.userService.deleteUser(id);
    return responseUtil.success<UserResponseDto>(user);
  }
}
