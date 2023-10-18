import { UpdatePartnerDto } from 'src/modules/partners/http/dtos/update-partner.dto';
import { Partner } from '../../entities/partner.entity';
import { PartnerRepository } from '../partner.repository.interface';
import { Repository } from 'typeorm';

export class PartnersTypeOrmRepository implements PartnerRepository {
  constructor(private partnerRepository: Repository<Partner>) {}

  async create(partner: Partner): Promise<void> {
    await this.partnerRepository.save(partner);
  }

  async update(id: string, partner: UpdatePartnerDto): Promise<void> {
    await this.partnerRepository.update(id, partner);
  }

  async delete(id: string): Promise<void> {
    await this.partnerRepository.delete(id);
  }

  async findByEmail(email: string): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({
      where: { email },
    });

    return partner;
  }

  async findAll(
    page: number,
    limit: number,
    search: string,
  ): Promise<Partner[]> {
    const partners = await this.partnerRepository.find({
      skip: (page - 1) * limit,
      take: page * limit,
    });

    return partners;
  }

  async findById(id: string): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({ where: { id } });

    return partner;
  }

  async findByDocument(document: string): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({
      where: { cnpj: document },
    });

    return partner;
  }

  async findByCoverageArea(coverageArea: string): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({
      where: { category: coverageArea },
    });

    return partner;
  }

  async findByAddress(cep: string): Promise<Partner[]> {
    const partners = await this.partnerRepository.find({
      where: {
        address: {
          cep: cep,
        },
      },
      relations: ['addresses'],
    });

    return partners;
  }
}
