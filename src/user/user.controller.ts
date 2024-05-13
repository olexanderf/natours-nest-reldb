import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAllUsers() {
    return this.userService.getAllUser();
  }
  @Get(':id')
  getUser(@Param() params: any) {
    return this.userService.getUser(params.id);
  }
}
