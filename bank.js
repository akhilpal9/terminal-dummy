const { User, bankMockData } = require("./user");

// Bank terminal operations
const bankModule = {
    currentUser: null,

    login: (params) => {
        if(params.name) {
            params.name = params.name.toLowerCase();
            if(bankMockData[params.name]) {
                this.currentUser = bankMockData[params.name];
            } else {
                this.currentUser = bankMockData[params.name] = new User(params.name);
            }
            console.log(`Hello, ${params.name}`);
            console.log(`Your balance is $${this.currentUser.getBalance()}`);
            this.currentUser.printPendingDues();
        }
    },

    logout: () => {
        console.log(`Goodbye, ${this.currentUser.getName()}`);
        currentUser = null;
    },

    validateAuth: () => {
        if(this.currentUser)
            return true;
        else   
            throw "This operation not permitted without login";
    },

    checkIfUserExists: (params) => {
        if(params.name) {
            return !(!bankMockData[params.name]);
        }

        return false;
    },

    deposit: async (params) => {
        if(params.amount && isNaN(parseFloat(params.amount)))
            throw "Invalid amount";

        let amount = params.amount;
        let user = params.name ? bankMockData[params.name] : this.currentUser;
        if(!user)
            throw "Invalid user";

        // Deposit in the moentioned account
        bankMockData[user.getName()].deposit(amount);
        console.log(`Your balance is $${this.currentUser.getBalance()}`);
        if(!params.name) // If deposit is done for current user
            this.currentUser.printPendingDues();
    },

    withdraw: (params) => {
        if(params.amount && isNaN(parseFloat(params.amount)))
            throw "Invalid amount";

        let amount = params.amount;
        let user = params.name ? bankMockData[params.name] : this.currentUser;
        if(!user)
            throw "Invalid user";

        // Deposit in the moentioned account
        bankMockData[user.getName()].withdraw(amount);

        console.log(`Your balance is $${this.currentUser.getBalance()}`);
    },

    transfer: (params) => {
        let targetUser = params.target;
        let amount = params.amount;
        if(!this.currentUser || !targetUser || !amount) {
            throw "Invaid transfer input";
        }

        targetUser = targetUser.toLowerCase();
        // Check if user exists for whome transfer initiated
        if(!bankMockData[targetUser])
            throw `${targetUser} user does not exists`;

        if(this.currentUser.getBalance() >= amount) { // Balance is equal or more than transferred amount
            this.currentUser.withdraw(amount);
            bankMockData[targetUser].deposit(amount, false);
        } else { // Balance is less than transferred amount
            let balanceAmount = this.currentUser.getBalance();
            if(balanceAmount > 0) {
                this.currentUser.withdraw(balanceAmount);
                bankMockData[targetUser].deposit(balanceAmount);
            }
            
            // Update in the queues
            //If user has already pending due
            if(this.currentUser.pendingDues[targetUser]) {
                this.currentUser.pendingDues[targetUser] += (amount - balanceAmount);
                bankMockData[targetUser].pendingDues[this.currentUser.getName()] -= (amount - balanceAmount);
            } else {
                this.currentUser.pendingDues[targetUser] = (amount - balanceAmount);
                bankMockData[targetUser].pendingDues[this.currentUser.getName()] = -(amount - balanceAmount);
                this.currentUser.dueOrder.push(targetUser);
            }
        }

        console.log(`Transferred ${amount} to ${targetUser}`);
        console.log(`Your balance is $${this.currentUser.getBalance()}`);

        this.currentUser.printPendingDues();
    }
}

module.exports = bankModule;