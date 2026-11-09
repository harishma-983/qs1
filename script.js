
// Get existing expenses from LocalStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let editIndex = -1;


// Display Expenses
function displayExpenses() {

    let output = "";

    let selectedCategory = document.getElementById("filterCategory").value;

    let filteredExpenses = expenses.filter((expense) => {
        return selectedCategory === "All" || expense.category === selectedCategory;
    });

    filteredExpenses.forEach((expense) => {

        let index = expenses.indexOf(expense);

        output += `
            <tr>
                <td>${expense.name}</td>
                <td>₹${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="btn btn-warning btn-sm"
                    onclick="editExpense(${index})">Edit</button>

                    <button class="btn btn-danger btn-sm"
                    onclick="deleteExpense(${index})">Delete</button>
                </td>
            </tr>
        `;

    });

    document.getElementById("expenseTable").innerHTML = output;

    calculateTotal();
}


// Add and Edit Expense
document.getElementById("expenseForm").addEventListener("submit", function(e) {

    e.preventDefault();

    let name = document.getElementById("expenseName").value;
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;

    if (name.trim() === "" || amount <= 0 || category === "" || date === "") {
        alert("Please fill all fields correctly");
        return;
    }

    let expense = {
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    if (editIndex === -1) {

        expenses.push(expense);

    } else {

        expenses[editIndex] = expense;
        editIndex = -1;

        document.querySelector("#expenseForm button[type='submit']").innerText = "Add Expense";
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expenseForm").reset();

    displayExpenses();

});


// Edit Expense
function editExpense(index) {

    let expense = expenses[index];

    document.getElementById("expenseName").value = expense.name;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("category").value = expense.category;
    document.getElementById("date").value = expense.date;

    editIndex = index;

    document.querySelector("#expenseForm button[type='submit']").innerText = "Update Expense";

}


// Delete Expense
function deleteExpense(index) {

    if (confirm("Are you sure you want to delete?")) {

        expenses.splice(index, 1);

        localStorage.setItem("expenses", JSON.stringify(expenses));

        displayExpenses();

    }

}


// Calculate Total
function calculateTotal() {

    let total = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    document.getElementById("total").innerText = total;

}


// Filter by Category
document.getElementById("filterCategory").addEventListener("change", function() {

    displayExpenses();

});


// Initial Display
displayExpenses();
