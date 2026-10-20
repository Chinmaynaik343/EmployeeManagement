
const employeeForm = document.getElementById("employeeForm");
const nameInput = document.getElementById("name");
const professionInput = document.getElementById("profession");
const ageInput = document.getElementById("age");
const message = document.getElementById("message");
const employeeList = document.getElementById("employeeList");
const employeeCount = document.getElementById("employeeCount");

let employees = [];
let nextId = 1;

employeeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const profession = professionInput.value.trim();
  const age = ageInput.value.trim();

  // Check whether all fields are filled
  if (name === "" || profession === "" || age === "") {
    message.textContent = "Error: Please Make sure All the fields are filled before adding an employee!";
    message.className = "error";
    return;
  }

  if (Number(age) <= 0 || !Number.isInteger(Number(age))) {
    message.textContent = "Error: Please enter a valid age!";
    message.className = "error";
    return;
  }

  // Create a new employee object
  const employee = {
    id: nextId++,
    name: name,
    profession: profession,
    age: Number(age)
  };

  // Add the employee object to the array
  employees.push(employee);

  // Display the updated employee list
  renderEmployees();

  // Show success message
  message.textContent = "Success: Employee Added!";
  message.className = "success";

  // Clear the form
  employeeForm.reset();
});

function renderEmployees() {
  employeeList.innerHTML = "";

  employeeCount.textContent =
    "You have " + employees.length + " Employees.";

  // Map the array and display each employee
  employees.map(function (employee) {
    const card = document.createElement("div");
    card.className = "employee-card";

    const details = document.createElement("div");
    details.className = "employee-details";

    const idText = document.createElement("p");
    idText.textContent = "ID: " + employee.id;

    const nameText = document.createElement("p");
    nameText.textContent = "Name: " + employee.name;

    const professionText = document.createElement("p");
    professionText.textContent = "Profession: " + employee.profession;

    const ageText = document.createElement("p");
    ageText.textContent = "Age: " + employee.age;

    details.append(idText, nameText, professionText, ageText);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete User";
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function () {
      // Remove only the selected employee
      employees = employees.filter(function (item) {
        return item.id !== employee.id;
      });

      renderEmployees();
    });

    card.append(details, deleteButton);
    employeeList.appendChild(card);
  });
}
