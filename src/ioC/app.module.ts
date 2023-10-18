import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AllExceptionsFilter } from 'src/common/filters/exception.filter';
import databaseConfig from 'src/config/database.config';
import { PartnerAddress } from 'src/modules/partners/domain/entities/partner-address.entity';
import { Partner } from 'src/modules/partners/domain/entities/partner.entity';

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
        entities: [Partner, PartnerAddress],
        synchronize: true,
        database: configDatabase.database,
      }),
      inject: [databaseConfig.KEY],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
