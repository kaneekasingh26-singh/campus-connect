let transactions = [];

const form = document.getElementById("expenseForm");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const category = document.getElementById("category");
const date = document.getElementById("date");

const transactionList = document.getElementById("transactionList");

const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");

date.valueAsDate = new Date();


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const transaction = {
        id: Date.now(),
        description: description.value,
        amount: Number(amount.value),
        type: type.value,
        category: category.value,
        date: date.value
    };

    transactions.push(transaction);

    displayTransactions();
    updateSummary();

    form.reset();

    date.valueAsDate = new Date();
});


function displayTransactions() {

    transactionList.innerHTML = "";

    if (transactions.length === 0) {

        transactionList.innerHTML =
            '<p class="empty">No transactions yet.</p>';

        return;
    }

    transactions.slice().reverse().forEach(function(transaction) {

        const div = document.createElement("div");

        div.className = "transaction";

        const sign =
            transaction.type === "income" ? "+" : "-";

        div.innerHTML = `
            <div class="transaction-info">
                <h3>${transaction.description}</h3>
                <p>
                    ${transaction.category} • ${transaction.date}
                </p>
            </div>

            <div class="transaction-right">

                <span class="amount ${transaction.type}">
                    ${sign} ₹${transaction.amount.toFixed(2)}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>

            </div>
        `;

        transactionList.appendChild(div);
    });
}


function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {

        return transaction.id !== id;

    });

    displayTransactions();
    updateSummary();
}


function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }

    });

    const balance = income - expense;

    incomeDisplay.textContent =
        `₹${income.toFixed(2)}`;

    expenseDisplay.textContent =
        `₹${expense.toFixed(2)}`;

    balanceDisplay.textContent =
        `₹${balance.toFixed(2)}`;
}


displayTransactions();
updateSummary();