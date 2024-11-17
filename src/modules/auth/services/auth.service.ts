import { Injectable } from '@nestjs/common';
import { callAPI } from 'src/common';

import { IAuthService } from '../interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor() {}

  async login(server: string, email: any): Promise<any> {
    if (server === 'management') {
      const verify = await callAPI('/staffs/get', { email: email });
      if (verify.length) {
        return { user: verify[0], role: verify[0].role };
      }
    } else {
      const studentData = await callAPI('/students/get', { email: email });
      if (studentData.length) {
        return { user: studentData[0], role: 'student' };
      }
      const teacherData = await callAPI('/teachers/get', { email: email });
      if (teacherData.length) {
        return { user: teacherData[0], role: 'teacher' };
      }
    }
    return null;
  }

  async updateInfo(server: string, role: string, data: any): Promise<any> {
    if (server === 'management') {
      return await callAPI(
        '/staffs/update',
        {
          id: data.id,
          staff: data,
        },
        'POST',
      );
    } else {
      if (role === 'student') {
        return await callAPI(
          '/students/update',
          {
            id: data.id,
            student: data,
          },
          'POST',
        );
      } else {
        return await callAPI(
          '/teachers/update',
          {
            id: data.id,
            teacher: data,
          },
          'POST',
        );
      }
    }
  }
}
