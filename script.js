const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const transaction = document.getElementById('transaction');
const amount = document.getElementById('amount');

const mockTransactions = [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 }
]

let transactions = mockTransactions;

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (transaction.value === '' || amount.value === '') {
        alert('Please enter a transaction and the amount');
    } else {
        const newTransaction = {
            id: generateID(),
            text: transaction.value,
            amount: +amount.value
        }

        transactions.push(newTransaction);
        addTransactionToUI(newTransaction);
        updateValues();
        transaction.value = '';
        amount.value = '';
    }
}

// Generate random ID for transaction
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transaction to strong list
function addTransactionToUI(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus': 'plus');

    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class='delete-btn' onclick='removeTransaction(${transaction.id})'>X</button>`;
    list.appendChild(item);
}

// Updates the balance, income and expense
function updateValues() {
    const amounts = transactions.map(trans => 
    trans.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(trans => trans.id !== id);
    init();
}

// On init
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionToUI);
    updateValues();
}

init();

// Event listeners
form.addEventListener('submit', addTransaction);
