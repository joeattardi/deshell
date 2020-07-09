import { bold } from 'https://deno.land/std/fmt/colors.ts';

import { exec, find } from './exec.ts';
import { getInput } from './input.ts';
import { parseCommand } from './parse.ts';
import builtins from './builtins/index.ts';

console.log('');
console.log('Welcome to deshell!');
console.log(`Type ${bold('exit')} or press Ctrl+D to exit.`);
console.log('');

while (true) {
  const command = await getInput();
  if (command) {
    const parsedCommand = parseCommand(command);
    if (parsedCommand.command && parsedCommand.command in builtins) {
      await builtins[parsedCommand.command](parsedCommand.args);
    } else if (parsedCommand.command) {
      const foundCommand = await find(parsedCommand.command);
      if (foundCommand) {
        await exec(foundCommand, parsedCommand.args, parsedCommand.env);
      } else {
        console.log(`command not found: ${bold(parsedCommand.command)}`);
      }
    }
  }
}
