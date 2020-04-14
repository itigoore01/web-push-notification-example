export interface LoginSuccessResult {
  success: true;
}

export interface LoginErrorResult {
  success: false;
  message: string;
}

export type LoginResult = LoginSuccessResult | LoginErrorResult;

export function createLoginSuccessResult({
}: Partial<Omit<LoginSuccessResult, 'success'>>): LoginSuccessResult {
  return {
    success: true,
  };
}

export function createLoginErrorResult({
  message = '',
}: Partial<Omit<LoginErrorResult, 'success'>>): LoginErrorResult {
  return {
    success: false,
    message,
  };
}
