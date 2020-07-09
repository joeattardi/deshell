import { readLines } from 'https://deno.land/std/io/mod.ts';
import { bold, yellow } from 'https://deno.land/std/fmt/colors.ts';

import { exec, find } from './exec.ts';
import { parseCommand } from './parse.ts';

import builtins from './builtins/index.ts';

async function prompt() {
  const cwd = Deno.cwd();
  const leaf = cwd.split('/').slice(-1)[0];

  await Deno.stdout.write(new TextEncoder().encode(`🦕 ${bold(yellow(leaf || '/'))} $ `));
  for await (const line of readLines(Deno.stdin)) {
    return line;
  }
}

while (true) {
  const command = await prompt();
  if (command) {
    const parsedCommand = parseCommand(command);
    if (parsedCommand.command in builtins) {
      await builtins[parsedCommand.command](parsedCommand.args);
    } else {
      const foundCommand = await find(parsedCommand.command);
      if (foundCommand) {
        await exec(foundCommand, parsedCommand.args);
      } else {
        console.log(`command not found: ${bold(command)}`);
      }
    }
  }
}
