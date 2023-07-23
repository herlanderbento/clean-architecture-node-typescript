import { User, UserId } from "../entities/user";
import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "../../../@seedwork/domain/repository/repository-contracts";

export namespace UserRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<User, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      User,
      UserId,
      Filter,
      SearchParams,
      SearchResult
    > {
    findByEmail(email: string): Promise<User>;
    findByEmailAlreadyExists(email: string): Promise<void>;
  }
}

export default UserRepository;
