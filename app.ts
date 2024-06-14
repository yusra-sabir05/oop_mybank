#! /usr/bin/env node

import inquirer from "inquirer";
// bank account interface
interface BankAccount{
    accountNumber:number
    balance:number
    withdraw(amount:number):void
    deposite(amount:number):void
    checkBalance():void
}
// bank account class
class BankAccount  implements BankAccount{
    accountNumber: number;
    balance: number;
    constructor(accountNumber:number, balance:number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        
    }
    // debit money
    withdraw(amount: number): void {
        if(this.balance >= amount ){
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance is:$${this.balance}`);
            
        }else{
            console.log("Insufficient balance");
            
        }
    }

    // credit money
    deposite(amount: number): void {
        if (amount > 100) {
            amount -=1;
            this.balance += amount;
            console.log(`Deposite of $${amount} successful. Remaining balance:$${this.balance}`);
            
            
        }
    }
    // check balance
    checkBalance(): void {
        console.log(`Current balance:$${this.balance}`);
        
    }

}
// customore class
class Customer{
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobileNumber:number;
    account:BankAccount;

    constructor(firstName:string,
        lastName:string,
        gender:string,
        age:number,
        mobileNumber:number,
        account:BankAccount)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender =gender;
            this.age = age;
            this.mobileNumber = mobileNumber;
            this.account = account;

        }
}

// create bank account
const accounts:BankAccount[]=[
    new BankAccount(2021,1000),
    new BankAccount(2022,1000),
    new BankAccount(2023,1000)
];
// creating customer
const customers:Customer[] = [
    new Customer("Yusra","Sabir","female",18,3123456709 , accounts[0]),
    new Customer("Hussain Shah","Sabir","female",18,3220256709 , accounts[1]),
    new Customer("Khadija","Sabir","female",18,3139856709 , accounts[2])
]
// function to interact with bank account
 async function service() {
    do{
        const accountNumberInput = await inquirer.prompt([
            {
                name:"accountNumber",
                type:"number",
                message:"Enter your account number"

            }
        ])
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if (customer) {
            console.log(`Welcome, ${customer.firstName}:${customer.lastName}!\n`);
            const ans = await inquirer.prompt([
                {
                    name:"select",
                    type:"list",
                    message:"Select an operation",
                    choices:["Deposite","Withdraw","Check Balance","Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposite":
                    const depositeAmount = await inquirer.prompt([
                        {
                            name:"amount",
                            type:"number",
                            message:"Enter the amount to deposite"
                        }
                    ])
                    customer.account.deposite(depositeAmount.amount);
                    break;
                    case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name:"amount",
                            type:"number",
                            message:"Enter the amount to withdraw"
                        }
                    ])
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                    case "Check Balance":
                        customer.account.checkBalance()
                        break;
                        case"Exit":
                        console.log("Exiting bank program...");
                        console.log("\n Thank you for using our bank service. have a nice day");
                        return;
                       
                        
                        
            }
            
        }
        else{
            console.log("Invalid account number. please try again..");
            
        }
    }while (true) 
    
}
service()