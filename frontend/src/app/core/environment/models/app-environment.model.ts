export interface AppEnvironment {
  applicationServerKey: string;
}

export function createAppEnvironment({
  applicationServerKey = '',
}: Partial<AppEnvironment>): AppEnvironment {
  return {
    applicationServerKey,
  };
}
