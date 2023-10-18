import { AddPartnerDto } from 'src/modules/partners/http/dtos/add-partner.dto';
import { UpdatePartnerDto } from 'src/modules/partners/http/dtos/update-partner.dto';
import { Partner } from '../../entities/partner.entity';
import { PartnerRepository } from '../partner.repository.interface';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PartnersInMemoryRepository implements PartnerRepository {
  private partners: Partner[] = [];

  async create(partner: AddPartnerDto): Promise<void> {
    const existingPartner = this.partners.find(
      (p) => p.email === partner.email,
    );
    if (existingPartner) {
      throw new HttpException(
        'Partner with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newPartner: Partner = {
      id: uuid(),
      ...partner,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    this.partners.push(newPartner);
  }

  async update(id: string, partner: UpdatePartnerDto): Promise<void> {
    const existingPartner = this.partners.find((p) => p.id === id);

    if (!existingPartner) {
      throw new HttpException('Partner not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(existingPartner, partner);
    existingPartner.updatedAt = new Date();
  }

  async findByEmail(email: string): Promise<Partner | undefined> {
    return this.partners.find((p) => p.email === email);
  }

  async delete(id: string): Promise<void> {
    const index = this.partners.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new HttpException('Partner not found', HttpStatus.NOT_FOUND);
    }

    this.partners.splice(index, 1);
  }

  async findAll(page: number, limit: number): Promise<Partner[]> {
    const startIndex = (page - 1) * limit;
    return this.partners.slice(startIndex, startIndex + limit);
  }

  async findById(id: string): Promise<Partner | undefined> {
    return this.partners.find((p) => p.id === id);
  }

  async findByDocument(document: string): Promise<Partner | undefined> {
    return this.partners.find((p) => p.cnpj === document);
  }

  async findByCoverageArea(coverageArea: string): Promise<Partner | undefined> {
    return this.partners.find((p) => p.category === coverageArea);
  }

  async findByAddress(cep: string): Promise<Partner[] | undefined> {
    return this.partners.filter((p) => p.address.cep === cep);
  }
}
