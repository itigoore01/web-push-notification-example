export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export function createRegisterParams({
  name = '',
  email = '',
  password = '',
  passwordConfirmation = '',
}: Partial<RegisterParams>): RegisterParams {
  return {
    name,
    email,
    password,
    passwordConfirmation,
  };
}
