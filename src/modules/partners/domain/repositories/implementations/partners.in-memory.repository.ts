import { AddPartnerDto } from 'src/modules/partners/http/dtos/add-partner.dto';
import { UpdatePartnerDto } from 'src/modules/partners/http/dtos/update-partner.dto';
import { Partner } from '../../entities/partner.entity';
import { PartnerRepository } from '../partner.repository.interface';

import { v4 as uuid } from 'uuid';
import { HttpException } from '@nestjs/common';

export class PartnersInMemoryRepository implements PartnerRepository {
  private partner: Partner[] = [];

  async create(partner: Partner): Promise<void> {
    const data = {
      id: uuid(),
      ...partner,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    this.partner.push(data);
  }

  async update(id: string, partner: UpdatePartnerDto): Promise<void> {
    const index = this.partner.findIndex((item) => item.id === id);

    this.partner[index] = {
      ...this.partner[index],
      ...partner,
      updatedAt: new Date(),
    };
  }

  async findByEmail(email: string): Promise<Partner> {
    const partner = this.partner.find((item) => item.email === email);
    return partner;
  }

  async delete(id: string): Promise<void> {
    const index = this.partner.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new HttpException('Partner not found', 404);
    }

    this.partner.splice(index, 1);
  }

  async findAll(page: number, limit: number): Promise<Partner[]> {
    const partners = this.partner.slice((page - 1) * limit, page * limit);
    return partners;
  }

  async findById(id: string): Promise<Partner> {
    const partner = this.partner.find((item) => item.id === id);
    return partner;
  }

  async findByDocument(document: string): Promise<Partner> {
    const partner = this.partner.find((item) => item.cnpj === document);
    return partner;
  }

  async findByCoverageArea(coverageArea: string): Promise<Partner> {
    const partner = this.partner.find((item) => item.category === coverageArea);
    return partner;
  }

  async findByAddress(cep: string): Promise<Partner[]> {
    const partners = this.partner.filter((item) => item.address.cep === cep);
    return partners;
  }
}
