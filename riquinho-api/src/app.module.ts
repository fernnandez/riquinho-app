import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TransacaoModule } from './transacao/modules/transacao.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, 'data', 'migrations', '*.{ts,js}')],
      migrationsRun: true,
      migrationsTableName: 'database_migrations',
    }),
    AuthModule,
    UserModule,
    TransacaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
