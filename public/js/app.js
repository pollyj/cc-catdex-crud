const getAllCatsBtn = document.getElementById("get-all-cats");
getAllCatsBtn.addEventListener("click", function() {
  fetch("/api/cats", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(text) {
      text = text
        .map(cat => {
          return `${cat.name} ${cat.age}`;
        })
        .join("<br/>");
      document.getElementById("getResponse").innerHTML = text;
    });
});

const createCatBtn = document.getElementById("create-new-cat");
createCatBtn.addEventListener("click", () => {
  const data = document.getElementById("add-cat-data").value;
  fetch("/api/cats/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: data
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(text) {
      text = `${text.name} ${text.age}`;
      document.getElementById("newly-created-cat").innerHTML = text;
    });
});
//example query: {"name": "test", "age": 5, "colour": "white", "favourite_food": "tuna", "favourite_activity": "warbling"}

const deleteCatBtn = document.getElementById("delete-cat");
deleteCatBtn.addEventListener("click", () => {
  const data = document.getElementById("delete-cat-data").value;
  const temp = data;
  console.log("data:", data);
  fetch(`/api/cats/${data}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: data
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(text) {
      text = `${temp.name} was deleted! ):`;
      document.getElementById("deleted-cat").innerHTML = text;
    });
});
//example query: {"name": "test1"}

const editCatBtn = document.getElementById("edit-cat");
editCatBtn.addEventListener("click", () => {
  const data = document.getElementById("edit-cat-data").value;
  fetch(`/api/cats/`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: data
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(text) {
      text = `${text.name} ${text.age} ${text.colour}`;
      document.getElementById("edited-cat").innerHTML = text;
    });
});

//{"name": "test", "age": 5, "colour": "white", "favourite_food": "tuna", "favourite_activity": "warbling"}
