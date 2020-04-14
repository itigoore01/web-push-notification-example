export interface RegisterSuccessResult {
  success: true;
}

export interface RegisterErrorResult {
  success: false;
  message: string;
}

export type RegisterResult = RegisterSuccessResult | RegisterErrorResult;

export function createRegisterSuccessResult({
}: Partial<Omit<RegisterSuccessResult, 'success'>>): RegisterSuccessResult {
  return {
    success: true,
  };
}

export function createRegisterErrorResult({
  message = '',
}: Partial<Omit<RegisterErrorResult, 'success'>>): RegisterErrorResult {
  return {
    success: false,
    message,
  };
}
