import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AddPartnerDto } from '../http/dtos/add-partner.dto';
import {
  PARTNER_REPOSITORY_TOKEN,
  PartnerRepository,
} from './repositories/partner.repository.interface';
import { Partner } from './entities/partner.entity';

@Injectable()
export class PartnerService {
  constructor(
    @Inject(PARTNER_REPOSITORY_TOKEN)
    private readonly partnerRepository: PartnerRepository,
  ) {}

  async addPartner(partner: AddPartnerDto): Promise<void> {
    const partnerAlreadyExists = await this.partnerRepository.findByDocument(
      partner.cnpj,
    );

    if (partnerAlreadyExists) {
      throw new HttpException('Partner already exists', 409);
    }

    const cnpjIsInvalid = !partner.cnpj.match(
      /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
    );

    if (cnpjIsInvalid) {
      throw new HttpException('CNPJ is invalid', 400);
    }

    await this.partnerRepository.create({
      ...partner,
    });
  }

  async updatePartner(id: string, partner: AddPartnerDto): Promise<void> {
    const partnerAlreadyExists = await this.partnerRepository.findById(id);

    if (!partnerAlreadyExists) {
      throw new HttpException('Partner not found', 404);
    }

    await this.partnerRepository.update(id, partner);
  }

  async deletePartner(id: string): Promise<void> {
    const partnerAlreadyExists = await this.partnerRepository.findById(id);

    if (!partnerAlreadyExists) {
      throw new HttpException('Partner not found', 404);
    }

    await this.partnerRepository.delete(id);
  }

  async findAllPartners(): Promise<Partner[]> {
    const partners = await this.partnerRepository.findAll();

    return partners;
  }

  async findPartnerById(id: string): Promise<Partner> {
    const partner = await this.partnerRepository.findById(id);

    if (!partner) {
      throw new HttpException('Partner not found', 404);
    }

    return partner;
  }
}
