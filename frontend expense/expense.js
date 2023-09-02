const baseUrl = 'http://localhost:3000/expense';


function Storedata(event) {
  event.preventDefault();
  console.log('Submit button clicked');
  let submitDescrip = document.getElementById('descrip').value;
  let select = document.getElementById('select').value;
  let expense = document.getElementById('expense').value;
  console.log('Form values:', submitDescrip, select, expense);

  let obj = {
    descrip: submitDescrip,
    mselect: select,
    expense: expense
  };

  // Display the new expense on the screen
  showExpenseOnScreen(obj);

  axios
    .post(`${baseUrl}/add-expense`, obj)
    .then((response) => {
      console.log('POST request successful:', response.data);
      // if we want to clear the input
      document.getElementById('descrip').value = '';
      document.getElementById('select').value = '';
      document.getElementById('expense').value = '';
      })
    .catch((err) => {
      console.log('POST request error:', err);
    });
}
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${baseUrl}/all-expenses`)
    .then((res) => {
      console.log(res);
      for (const expense of res.data) {
        showExpenseOnScreen(expense);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function showExpenseOnScreen(obj) {

  const expensesList = document.getElementById("my-form");
  const listItem = document.createElement("li");
    listItem.textContent = `${obj.descrip}-${obj.expense}-${obj.mselect}`;

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  deleteButton.onclick = () => {
    axios
      .delete(
        `${baseUrl}/delete-expense/${obj.id}`
      )
      .then(() => {
        console.log('expense deleted successfully'); 
        expensesList.removeChild(listItem);
      })
      .catch((err) => console.log(err));
  };
  
  const EditButton = document.createElement("input");
  EditButton.type = "button";
  EditButton.value = "Edit";
  EditButton.onclick = () => {

    document.getElementById("descrip").value = obj.descrip;
    document.getElementById("select").value = obj.mselect;
    document.getElementById("expense").value = obj.expense;
    axios
    .delete(
      `${baseUrl}/delete-user/${obj.id}`
    )
    .then((res) => {
      console.log('User edited successfully'); 
      parentElement.removeChild(childElement);
    })
    .catch((err) => console.log(err));
  };

  listItem.appendChild(deleteButton);
  listItem.appendChild(EditButton);
  expensesList.appendChild(listItem);
}
