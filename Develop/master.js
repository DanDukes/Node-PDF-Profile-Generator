//Packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const puppeteer = require("puppeteer");
const generateHTML = require("./generateHTML");
const writeFileAsync = util.promisify(fs.writeFile);

let profile;

//Runtime
init();

//Functions
async function init() {
  try {
    let { username } = await getProfileName();
    const { color } = await getColor();
    let starCountData = await getStarredNumber(username);
    let { data } = await getData(username);
    let starCount = starCountData.data.length;
    data.color = color;
    data.starCount = starCount;
    profile = username;

    const html = generateHTML(data);
    writeFileAsync("test.html", html).then(function() {
      console.log("Successfully wrote to test.html file");
    });
    makePDF();
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

function getStarredNumber(username) {
  let starred = axios.get(`https://api.github.com/users/${username}/starred`);
  return starred;
}

function getColor() {
  const color = inquirer.prompt({
    type: "list",
    name: "color",
    message: "What is your favorite color?",
    choices: ["Red", "Green", "Blue", "Pink"]
  });

  return color;
}

async function makePDF() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1440,
      height: 900,
      deviceScaleFactor: 2
    });
    await page.goto(
      "file:"+ __dirname + "/test.html",
      {
        waitUntil: "networkidle2"
      }
    );
    await page.pdf({
      path: `${profile}.pdf`,
      pageRanges: "1",
      format: "A4",
      printBackground: true
    });
    await browser.close();
    console.log(`PDF Created at ${profile}.pdf`);
  } catch (err) {
    console.log(err);
  }
}
