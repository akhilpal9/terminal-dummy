const reader = require("readline-sync");
const { login, logout, deposit, currentUser, withdraw, transfer, validateAuth } = require("./bank");

const menu = async (userInput) => {
    if(userInput.length < 1)
        throw "Invalid input";

    let action = userInput[0].trim().toLowerCase();
    let params = userInput.slice(1);

    // * `login [name]` - Logs in as this customer and creates the customer if not exist
    // * `deposit [amount]` - Deposits this amount to the logged in customer
    // * `withdraw [amount]` - Withdraws this amount from the logged in customer
    // * `transfer [target] [amount]` - Transfers this amount from the logged in customer to the target customer
    // * `logout` - Logs out of the current customer
    switch(action) {
        case "login":
            if(params.length < 1)
                throw "Invalid login details";
            login({name: params.join(" ")});
            break;
        case "deposit":
            if(params.length < 1 || params.length > 1)
                throw "Invalid deposit amount input";
            validateAuth();
            deposit({amount: params[0]});
            break;  
        case "withdraw":
            if(params.length < 1 || params.length > 1)
                throw "Invalid withdraw amount input";
            validateAuth();
            withdraw({amount: params[0]});
            break;
        case "transfer":
            if(params.length < 2 || params.length > 2)
                throw "Invalid transfer amount input";
                validateAuth();
            transfer({target: params[0], amount: params[1]});
            break;
        case "logout":
            logout();
            break;
        default: 
            console.log("action", action);
            console.log("Input not recognised");
    }
}

const askUserInput = async ()=> {
    
    let line = reader.question("atm$ ");
    // Check if multiple space with no input
    line = line.trim();
    if(line.length < 1) {
        console.log("Invalid input");
    }

    let userInput = line.split(" ");

    try {
        await menu(userInput);
    } catch (error) {
        console.log(error);
    }
    askUserInput();
}

module.exports = { askUserInput };