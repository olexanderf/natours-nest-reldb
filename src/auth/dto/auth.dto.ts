export interface LoginDto {
  email: string;
  password: string;
}
export interface SignUpDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ForgorPasswordDto {
  email: string;
}
export interface ResetPasswordDto {
  password: string;
  confirmPassword: string;
}
export interface ChangePasswordDto {
  passwordCurret: string;
  password: string;
  confirmPassword: string;
}
