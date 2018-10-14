var todoList = {
  //The todo's should be stored in an array on an object
  todos: [],
  //The object should have an addTodo method object
  addTodo: function(todoText) { //addTodo("Water plants")
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
  },
  //The object should have a changeTodo method that changes the todoText property
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  //The object should have a deleteTodo method
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  //The object needs a toggleCompleted method to change .completed property
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  //The object needs a toggleAll method
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0; //If 3 to do's are completed, var = 3

    //Count number of completed to do's for the forEach loop
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    //Loop through the todo's array to check which to do's are already completed
    this.todos.forEach(function(todo) {
      //Case 1: If everything is true make it false
      if (completedTodos === totalTodos) { //If number of completed todo's equals the total todo's
        todo.completed = false;
      //Case 2: If some are true, make everything true
      } else {
          todo.completed = true;
      }
    });
  }
};

//Handlers object handles events (e.g. button onclick)
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.querySelector('#addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = ''; //Clear the input field
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.querySelector('#changeTodoPositionInput');
    var changeTodoTextInput = document.querySelector('#changeTodoTextInput');
    //Convert the position string to number with `valueAsNumber`
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value); 
    changeTodoPositionInput.value = ''; //Clear the position
    changeTodoTextInput.value = ''; //Clear the input field
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.querySelector('#toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

//View object displays information in the UI (displayTodos)
var view = {
  //It should display all to do's in separate li's and tell me if they are .completed
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach(function(todo, position) { //When todo's array is empty -> nothing, when 5 items it does it 5 times
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';
      
      if (todo.completed === true) {
        todoTextWithCompletion = '[X]  ' + todo.todoText;
      } else {
        todoTextWithCompletion = '[ ]  ' + todo.todoText;
      }
      
      todoLi.id = position; //Each todo item needs a unique id (to be able to delete or change it)
      todoLi.textContent = todoTextWithCompletion; //TextContent is more specific than innerHTML
      todoLi.appendChild(this.createDeleteButton()); //Create a delete button after every li
      todosUl.appendChild(todoLi);
    }, this); //Adding this as an argument to the forEach callback argument will make `this` in the forEach loop refer to the `view` object, and not the forEach
    //A callback function (forEach) is NOT a method, so this will not refer to the object but to the callback function
  },
  //Each li should have a delete button
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton'; //Makes it easier to select the button in setUpEventListeners method
    return deleteButton;
  },
  //Event delegaton method for eventListeners (GOOD PRACTICE!!!)
  setUpEventListeners: function() {
    //Add an eventlistener on complete ul object, not just per li (to avoid memory problems)
    //Use the .target parameter to tell you which exact element you clicked on
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      //Get the element that was clicked on
      var elementClicked = event.target; //e.g. 'button'
      //Check if element clicked is a deletebutton    
      if (elementClicked.className === 'deleteButton') {
        //Run handlers.deleteTodo(position)
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id)); //parseInt turns id string into number
      }       
    });
  }
};

view.setUpEventListeners();

//todomvc.com