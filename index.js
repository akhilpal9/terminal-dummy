const { askUserInput } = require("./userActions");

console.log("Press Ctrl+C for exit");

askUserInput();

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    process.exit();
});