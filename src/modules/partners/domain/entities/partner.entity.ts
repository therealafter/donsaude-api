import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressDto } from '../../http/dtos/add-partner.dto';

@Entity('partners')
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'partner_email', unique: true })
  email: string;

  @Column({ name: 'partner_password', select: false })
  password: string;

  @Column({ name: 'partner_name' })
  name: string;

  @Column({ name: 'partner_phone' })
  phone: string;

  @Column({ name: 'partner_cellphone' })
  cellphone: string;

  @Column({ name: 'partner_cnpj', unique: true })
  cnpj: string;

  @Column({ name: 'partner_category' })
  category: string;

  @Column({ name: 'clinical_manager' })
  clinicalManager: string;

  @Column({ name: 'financial_responsible' })
  financialResponsible: string;

  @Column({ name: 'partner_address', type: 'jsonb' })
  address?: AddressDto[];

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
}
