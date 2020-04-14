export interface SendMessageSuccessResult {
  success: true;
}

export interface SendMessageErrorResult {
  success: false;
  message: string;
}

export type SendMessageResult = SendMessageSuccessResult | SendMessageErrorResult;

export function createSendMessageSuccessResult({}: Partial<Omit<SendMessageSuccessResult, 'success'>>): SendMessageSuccessResult {
  return {
    success: true,
  };
}

export function createSendMessageErrorResult({
  message = '',
}: Partial<Omit<SendMessageErrorResult, 'success'>>): SendMessageErrorResult {
  return {
    success: false,
    message,
  };
}
