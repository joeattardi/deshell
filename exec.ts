import { exec as execFn } from 'https://deno.land/x/exec/mod.ts';


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

export async function exec(command: string) {
  await execFn(command);
}