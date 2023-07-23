import {
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchInputDto,
} from "../../../@seedwork/application";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserOutputMapper, UserPropsDto } from "../dto";

export namespace ListUsersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    public async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input);
      const searchResult = await this.userRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: UserRepository.SearchResult): Output {
      const { items: _items } = searchResult;
      const items = _items.map((item) => {
        return UserOutputMapper.toOutput(item);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<Omit<UserPropsDto, "password">>;
}
export default ListUsersUseCase;
