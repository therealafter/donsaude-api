import { Module } from '@nestjs/common';
import { PartnerController } from './http/partner.controller';
import { PartnerService } from './domain/partner.service';
import { Partner } from './domain/entities/partner.entity';
import { PartnerAddress } from './domain/entities/partner-address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { providePartnersRepository } from './domain/repositories/partner.repository';
import { LoggerModule } from 'src/common/loggers/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Partner, PartnerAddress]), LoggerModule],
  controllers: [PartnerController],
  providers: [PartnerService, ...providePartnersRepository()],
  exports: [PartnerService],
})
export class PartnerModule {}
