const cliSelect = require("cli-select");
const chalk = require("chalk");
const { exec } = require("child_process");

cliSelect({
  values: ["Major", "Minor", "Patch"],
  valueRenderer: function (value, selected) {
    if (selected) {
      return chalk.bold(chalk.yellow(value));
    }

    return value;
  },
}).then(
  function (resp) {
    console.log(chalk.green(resp.value + " release is selected"));

    const scripts = [
      "npm version " +
        resp.value.toLowerCade() +
        " --force --no-git-tag-version",
      "git add package.json package-lock.json",
      'git commit -m ":bookmark: update ' + resp.value + " version",
    ];
    exec(scripts.join(" &"));
  },
  function () {
    console.log(red("Failed to update application version"));
  }
);
