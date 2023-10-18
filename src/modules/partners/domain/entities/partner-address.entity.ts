import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Partner } from './partner.entity';

@Entity('partner_addresses')
export class PartnerAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'number' })
  number: string;

  @Column({ name: 'complement', nullable: true }) // Complement is optional, hence nullable: true
  complement: string;

  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'neighborhood' })
  neighborhood: string;

  // Relationship with Partner
  @ManyToOne(() => Partner, (partner) => partner.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
}
