export interface UseCase<Input, OutPut> {
  execute(input: Input): OutPut | Promise<OutPut>;
}

export default UseCase;
