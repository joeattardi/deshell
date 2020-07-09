import { bold } from 'https://deno.land/std/fmt/colors.ts';

export default async function(args: string[]) {
  const homeDirectory = Deno.env.get('HOME') || '/';
  let actualDir = args[0] ? args[0].replace(/~/g, homeDirectory): homeDirectory;

  try {
    await Deno.stat(actualDir);
    Deno.chdir(actualDir);
  } catch (err) {
    console.log(`No such directory: ${bold(actualDir)}`);
  }
}
