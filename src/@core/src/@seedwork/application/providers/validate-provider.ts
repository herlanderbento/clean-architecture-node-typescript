export interface ValidateProvider {
  authenticate(email: string, password: string): void;
  create(props: any): void;
  // create(name: string, email: string, password: string): void;
  updatePassword(oldPassword: string, password: string): void;
}
export default ValidateProvider;
