import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AllExceptionsFilter } from 'src/common/filters/exception.filter';
import databaseConfig from 'src/config/database.config';
import { Partner } from 'src/modules/partners/domain/entities/partner.entity';
import { PartnerModule } from 'src/modules/partners/partner.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [databaseConfig] })],
      useFactory: (
        configDatabase: ConfigType<typeof databaseConfig>,
      ): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configDatabase.host,
        port: configDatabase.port,
        username: configDatabase.username,
        password: configDatabase.password,
        entities: [Partner],
        synchronize: true,
        database: configDatabase.database,
      }),
      inject: [databaseConfig.KEY],
    }),
    PartnerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
