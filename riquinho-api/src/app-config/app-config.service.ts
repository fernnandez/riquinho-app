import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

@Injectable()
export class AppConfigService extends ConfigService {
  private nodeEnv = process.env.NODE_ENV || 'development';

  isDev(): boolean {
    return this.nodeEnv === 'development';
  }

  isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  getCORSOrigin(): string[] {
    if (this.isDev()) {
      return ['http://localhost:3001'];
    }

    if (this.isProduction()) {
      return [''];
    }
  }

  createTypeOrmConfig(): ConnectionOptions {
    const srcPath = path.resolve(__dirname, '../');

    return {
      type: 'postgres',
      schema: this.get<string>('POSTGRES_SCHEMA'),
      host: this.get<string>('POSTGRES_HOST'),
      port: this.get<number>('POSTGRES_PORT'),
      username: this.get<string>('POSTGRES_USER'),
      password: this.get<string>('POSTGRES_PASSWORD'),
      database: this.get<string>('POSTGRES_DB'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      logging: this.get<string>('POSTGRES_DEBUG') === 'TRUE',
      subscribers: [path.resolve(srcPath, '**', '*.subscriber.ts')],
      migrationsTableName: 'database_migrations',
      migrationsRun: this.get<string>('NODE_ENV') !== 'test',
      migrations: [path.resolve(srcPath, 'data', 'migrations', '*.ts')],
      cli: {
        migrationsDir: path.resolve(srcPath, 'data', 'migrations'),
      },
    };
  }
}
