import JobRepository from "../../../domain/repository/job.repository";
import { InMemorySearchableRepository } from "../../../../@seedwork/domain/repository/in-memory-repository";
import { SortDirection } from "../../../../@seedwork/domain/repository/repository-contracts";
import { Job, JobId } from "../../../domain/entities/job";

export class JobInMemoryRepository
  extends InMemorySearchableRepository<Job, JobId>
  implements JobRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: Job[],
    filter: JobRepository.Filter
  ): Promise<Job[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Job[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<Job[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}

export default JobInMemoryRepository;
