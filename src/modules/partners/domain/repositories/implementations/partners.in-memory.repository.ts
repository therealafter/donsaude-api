import { AddPartnerDto } from 'src/modules/partners/http/dtos/add-partner.dto';
import { UpdatePartnerDto } from 'src/modules/partners/http/dtos/update-partner.dto';
import { Partner } from '../../entities/partner.entity';
import { PartnerRepository } from '../partner.repository.interface';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PartnersInMemoryRepository implements PartnerRepository {
  private partners: Partner[] = [];

  async create(partner: Partner): Promise<void> {
    const partnerAlreadyExists = await this.findByDocument(partner.cnpj);

    if (partnerAlreadyExists) {
      throw new HttpException('Partner already exists', HttpStatus.CONFLICT);
    }

    const partnerAlreadyExistsByEmail = await this.findByEmail(partner.email);

    if (partnerAlreadyExistsByEmail) {
      throw new HttpException('Partner already exists', HttpStatus.CONFLICT);
    }

    partner.id = uuid();
    partner.createdAt = new Date();
    partner.updatedAt = new Date();

    this.partners.push(partner);
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
    return this.partners.filter((p) => p.address[0].cep === cep);
  }
}
