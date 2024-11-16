import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

@Controller()
export class AuthApiController {
  constructor(private readonly authServices: AuthService) {}

  @Post('/auth')
  async createAuth(
    @Body() data: { token: string; user: any; server: string },
  ): Promise<any> {
    const { user, server } = data;
    const auth = await this.authServices.login(server, user.email);
    return auth;
  }

  @Post('/update')
  async updateUser(
    @Body() data: { role: string; user: any; server: string },
  ): Promise<{ success: boolean }> {
    const { role, user, server } = data;
    const success = await this.authServices.updateInfo(server, role, user);
    return { success };
  }

  @Post('/signOut')
  async deleteAuth(): Promise<{ success: boolean }> {
    return { success: true };
  }
}
