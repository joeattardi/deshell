import { bold } from 'https://deno.land/std/fmt/colors.ts';

import { exec, find } from './exec.ts';
import { getInput } from './input.ts';
import { parseCommand } from './parse.ts';
import builtins from './builtins/index.ts';

while (true) {
  const command = await getInput();
  if (command) {
    const parsedCommand = parseCommand(command);
    if (parsedCommand.command in builtins) {
      await builtins[parsedCommand.command](parsedCommand.args);
    } else {
      const foundCommand = await find(parsedCommand.command);
      if (foundCommand) {
        await exec(foundCommand, parsedCommand.args);
      } else {
        console.log(`command not found: ${bold(parsedCommand.command)}`);
      }
    }
  }
}
