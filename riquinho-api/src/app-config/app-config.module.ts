import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env.${process.env.NODE_ENV}`] }),
  ],
  providers: [{ provide: AppConfigService, useValue: new AppConfigService() }],
  exports: [AppConfigService],
})
export class AppConfigModule {}
