import { User } from "../../domain";

export type UserPropsDto = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export type UserTokenDto = Required<
  { token: string } & Pick<UserPropsDto, "name" | "email">
>;

export class UserOutputMapper {
  public static toOutput(entity: User) {
    return entity.toJSON();
  }

  public static toOutputShortProps(entity: UserPropsDto) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }

  public static toOutputUserToken(props: UserTokenDto) {
    return {
      token: props.token,
      user: {
        name: props.name,
        email: props.email,
      },
    };
  }
}
