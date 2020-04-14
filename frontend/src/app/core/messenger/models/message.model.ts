export interface Message {
  to: string;
  body: string;
}


export function createMessage({
  to = '',
  body = '',
}: Partial<Message>): Message {
  return {
    to,
    body,
  };
}
