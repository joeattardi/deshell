import chdir from './chdir.ts';
import pwd from './pwd.ts';

type Builtins = { [key: string]: (args: string[]) => void };

const builtins: Builtins = {
  cd: chdir,
  chdir,
  pwd
};

export default builtins;