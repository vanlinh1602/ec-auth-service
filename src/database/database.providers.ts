import { Sequelize } from 'sequelize-typescript';
import { Student } from 'src/database/entities/students/students.entity';
import { Teacher } from 'src/database/entities/teachers/teacher.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([Student, Teacher]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
