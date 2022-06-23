import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TransacaoModule } from './transacao/modules/transacao.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) =>
        appConfigService.createTypeOrmConfig(),
    }),
    AuthModule,
    UserModule,
    TransacaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
