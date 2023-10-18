import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { PartnerService } from '../domain/partner.service';
import { AddPartnerDto } from './dtos/add-partner.dto';
import { Partner } from '../domain/entities/partner.entity';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addPartner(@Body() partner: AddPartnerDto): Promise<void> {
    await this.partnerService.addPartner(partner);
  }

  @Get('cep/:cep')
  @HttpCode(HttpStatus.OK)
  async getCep(@Param('cep') cep: string) {
    return await this.partnerService.findCep(cep);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updatePartner(
    @Param('id') id: string,
    @Body() partner: AddPartnerDto,
  ): Promise<void> {
    await this.partnerService.updatePartner(id, partner);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePartner(@Param('id') id: string): Promise<void> {
    await this.partnerService.deletePartner(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Partner[]> {
    return await this.partnerService.findAllPartners();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string): Promise<Partner> {
    return await this.partnerService.findPartnerById(id);
  }
}
