// Default login credentials
let correctUsername = "Prince";
let correctPin = "2004";

// Initial Balance
let balance = 0.0;

// Function to Login
function login() {
    let username = document.getElementById("username").value;
    let enteredPin = document.getElementById("loginPin").value;

    if (username === correctUsername && enteredPin === correctPin) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Username or PIN! Try again.");
    }

    document.getElementById("loginPin").value = "";
}

// Check if user is logged in before showing dashboard
if (window.location.pathname.includes("dashboard.html")) {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        window.location.href = "login.html";
    }
}

// Function to Logout
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}

// Function to Deposit Money
function depositMoney() {
    let amount = parseFloat(document.getElementById("depositAmount").value);

    if (amount > 0) {
        balance += amount;
        updateBalance();
        addTransaction("Deposit", amount, "Self");
        alert(`Deposited K${amount} successfully`);
    } else {
        alert("Enter a valid deposit amount!");
    }

    document.getElementById("depositAmount").value = "";
}

// Function to Send Money
function sendMoney() {
    let amount = parseFloat(document.getElementById("sendAmount").value);
    let recipient = document.getElementById("recipient").value;
    let enteredPin = document.getElementById("sendPin").value;

    if (amount > 0 && recipient.length >= 10) {
        if (enteredPin === correctPin) {
            if (amount <= balance) {
                balance -= amount;
                updateBalance();
                addTransaction("Sent", amount, recipient);
                alert(`K${amount} sent to ${recipient}`);
            } else {
                alert("Insufficient Balance!");
            }
        } else {
            alert("Incorrect PIN! Transaction failed.");
        }
    } else {
        alert("Enter a valid amount and recipient number!");
    }
}

// Function to Change PIN
function changePin() {
    let oldPin = document.getElementById("oldPin").value;
    let newPin = document.getElementById("newPin").value;

    if (oldPin === correctPin) {
        correctPin = newPin;
        alert("PIN changed successfully!");
    } else {
        alert("Incorrect Old PIN!");
    }
}

// Function to Update Balance
function updateBalance() {
    document.getElementById("balance").innerText = `K${balance}`;
}

// Function to Add Transaction to Table
function addTransaction(type, amount, recipient) {
    let table = document.getElementById("transactionTable");
    let row = table.insertRow();
    row.insertCell(0).innerText = type;
    row.insertCell(1).innerText = `K${amount}`;
    row.insertCell(2).innerText = recipient;
}
