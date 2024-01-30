//selectors
//grabbing everything we have

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
todoButton.addEventListener("click", addTodo);
//we will listen to what are we clicking on
//we will execude a different function when we want to delete an item
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(event) {
	//prevent form from submitting
	event.preventDefault();
	// todo div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	//create li
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value; //so what's displayed is the input
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);

	//check mark button
	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);

	//check trash button
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);

	//append to list
	todoList.appendChild(todoDiv);

	//clear todo input value
	todoInput.value = "";
}

//e = event
function deleteCheck(e) {
	const item = e.target;

	//delete todo item
	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement; //so we grab the entire element
		//Animation
		todo.classList.add("fall");
		//added special event listener so the item will be removed as well
		todo.addEventListener("transitioned", function () {
			todo.remove();
		});
	}

	//check mark , what happens when clicked
	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}
// handles the select section which todo item we filter
function filterTodo(e) {
	const todos =
		todoList.childNodes; /*https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes*/
	//loop through the items to know which ones are which
	//the value = all/completed/uncompleted
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
		}
	});
}
