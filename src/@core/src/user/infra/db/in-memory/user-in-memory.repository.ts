import { User, UserId, UserRepository } from "../../../domain";
import { InMemorySearchableRepository } from "../../../../@seedwork/domain/repository/in-memory-repository";
import { CustomError, SortDirection } from "../../../../@seedwork/domain";

export class UserInMemoryRepository
  extends InMemorySearchableRepository<User, UserId>
  implements UserRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  public async findByEmail(email: string, errorMessage?: any): Promise<User> {
    return this.items.find((item) => item.email === email);
  }

  public async findByEmailAlreadyExists(email: string): Promise<void> {
    const entity = this.items.find((item) => item.email === email);

    if (entity) {
      throw new CustomError(`User already exists`);
    }
  }

  protected async applyFilter(
    items: User[],
    filter: UserRepository.Filter
  ): Promise<User[]> {
    if (!filter) {
      return items;
    }

    return items.filter((item) => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: User[],
    sort: string,
    sort_dir: SortDirection
  ): Promise<User[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}

export default UserInMemoryRepository;
