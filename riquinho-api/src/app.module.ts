import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env.${process.env.NODE_ENV}`] }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: false,
        migrations: ['./data/migrations/*.ts'],
        migrationsTableName: 'database_migrations',
        cli: {
          migrationsDir: './data/migrations',
        },
      }), 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
