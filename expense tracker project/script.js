let totalExpenses = 0;
let currentEditIndex = null; 
let expenses = []; 

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;

    if (currentEditIndex !== null) {
        
        updateExpense(currentEditIndex, description, amount, category);
    } else {
       
        addExpense(description, amount, category);
    }

   
    document.getElementById('expenseForm').reset();
    currentEditIndex = null; 
});

function addExpense(description, amount, category) {
   
    const expense = { description, amount, category };
    expenses.push(expense); 

    
    const expenseList = document.getElementById('expenseList');
    const listItem = document.createElement('li');
    listItem.textContent = `${description} - $${amount.toFixed(2)} (${category}) `;

   
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        editExpense(listItem, expense);
    };

    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteExpense(listItem, amount);
    };

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    expenseList.appendChild(listItem);

    
    updateSummary(amount);
}

function editExpense(listItem, expense) {
    
    document.getElementById('description').value = expense.description;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('category').value = expense.category;

    currentEditIndex = Array.from(document.getElementById('expenseList').children).indexOf(listItem);
}

function updateExpense(index, description, amount, category) {
    
    const oldAmount = expenses[index].amount;
    expenses[index] = { description, amount, category };

   
    const expenseList = document.getElementById('expenseList');
    const listItem = expenseList.children[index];
    listItem.textContent = `${description} - $${amount.toFixed(2)} (${category}) `;

    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        editExpense(listItem, expenses[index]);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteExpense(listItem, amount);
    };

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    totalExpenses += (amount - oldAmount); 
    updateSummaryDisplay();
}

function deleteExpense(listItem, amount) {
   
    const index = Array.from(document.getElementById('expenseList').children).indexOf(listItem);
    expenses.splice(index, 1);

    
    listItem.remove();

   
    totalExpenses -= amount; 
    updateSummaryDisplay();
}

function updateSummary(amount) {
    totalExpenses += amount; 
    updateSummaryDisplay();
}

function updateSummaryDisplay() {
    document.getElementById('summary').textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
}