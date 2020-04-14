export interface AddReminderSuccessResult {
  success: true;
}

export interface AddReminderErrorResult {
  success: false;
  message: string;
}

export function createAddReminderSuccessResult({}: Partial<Omit<AddReminderSuccessResult, 'success'>>): AddReminderSuccessResult {
  return {
    success: true,
  };
}

export function createAddReminderErrorResult({
  message = '',
}: Partial<Omit<AddReminderErrorResult, 'success'>>): AddReminderErrorResult {
  return {
    success: false,
    message,
  };
}
