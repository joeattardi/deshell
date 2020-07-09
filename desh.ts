import { readLines } from 'https://deno.land/std/io/mod.ts';
import { bold } from 'https://deno.land/std/fmt/colors.ts';

import { exec, find } from './exec.ts';
import { parseCommand } from './parse.ts';

async function prompt() {
  await Deno.stdout.write(new TextEncoder().encode('🦕 $ '));
  for await (const line of readLines(Deno.stdin)) {
    return line;
  }
}

while (true) {
  const command = await prompt();
  if (command) {
    const parsedCommand = parseCommand(command);
    const foundCommand = await find(parsedCommand.command);
    if (foundCommand) {
      await exec(foundCommand, parsedCommand.args);
    } else {
      console.log(`command not found: ${bold(command)}`);
    }
  }
}
