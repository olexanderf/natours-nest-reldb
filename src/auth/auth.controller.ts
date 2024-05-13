import { AuthService } from './auth.service';
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  ChangePasswordDto,
  ForgorPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignUpDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('forgotPassword')
  forgotPassword(@Body() dto: ForgorPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Patch('resetPassword')
  resetPassword(@Param() params: any, @Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(params.id, dto);
  }

  @Patch('updateMyPassword')
  changePassword(@Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(dto);
  }
}
