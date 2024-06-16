#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import {differenceInSeconds, getSeconds } from "date-fns";

let answer = await inquirer.prompt({
  name: "enter",
  type: "number",
  message: "Enter value under 60 to start timer in seconds",
  validate: (val) => {
    if (isNaN(val)) {
      return "Enter valid number";
    } else if (val > 60) {
      return "Enter number in seconds means under 60";
    }
    return true;
  },
});
let input = answer.enter;
function time(val: number) {
  let intTime = new Date().setSeconds(new Date().getSeconds() + val);
  const intervalTime = new Date(intTime);
  let intervalId = setInterval(() => {
    const currentTime = new Date();
    const timediff = differenceInSeconds(intervalTime, currentTime);
    input--;
    if (input <= 0) {
      clearInterval(intervalId);
      console.log(chalk.redBright("TIMER EXPIRED"));
      process.exit();
    }
    //const min = Math.floor((timediff % (3600 * 24)) / 3600);
    const min = Math.floor(timediff / 60)
    const sec = Math.floor(timediff % 60);
    console.log(chalk.greenBright(`${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`));
  }, 1000);
}

time(input);
