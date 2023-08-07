import { JobRepository } from "../../domain/repository/job.repository";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";
import { JobOutput, JobOutputMapper } from "../dto/job-output";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../../../@seedwork/application/dto/pagination-output";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input";

export namespace ListJobsUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    public constructor(private categoryRepository: JobRepository.Repository) {}

    public async execute(input: Input): Promise<Output> {
      const params = new JobRepository.SearchParams(input);
      const searchResult = await this.categoryRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: JobRepository.SearchResult): Output {
      const { items: _items } = searchResult;
      const items = _items.map((item) => {
        return JobOutputMapper.toOutput(item);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<JobOutput>;
}

export default ListJobsUseCase;
