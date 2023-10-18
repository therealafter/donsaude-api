import { Injectable, Provider } from '@nestjs/common';
import { Partner } from '../entities/partner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'src/common/constants/datasource-typeorm';
import { PartnersInMemoryRepository } from './implementations/partners.in-memory.repository';
import { PartnersTypeOrmRepository } from './implementations/partners.typeorm.repository';
import { PARTNER_REPOSITORY_TOKEN } from './partner.repository.interface';

export function providePartnersRepository(): Provider[] {
  return [
    {
      provide: PARTNER_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesRepository: PartnersRepoDependenciesProvider,
      ) => providePartnersRepositoryFactory(dependenciesRepository),
      inject: [PartnersRepoDependenciesProvider],
    },
    PartnersRepoDependenciesProvider,
  ];
}
async function providePartnersRepositoryFactory(
  dependenciesProvider: PartnersRepoDependenciesProvider,
) {
  await ConfigModule.envVariablesLoaded;
  switch (process.env.DATABASE_DATASOURCE) {
    case DataSource.TYPEORM:
      return new PartnersTypeOrmRepository(
        dependenciesProvider.typeOrmRepository,
      );
    case DataSource.MEMORY:
    default:
      return new PartnersInMemoryRepository();
  }
}

@Injectable()
export class PartnersRepoDependenciesProvider {
  constructor(
    @InjectRepository(Partner)
    public typeOrmRepository: Repository<Partner>,
  ) {}
}
