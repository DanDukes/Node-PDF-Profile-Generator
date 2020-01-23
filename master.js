//Packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

async function getProfile() {
  try {
    const { username } = await inquirer.prompt({
      type: "input",
      message: "What is your GitHub Profile name?",
      name: "username"
    });

    const { color } = await inquirer.prompt({
      type: "list",
      name: "color",
      message: "What is your favorite color?",
      choices: ["Red", "Green", "Blue", "Yellow", "Orange", "Purple"]
    });

    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );

    console.log(color, data);
  } catch (err) {
    console.log(err);
  }
}
