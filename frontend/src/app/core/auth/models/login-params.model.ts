export interface LoginParams {
  email: string;
  password: string;
  remember: boolean;
}

export function createLoginParams({
  email = '',
  password = '',
  remember = true,
}: Partial<LoginParams>): LoginParams {
  return {
    email,
    password,
    remember,
  };
}
