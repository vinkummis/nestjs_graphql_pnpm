import { config } from 'dotenv';
config();
import { DataSource, DataSourceOptions } from 'typeorm';

export const mysqlDataSourceOptions: DataSourceOptions = {
  name: 'default',
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'todo',
  synchronize: process.env.APP_ENV == 'local' ? true : false, //make sure to keep this parameter value to false in PRODUCTION ENV
  logging: process.env.APP_ENV == 'local' ? true : false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  subscribers: [__dirname + '/../subscribers/**/*{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  logger: 'file',
};

const mysqlDataSource = new DataSource(mysqlDataSourceOptions);

export default mysqlDataSource;
