var shell = require("shelljs");

var version = shell.exec(
  "node -p \"require('./node_modules/semantic-ui-css/package.json').version\"",
  {
    silent: true,
  }
).stdout;
var catver = shell.cat("./public/vendors/semantic-ui-css/version.txt");

version = version.replace(/^\s+|\s+$/g, ""); // remove newline and spaces
catver = catver.replace(/^\s+|\s+$/g, "");
shell.echo('Found semantic-ui-css version: "' + version + '"');
shell.echo('File semantic-ui-css version: "' + catver + '"');
if (!(version === catver)) {
  console.log("different version found, replace old files");
  // Clean up old folder and files
  shell.rm("-rf", "./public/vendors/semantic-ui-css/");
  // Create folder
  shell.mkdir("-p", "./public/vendors/semantic-ui-css/");
  // Copy themes folder and its contents
  shell.cp(
    "-R",
    "./node_modules/semantic-ui-css/themes",
    "./public/vendors/semantic-ui-css/themes"
  );
  shell.cp(
    "./node_modules/semantic-ui-css/semantic.min.css",
    "./public/vendors/semantic-ui-css/"
  );
  shell.exec(
    "echo " + version + '> "./public/vendors/semantic-ui-css/version.txt"'
  );
} else {
  console.log("Same version found, skip file copy");
}
shell.exit(0);
