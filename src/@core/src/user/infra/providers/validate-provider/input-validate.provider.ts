import {
  BadRequestError,
  InvalidPasswordError,
  ValidateProvider,
} from "../../../../@seedwork/application";

export type InputCreate = {
  name: string;
  email: string;
  password: string;
};

export class InputValidateProvider implements ValidateProvider {
  public updatePassword(oldPassword: string, password: string): void {
    if (!oldPassword) {
      throw new InvalidPasswordError("Old password is required");
    }

    if (!password) {
      throw new InvalidPasswordError("New password is required");
    }

    if (password === oldPassword) {
      throw new InvalidPasswordError(
        "Password should be different from old password!"
      );
    }
  }

  public authenticate(email: string, password: string): void {
    if (!email) {
      throw new BadRequestError("Email should not be empty");
    }

    if (!password) {
      throw new BadRequestError("Password should not be empty");
    }
  }

  public create(props: InputCreate): void {
    if (!props.name) {
      throw new BadRequestError("name is required");
    }

    if (!props.email) {
      throw new BadRequestError("email is required");
    }

    if (!props.password) {
      throw new BadRequestError("password is required");
    }
  }
}
