import { PartialType } from '@nestjs/mapped-types';
import { AddPartnerDto } from './add-partner.dto';

export class UpdatePartnerDto extends PartialType(AddPartnerDto) {}
