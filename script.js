const apiUrl = "http://localhost:3000/";
/* const data = { description: "clean the toilet", done: false }; */
const todoList = document.getElementById("todoList");
const addButton = document.getElementById("addButton");

//###################################################
//## Eventlisteners
addButton.addEventListener("click", function () {
  addTodo();
});

todoList.addEventListener("click", function (e) {
  const target = e.target;
  const targetId = target.parentElement.id;
  //console.log(targetId);
  if (target.matches("input")) {
    const oldValue = target.value;
    console.log(`old text: ${oldValue}`);
    target.addEventListener("blur", function () {
      const newvalue = target.value;
      if (newvalue !== oldValue) {
        console.log(`edited text: ${newvalue}`);
        putRequest(newvalue, targetId);
        displayTodoItems();
      }
    });
  } else if (target.matches("i")) {
    deleteRequest(targetId);
    displayTodoItems();
  }
});

//################################################
// ##Request functions
const postRequest = function (postData) {
  const jsObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };
  fetch(apiUrl, jsObj);
};

async function getRequest() {
  try {
    const jsObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    todoItems = await fetch(apiUrl, jsObj).then((response) => response.json());
    return todoItems;
  } catch {
    console.log("error: Could not get list of todos");
  }
}

async function deleteRequest(todoId) {
  try {
    const apiUrlDelete = apiUrl + todoId;
    console.log(apiUrlDelete);
    const jsObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(apiUrl + todoId, jsObj);
  } catch {
    console.log("Error: could not delete item.");
  }
}

async function putRequest(putData, todoId) {
  try {
    console.log("starting PUT request");
    console.log(`todo text: ${putData}`);
    console.log(`to change in todo Id: ${todoId}`);
    const jsObj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putData),
    };
    await fetch(apiUrl + todoId, jsObj);
  } catch {
    console.log("Error: Could not update Item.");
  }
}

// ##Support functions
async function displayTodoItems() {
  await getRequest();
  //console.log(todoItems);
  clearList();
  const arrayLength = todoItems.length;
  for (let i = 0; i < arrayLength; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("todoItem");
    newDiv.setAttribute("id", todoItems[i]._id);
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("Value", `${todoItems[i].description}`);
    //newInput.setAttribute("readonly", "true");
    const newi = document.createElement("i");
    newi.classList.add("fa-solid");
    newi.classList.add("fa-trash-can");
    todoList.appendChild(newDiv);
    newDiv.appendChild(newInput);
    newDiv.appendChild(newi);
  }
  /* todoItems.foreach((todo) => {
    const todoList = document.getElementById("todoList");
    const newDiv = document.createElement("div");
    newDiv.classList.add("todoItem");
    const newInput = docuemnt.createElement("input");
    newInput.innerhtml = `<input type="text" value="${todo.description}" readonly>`;
    newInput.type;
    const newi = document.createElement("i");
    newi.classList.add("fa-solid fa-trash-can");
    todoList.appendChild(newDiv);
    newDiv.appendChild(newInput);
    newDiv.appendChild(newi);
  }); */
}
displayTodoItems();

const clearList = function () {
  let domItems = todoList.children;
  const arrayLength = domItems.length;
  for (let i = 0; i < arrayLength; i++) {
    todoList.removeChild(domItems[0]);
  }
};

async function addTodo() {
  const inputTag = document.getElementById(`todoInput`);
  const data = { description: inputTag.value, done: false };
  postRequest(data);
  displayTodoItems();
  inputTag.value = "";
}
