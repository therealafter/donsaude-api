import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PartnerAddress } from './partner-address.entity';

@Entity('partners')
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'partner_email' })
  email: string;

  @Column({ name: 'partner_password' })
  password: string;

  @Column({ name: 'partner_name' })
  name: string;

  @Column({ name: 'partner_phone' })
  phone: string;

  @Column({ name: 'partner_cellphone' })
  cellphone: string;

  @Column({ name: 'partner_cnpj' })
  cnpj: string;

  @Column({ name: 'partner_category' })
  category: string;

  @Column({ name: 'clinical_manager' })
  clinicalManager: string;

  @Column({ name: 'financial_responsible' })
  financialResponsible: string;

  @OneToMany(() => PartnerAddress, (address) => address.partner)
  addresses?: PartnerAddress[];

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
}
