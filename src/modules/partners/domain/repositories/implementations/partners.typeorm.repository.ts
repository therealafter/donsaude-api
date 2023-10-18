import { UpdatePartnerDto } from 'src/modules/partners/http/dtos/update-partner.dto';
import { Partner } from '../../entities/partner.entity';
import { PartnerRepository } from '../partner.repository.interface';
import { Repository } from 'typeorm';

export class PartnersTypeOrmRepository implements PartnerRepository {
  constructor(private partnerRepsoitory: Repository<Partner>) {}

  async create(partner: Partner): Promise<void> {
    await this.partnerRepsoitory.save(partner);
  }

  async update(id: string, partner: UpdatePartnerDto): Promise<void> {
    await this.partnerRepsoitory.update(id, partner);
  }

  async delete(id: string): Promise<void> {
    await this.partnerRepsoitory.delete(id);
  }

  async findAll(): Promise<Partner[]> {
    const partners = await this.partnerRepsoitory.find();

    return partners;
  }

  async findById(id: string): Promise<Partner> {
    const partner = await this.partnerRepsoitory.findOne({ where: { id } });

    return partner;
  }

  async findByDocument(document: string): Promise<Partner> {
    const partner = await this.partnerRepsoitory.findOne({
      where: { cnpj: document },
    });

    return partner;
  }

  async findByCoverageArea(coverageArea: string): Promise<Partner> {
    const partner = await this.partnerRepsoitory.findOne({
      where: { category: coverageArea },
    });

    return partner;
  }

  async findByAddress(cep: string): Promise<Partner[]> {
    const partners = await this.partnerRepsoitory.find({
      where: {
        addresses: {
          cep: cep,
        },
      },
      relations: ['addresses'],
    });

    return partners;
  }

  async findNearest(nearest: string): Promise<Partner> {
    throw new Error('Method not implemented.');
  }
}
