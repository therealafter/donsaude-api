import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AddPartnerDto } from '../http/dtos/add-partner.dto';
import {
  PARTNER_REPOSITORY_TOKEN,
  PartnerRepository,
} from './repositories/partner.repository.interface';
import { Partner } from './entities/partner.entity';
import { LoggerService } from 'src/common/loggers/logger.service';
import { ICepResponse } from './dtos/cep.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PartnerService {
  constructor(
    @Inject(PARTNER_REPOSITORY_TOKEN)
    private readonly partnerRepository: PartnerRepository,
    private readonly loggerService: LoggerService,
    private readonly httpService: HttpService,
  ) {}

  async addPartner(partner: AddPartnerDto): Promise<void> {
    this.loggerService.info('Adding partner');

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

    this.loggerService.info(`Partner ${partner.cnpj} added successfully`);
  }

  async updatePartner(id: string, partner: AddPartnerDto): Promise<void> {
    this.loggerService.info('Updating partner');

    const partnerAlreadyExists = await this.partnerRepository.findById(id);

    if (!partnerAlreadyExists) {
      throw new HttpException('Partner not found', 404);
    }

    await this.partnerRepository.update(id, partner);

    this.loggerService.info(`Partner ${partner.cnpj} updated successfully`);
  }

  async deletePartner(id: string): Promise<void> {
    this.loggerService.info('Deleting partner');

    const partnerAlreadyExists = await this.partnerRepository.findById(id);

    if (!partnerAlreadyExists) {
      throw new HttpException('Partner not found', 404);
    }

    await this.partnerRepository.delete(id);

    this.loggerService.info(
      `Partner ${partnerAlreadyExists.cnpj} deleted successfully`,
    );
  }

  async findAllPartners(): Promise<Partner[]> {
    this.loggerService.info('Listing partners');

    const partners = await this.partnerRepository.findAll();

    this.loggerService.info('Partners listed successfully');

    return partners;
  }

  async findPartnerById(id: string): Promise<Partner> {
    this.loggerService.info('Searching partner');

    const partner = await this.partnerRepository.findById(id);

    if (!partner) {
      throw new HttpException('Partner not found', 404);
    }

    this.loggerService.info('Partner found successfully');

    return partner;
  }

  async findCep(cep: string): Promise<ICepResponse> {
    const cepIsInvalid = !cep.match(/^\d{5}-?\d{3}$/);

    if (cepIsInvalid) {
      throw new HttpException('CEP is invalid', 400);
    }

    const response = await this.httpService.axiosRef.get(
      `https://viacep.com.br/ws/${cep}/json/`,
    );

    return response.data;
  }
}
