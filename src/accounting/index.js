const readline = require('readline');

// Account class to encapsulate business logic
class Account {
  constructor(initialBalance = 1000.00) {
    this.balance = initialBalance;
  }

  getBalance() {
    return this.balance;
  }

  credit(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
      throw new Error('Invalid amount');
    }
    this.balance += amount;
    return this.balance;
  }

  debit(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
      throw new Error('Invalid amount');
    }
    if (this.balance >= amount) {
      this.balance -= amount;
      return this.balance;
    } else {
      throw new Error('Insufficient funds for this debit.');
    }
  }
}

// CLI Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialize account
const account = new Account();

function showMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
  rl.question('Enter your choice (1-4): ', handleChoice);
}

function handleChoice(choice) {
  switch (choice) {
    case '1':
      console.log(`Current balance: ${account.getBalance().toFixed(2)}`);
      showMenu();
      break;
    case '2':
      rl.question('Enter credit amount: ', (amountStr) => {
        try {
          const amount = parseFloat(amountStr);
          account.credit(amount);
          console.log(`Amount credited. New balance: ${account.getBalance().toFixed(2)}`);
        } catch (error) {
          console.log(error.message);
        }
        showMenu();
      });
      break;
    case '3':
      rl.question('Enter debit amount: ', (amountStr) => {
        try {
          const amount = parseFloat(amountStr);
          account.debit(amount);
          console.log(`Amount debited. New balance: ${account.getBalance().toFixed(2)}`);
        } catch (error) {
          console.log(error.message);
        }
        showMenu();
      });
      break;
    case '4':
      console.log('Exiting the program. Goodbye!');
      rl.close();
      break;
    default:
      console.log('Invalid choice, please select 1-4.');
      showMenu();
      break;
  }
}

// Export for testing
module.exports = { Account };

// Start the application if run directly
if (require.main === module) {
  showMenu();
}