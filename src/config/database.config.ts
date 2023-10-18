import { registerAs } from '@nestjs/config';

const connectionDataBaseType = {
  potgres: 'potgres',
};

export default registerAs('database', () => ({
  type: connectionDataBaseType[process.env.DATABASE_DATASOURCE],
  database: process.env.TYPEORM_DATABASE,
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
}));
