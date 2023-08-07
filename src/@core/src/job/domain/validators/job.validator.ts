import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import ClassValidatorFields from "../../../@seedwork/domain/validators/class-validator-fields";
import { JobProperties } from "../entities/job";

export class JobRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsDate()
  @IsOptional()
  created_at: Date;

  public constructor({
    name,
    description,
    is_active,
    created_at,
  }: JobProperties) {
    Object.assign(this, { name, description, is_active, created_at });
  }
}

export class JobValidator extends ClassValidatorFields<JobRules> {
  public validate(data: JobProperties): boolean {
    return super.validate(new JobRules(data ?? ({} as any)));
  }
}

export default class JobValidatorFactory {
  public static create(): JobValidator {
    return new JobValidator();
  }
}
