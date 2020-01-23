//Packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

//Runtime
mainLoop();

//Functions
async function mainLoop() {
  try {
    const { username } = await getProfileName();
    const { color } = await getColor();
    let { data } = await getData(username);
    data = filterData(data);

    console.log(username);
    console.log(color);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

function getProfileName() {
  const username = inquirer.prompt({
    type: "input",
    message: "What is your GitHub Profile name?",
    name: "username"
  });
  return username;
}

function getData(username) {
  const data = axios.get(`https://api.github.com/users/${username}`);
  return data;
}

function getColor() {
  const color = inquirer.prompt({
    type: "list",
    name: "color",
    message: "What is your favorite color?",
    choices: ["Red", "Green", "Blue", "Yellow", "Orange", "Purple"]
  });

  return color;
}

function filterData(data) {
  const keys = [
    "login",
    "avatar_url",
    "bio",
    "location",
    "blog",
    "html_url",
    "public_repos",
    "followers",
    "following",
    "starred_url"
  ];
  let filteredData = {};

  keys.forEach(value => {
    if (data[value]) {
      filteredData[value] = data[value];
    }
  });

  return filteredData;
}

function writeHTML(obj) {
  const html = `<html>
  <body>
  <div 
  `;
}
