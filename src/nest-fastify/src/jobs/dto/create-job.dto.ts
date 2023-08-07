import { CreateJobUseCase } from '@m27/the-food/src/job/application';

import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateJobDto implements CreateJobUseCase.Input {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
