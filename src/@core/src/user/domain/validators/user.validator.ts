import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { UserProperties } from "../entities/user";
import ClassValidatorFields from "../../../@seedwork/domain/validators/class-validator-fields";

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ name, email, password, created_at }: UserProperties) {
    Object.assign(this, { name, email, password, created_at });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  public validate(data: UserProperties): boolean {
    return super.validate(new UserRules(data ?? ({} as any)));
  }
}

export default class UserValidatorFactory {
  public static create(): UserValidator {
    return new UserValidator();
  }
}
