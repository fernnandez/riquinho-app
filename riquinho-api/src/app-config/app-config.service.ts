import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { ConnectionOptions } from 'typeorm';

@Injectable()
export class AppConfigService extends ConfigService {
  private readonly nodeEnv = process.env.NODE_ENV || 'development';

  constructor() {
    super();
  }

  isDev(): boolean {
    return this.nodeEnv === 'development';
  }

  isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  getCORSOrigin(): string[] {
    if (process.env.NODE_ENV === 'development') {
      return [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3004',
      ];
    }

    if (process.env.NODE_ENV === 'production') {
      return [''];
    }
  }

  createTypeOrmConfig(): ConnectionOptions {
    const srcPath = path.resolve(__dirname, '../');

    return {
      type: 'postgres',
      host: this.get<string>('POSTGRES_HOST'),
      port: this.get<number>('POSTGRES_PORT'),
      username: this.get<string>('POSTGRES_USER'),
      password: this.get<string>('POSTGRES_PASSWORD'),
      database: this.get<string>('POSTGRES_DB'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      // logging: this.get<string>('POSTGRES_DEBUG') === 'TRUE',
      migrationsTableName: 'database_migrations',
      // subscribers: [path.resolve(srcPath, '**', '*.subscriber.ts')],
      migrationsRun: this.get<string>('NODE_ENV') !== 'test',
      migrations: [path.resolve(srcPath, 'data', 'migrations', '*.ts')],
      cli: {
        migrationsDir: path.resolve(srcPath, 'data', 'migrations'),
      },
    };
  }
}
