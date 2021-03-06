import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.DB_HOST || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_DATABASE || dbConfig.database,
  entities: ['dist/**/*.entity.js'],
  synchronize: dbConfig.synchronize,
  namingStrategy: new SnakeNamingStrategy(),
};
