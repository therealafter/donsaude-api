import { AddPartnerDto } from '../../http/dtos/add-partner.dto';
import { UpdatePartnerDto } from '../../http/dtos/update-partner.dto';
import { Partner } from '../entities/partner.entity';

export interface PartnerRepository {
  create(partner: Partner): Promise<void>;
  update(id: string, partner: UpdatePartnerDto): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Partner[]>;
  findById(id: string): Promise<Partner>;
  findByDocument(document: string): Promise<Partner>;
  findByCoverageArea(coverageArea: string): Promise<Partner>;
  findByAddress(cep: string): Promise<Partner[]>;
}

export const PARTNER_REPOSITORY_TOKEN = 'partner-repository-token';
