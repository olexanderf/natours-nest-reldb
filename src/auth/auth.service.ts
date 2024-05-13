import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(dto) {
    return { name: 'login', dto: dto };
  }

  signUp(dto) {
    return { name: 'signup', dto: dto };
  }

  forgotPassword(dto) {
    return { name: 'forgotPassword', dto: dto };
  }

  resetPassword(id, dto) {
    return { name: `reset password`, dto: dto };
  }
  changePassword(dto) {
    return { name: 'change password', dto: dto };
  }
}
