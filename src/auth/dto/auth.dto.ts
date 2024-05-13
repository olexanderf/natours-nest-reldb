import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { MatchesProperty } from './mathces-prop.decorator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
export class SignUpDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MatchesProperty('password', { message: 'Passwords do not match' })
  passwordConfirm: string;
}
export class ForgorPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MatchesProperty('password', { message: 'Passwords do not match' })
  passwordConfirm: string;
}
export class ChangePasswordDto extends ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  passwordCurret: string;
}
