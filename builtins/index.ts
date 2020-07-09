import chdir from './chdir.ts';
import echo from './echo.ts';
import env from './env.ts';
import pwd from './pwd.ts';

type Builtins = { [key: string]: (args: string[]) => void };

const builtins: Builtins = {
  cd: chdir,
  chdir,
  echo,
  env,
  pwd
};

export default builtins;