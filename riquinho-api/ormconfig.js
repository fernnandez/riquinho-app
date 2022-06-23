const path = require('path');
const dotenv = require('dotenv');

const srcPath = path.resolve(__dirname, 'src');

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const config = {
  cli: {
    migrationsDir: path.resolve(srcPath, 'data', 'migrations'),
  },
  database: process.env.POSTGRES_DB,
  schema: process.env.POSTGRES_SCHEMA,
  host: process.env.POSTGRES_HOST,
  logging: process.env.POSTGRES_DEBUG === 'TRUE',
  migrationsTableName: 'database_migrations',
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  subscribers: [path.resolve(srcPath, '**', '*.subscriber.ts')],
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  migrationsRun: process.env.NODE_ENV !== 'test',
  migrations: [path.resolve(srcPath, 'data', 'migrations', '*.ts')],
  entities: [path.resolve(srcPath, '**', '*.entity.{js,ts}')],
};

module.exports = config;
