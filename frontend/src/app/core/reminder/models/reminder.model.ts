export interface Reminder {
  content: string;
  remindAt: Date;
}

export function createReminder({
  content = '',
  remindAt = new Date(),
}: Partial<Reminder>) {
  return {
    content,
    remindAt,
  };
}
