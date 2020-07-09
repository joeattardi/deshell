import { bold, yellow } from 'https://deno.land/std/fmt/colors.ts';

import { readKeypress } from "https://deno.land/x/keypress@0.0.4/mod.ts";
// import { clearLine, goLeft } from "https://denopkg.com/iamnathanj/cursor@v2.0.0/mod.ts";

const encoder = new TextEncoder();

export async function getInput() {
  const cwd = Deno.cwd();
  const leaf = cwd.split('/').slice(-1)[0];

  const prompt = `🦕 ${bold(yellow(leaf || '/'))} $ `;
  await Deno.stdout.write(encoder.encode(prompt));
  let line = '';

  for await (const keypress of readKeypress()) {
    if (line === '' && keypress.key === 'd' && keypress.ctrlKey) {
      Deno.exit(0);
    } else if (keypress.key === 'return') {
      await Deno.stdout.write(encoder.encode('\n'));
      return line;
    } else if (keypress.key === 'space') {
      line += ' ';
      await Deno.stdout.write(encoder.encode(' '));
    } else if (keypress.key && keypress.key.length === 1 && !keypress.ctrlKey) {
      line += keypress.key;
      await Deno.stdout.write(encoder.encode(keypress.key));
    }

    // } else if (keypress.key === 'left') {
    //   await clearLine();
    //   await goLeft(line.length + prompt.length);
    //   await Deno.stdout.write(encoder.encode(prompt));
    // }
  }
}
