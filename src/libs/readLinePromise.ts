
import * as readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function readlinePromise(message: string) {
  return new Promise((resolve, reject) => {

    let ans;

    rl.question(message, (answer) => {
      ans = answer;
      rl.close();
    });

    rl.on('close', function () {
      resolve(ans || '');
    });

  });
}
