const chalk = require("chalk");

console.log(chalk.blue("Welcome to game Guess a number!"));

const readLine = require("readline").createInterface({
  output: process.stdout,
  input: process.stdin,
});
const randNum = Math.floor(Math.random() * 10);

const tryLimit = 3;

let tryCounter = 1;

const game = () => {
  if (tryLimit < tryCounter) {
    console.log(chalk.red("You have wasted all of your tries! Game is over!"));
    readLine.close();
    return;
  }
  readLine.question(chalk.green("Enter a number \n"), (number) => {
    if (Number(number) === randNum) {
      console.log(chalk.green("Hooray, you won!"));
      readLine.close();
      return;
    } else if (randNum < Number(number)) {
      console.log("Your number is bigger");
    } else if (Number(number) < randNum) {
      console.log("Your number is less");
    }
    tryCounter += 1;
    game();
  });
};

game();
