export function parseCommand(input: string) {
  const parts = input.split(' ');

  return {
    command: parts[0],
    args: parts.slice(1)
  };
}
