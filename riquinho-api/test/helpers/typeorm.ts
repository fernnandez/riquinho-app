import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../../src/app-config/app-config.module';
import { AppConfigService } from '../../src/app-config/app-config.service';

export const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [AppConfigModule],
  inject: [AppConfigService],
  useFactory: (configService: AppConfigService) =>
    configService.createTypeOrmConfig(),
});
