import { environment } from './state.ts';

export async function find(command: string) {
  const path = environment.PATH.split(':');
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

export async function exec(command: string, args: string[], env: {[key: string]: string}) {
  const process = Deno.run({
    cmd: [command, ...args],
    env: {
      ...Deno.env.toObject(),
      ...env
    }
  });

  return await process.status();
}
