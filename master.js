let inquirer = require("inquirer");
let username;
let color;

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your GitHub Profile name?",
      name: "profile"
    },
    {
      type: "list",
      name: "color",
      message: "What is your favorite color?",
      choices: ["Red", "Green", "Blue", "Yellow", "Orange", "Purple"]
    }
  ])
  .then(function(response) {
    username = response.profile;
    color = response.color;
    console.log(username, color);
  });
