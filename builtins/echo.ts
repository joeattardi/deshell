import { bold } from 'https://deno.land/std/fmt/colors.ts';

import { environment } from '../state.ts';

export default function(args: string[]) {
  const result = args.map(arg => {
    if (arg[0] === '$') {
      return bold(environment[arg.slice(1)]);
    }

    return arg;
  });

  console.log(result.join(' '));
}
