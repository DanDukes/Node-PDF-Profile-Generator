const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your GitHub Profile name?",
      name: "username"
    },
    {
      type: "list",
      name: "color",
      message: "What is your favorite color?",
      choices: ["Red", "Green", "Blue", "Yellow", "Orange", "Purple"]
    }
  ])
  .then(function({ username }) {
    let color = response.color;
    const queryUrl = `https://api.github.com/users/${username}`;
    console.log(username, color);
    axios
      .get(queryUrl)
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        // handle error
        throw err;
      });
  });
