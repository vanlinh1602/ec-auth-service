import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';

import { RouterStudentModule } from './routes/routers.students.module';
import { RouterTeacherModule } from './routes/routers.teachers.module';

@Module({})
export class RouterModule {
  static forRoot(): DynamicModule {
    const imports: (
      | DynamicModule
      | Type<any>
      | Promise<DynamicModule>
      | ForwardReference<any>
    )[] = [];

    // import router modules
    imports.push(RouterStudentModule, RouterTeacherModule);
    const routes = [
      {
        path: '/students',
        module: RouterStudentModule,
      },
      {
        path: '/teachers',
        module: RouterTeacherModule,
      },
    ];

    imports.push(NestJsRouterModule.register(routes));

    return {
      module: RouterModule,
      providers: [],
      exports: [],
      controllers: [],
      imports,
    };
  }
}
