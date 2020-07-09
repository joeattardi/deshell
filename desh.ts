import { readLines } from 'https://deno.land/std/io/mod.ts';
import { bold } from 'https://deno.land/std/fmt/colors.ts';

import { exec, find } from './exec.ts';

async function prompt() {
  await Deno.stdout.write(new TextEncoder().encode('🦕 $ '));
  for await (const line of readLines(Deno.stdin)) {
    return line;
  }
}

while (true) {
  const command = await prompt();
  if (command) {
    const foundCommand = await find(command);
    if (foundCommand) {
      await exec(foundCommand);
    } else {
      console.log(`command not found: ${bold(command)}`);
    }
  }
}
