export const environment = {
  ...Deno.env.toObject()
};

export function setEnv(key: string, value: string) {
  environment[key] = value;
}

export function getEnv(key: string): string {
  return environment[key];
}
