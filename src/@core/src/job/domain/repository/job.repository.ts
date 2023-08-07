import { Job, JobId } from "../entities/job";
import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "../../../@seedwork/domain/repository/repository-contracts";

export namespace JobRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Job, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Job,
      JobId,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default JobRepository;
