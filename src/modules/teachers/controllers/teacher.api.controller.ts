import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ITeacher } from 'src/database/types/teachers';

import { TeacherService } from '../services/teacher.service';

@Controller()
export class TeacherApiController {
  constructor(private readonly teacherServices: TeacherService) {}

  @Get('/get')
  async getTeacher(@Param() filter: Partial<ITeacher>): Promise<ITeacher[]> {
    if (!Object.keys(filter).length) {
      const teachers = await this.teacherServices.getTeachers();
      return teachers.map((teacher) => teacher.dataValues);
    } else {
      const teachers = await this.teacherServices.getFilterTeacher(filter);
      return teachers.map((teacher) => teacher.dataValues);
    }
  }

  @Post('/create')
  async createTeacher(
    @Body() data: { teacher: Partial<ITeacher> },
  ): Promise<ITeacher> {
    const newTeacher = await this.teacherServices.createTeacher(data.teacher);
    return newTeacher.dataValues;
  }

  @Post('/update')
  async updateTeacher(
    @Body() data: { id: string; teacher: Partial<ITeacher> },
  ): Promise<{ success: boolean }> {
    const success = await this.teacherServices.updateTeacher(
      data.id,
      data.teacher,
    );
    return { success };
  }

  @Post('/delete')
  async deleteTeacher(
    @Body() data: { id: string },
  ): Promise<{ success: boolean }> {
    const success = await this.teacherServices.deleteTeacher(data.id);
    return { success };
  }
}
