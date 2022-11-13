// For concurrency below data should be persistent
const bankMockData = {

};

// Basic User model
class User {
    name;
    balance;
    pendingDues;

    constructor(name, balance = 0, pendingDues = {}) {
        this.name = name;
        this.balance = balance;
        this.pendingDues = {}; // Key User due and Value is amount
        this.dueOrder = [];
    }

    getName() {
        return this.name;
    }

    getBalance() {
        return this.balance;
    }

    deposit(amount, transferMess = true) {
        this.balance += parseFloat(amount);
        if(this.dueOrder.length > 0) {
            let dueQueue = [...this.dueOrder]; // Copy of due order
            for (let index = 0; index < dueQueue.length && this.getBalance() > 0; index++) {  // Validate user has pending dues and has balance in the account
                let dueUserName = dueQueue[0];
                let dueAmount = this.pendingDues[dueUserName];
                let transferAmount = dueAmount;
                if(dueAmount) {
                    if(dueAmount <= this.getBalance() ){
                        // Due amount is less than current deposited amount
                        this.withdraw( dueAmount ); // Withdraw due amount
                        this.getBalance();
                        bankMockData[dueUserName].deposit(dueAmount, false); // Deposit in the person whose amount is due
                        // Remove from current users due details
                        delete this.pendingDues[dueUserName];
                        this.dueOrder.shift();
                        // Update the persons details whose amount is due
                        delete bankMockData[dueUserName].pendingDues[this.getName()];
                    } else {
                        // Due amount is more than current deposited amount
                        let accBalance = this.getBalance();
                        transferAmount = accBalance;
                        // let remainBalance = dueAmount - accBalance;
                        this.withdraw( accBalance ); // Withdraw due amount
                        bankMockData[dueUserName].deposit(accBalance, false); // Deposit in the person whose amount is due

                        // Update the amount in the queue 
                        this.pendingDues[dueUserName] = this.pendingDues[dueUserName] - accBalance; // As due is in -ve
                        bankMockData[dueUserName].pendingDues[this.getName()] = bankMockData[dueUserName].pendingDues[this.getName()] + accBalance;
                    }
                    if(transferMess) {
                        console.log(`Transferred $${transferAmount} to ${dueUserName}`);
                        console.log(`Your balance is $${this.getBalance()}`);
                    }
                }
            }
        }
    }

    withdraw(amount) {
        if( amount > this.balance)
            throw "Withdraw amount exceeds balance amount";
        this.balance -= parseFloat(amount);
    }

    getPendingDues() {
        return this.pendingDues;
    }

    setPendingDues(due) {
        this.pendingDues = due;
    }

    getDueOrder() {
        return this.dueOrder();
    }

    setDueOrder(order) {
        this.dueOrder = order;
    }

    printPendingDues() {
        let pendingDues = this.getPendingDues();
        Object.keys(pendingDues).forEach((key) => {
                let value = pendingDues[key];
                console.log(`Owed $${Math.abs(value)} ${value > 0? 'to' : 'from'} ${key}`);
        });
    }
}

module.exports  = {
    bankMockData,
    User
}