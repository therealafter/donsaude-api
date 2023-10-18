import { AddPartnerDto } from 'src/modules/partners/http/dtos/add-partner.dto';
import { UpdatePartnerDto } from 'src/modules/partners/http/dtos/update-partner.dto';
import { Partner } from '../../entities/partner.entity';
import { PartnerRepository } from '../partner.repository.interface';

export class PartnersTypeOrmRepository implements PartnerRepository {
  async create(partner: Partner): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, partner: UpdatePartnerDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Partner[]> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Partner> {
    throw new Error('Method not implemented.');
  }
  async findByDocument(document: string): Promise<Partner> {
    throw new Error('Method not implemented.');
  }
  async findByCoverageArea(coverageArea: string): Promise<Partner> {
    throw new Error('Method not implemented.');
  }
  async findByAddress(cep: string): Promise<Partner> {
    throw new Error('Method not implemented.');
  }
  async findNearest(nearest: string): Promise<Partner> {
    throw new Error('Method not implemented.');
  }
}
