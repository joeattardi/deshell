import { path } from './state.ts';

export async function find(command: string) {
  for (const pathEntry of path) {
    try {
      await Deno.stat(`${pathEntry}/${command}`);
      return `${pathEntry}/${command}`;
    }
    catch (err) {
      // file not found
    }
  }
}

export async function exec(command: string, args: string[]) {
  const process = Deno.run({
    cmd: [command, ...args],
    env: Deno.env.toObject()
  });

  return await process.status();
}
