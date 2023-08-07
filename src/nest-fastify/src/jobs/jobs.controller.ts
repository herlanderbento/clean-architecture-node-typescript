import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  HttpCode,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  CreateJobUseCase,
  DeleteJobUseCase,
  GetJobUseCase,
  UpdateJobUseCase,
  ListJobsUseCase,
} from '@m27/the-food/src/job/application';

@Controller('jobs')
export class JobsController {
  @Inject(CreateJobUseCase.UseCase)
  private createUseCase: CreateJobUseCase.UseCase;
  @Inject(ListJobsUseCase.UseCase)
  private listUseCase: ListJobsUseCase.UseCase;
  @Inject(DeleteJobUseCase.UseCase)
  private deleteUseCase: DeleteJobUseCase.UseCase;
  @Inject(GetJobUseCase.UseCase)
  private getUseCase: GetJobUseCase.UseCase;
  @Inject(UpdateJobUseCase.UseCase)
  private updateUseCase: UpdateJobUseCase.UseCase;

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.createUseCase.execute(createJobDto);
  }

  @Get()
  findAll() {
    // return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.jobsService.findOne(+id);
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    // return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.jobsService.remove(+id);
  }
}
