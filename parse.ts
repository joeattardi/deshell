export function parseCommand(input: string) {
  const argv = input.split(' ');

  const commandIndex = argv.findIndex(arg => !arg.includes('='));
  const command = commandIndex >= 0 ? argv[commandIndex] : null;
  const args = commandIndex >= 0 ? argv.slice(commandIndex + 1) : [];

  const env = argv.slice(0, commandIndex).reduce((previous: {[key: string]: string}, arg) => {
    const index = arg.indexOf('=');
    const key = arg.slice(0, index);
    const value = arg.slice(index + 1);
    previous[key] = value;
    return previous;
  }, {});

  return {
    command,
    args,
    env
  };
}
