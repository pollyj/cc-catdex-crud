const catPen = document.getElementById("cat-pen");

const getCatImage = colour => {
  colour = colour.toLowerCase();

  const grey = "../img/01small.png";
  const black = "../img/02small.png";
  const tawnywblackface = "../img/03small.png";
  const tabby = "../img/04small.png";
  const calicoblack = "../img/05small.png";
  const greystriped = "../img/06small.png";
  const blackandwhite = "../img/07small.png";
  const greyandwhite = "../img/08small.png";
  const calicobrown = "../img/09small.png";

  switch (colour) {
    case "grey":
      return grey;
    case "black":
      return black;
    case "cream and black":
      return tawnywblackface;
    case "tabby":
      return tabby;
    case "calico (black)":
      return calicoblack;
    case "grey-striped":
      return greystriped;
    case "black and white":
      return blackandwhite;
    case "grey and white":
      return greyandwhite;
    case "calico (brown)":
      return calicobrown;
  }
};

const fetchGetAllCats = () => {
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
      //clear div so that same cat doesn't appear multiple times
      catPen.innerHTML = "";

      text = text.map(cat => {
        let image = document.createElement("img");
        image.src = getCatImage(cat.colour);
        image.alt = `${getCatImage(cat.colour)} cat`;
        image.id = `${cat.name}`;
        image.addEventListener("click", () => {
          let string = fetchOneCat(cat.name);
          console.log("cat.name:", cat.name);
          console.log("string:", string);
        });
        catPen.appendChild(image);
        return `${cat.name} ${cat.age}`;
      });
      //   .join("<br/>");
      // document.getElementById("show-cats").innerHTML = text;
    });
};

fetchGetAllCats();
const getAllCatsBtn = document.getElementById("get-all-cats");
window.addEventListener("load", fetchGetAllCats);
getAllCatsBtn.addEventListener("click", fetchGetAllCats);

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
      const form = document.getElementById("create-form");
      form.reset();
      fetchGetAllCats();
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
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(text) {
      text = `Done!`;
      document.getElementById("deleted-cat").innerHTML = text;
      const form = document.getElementById("delete-form");
      form.reset();
      fetchGetAllCats();
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
      const form = document.getElementById("edit-form");
      form.reset();
      fetchGetAllCats();
      fetchOneCat(text.name);
    });
});

const fetchOneCat = name => {
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
      console.log("text:", text);
      text = text.map(cat => {
        if (cat.name === name) {
          let string = `<span class="question">Name:</span><br>
          <span class="answer">${cat.name}</span><br>
          <span class="question">Age:</span><br>
          <span class="answer">${cat.age}</span><br>
          <span class="question">Colour:</span><br>
          <span class="answer">${cat.colour}</span><br>
          <span class="question">Favourite Food:</span><br>
          <span class="answer">${cat.favourite_food}</span><br>
          <span class="question">Favourite Activity:</span><br>
          <span class="answer">${cat.favourite_activity}</span><br><br>
          <span class="question">${cat.name} says:</span><br>
          <span class="answer">"Meow! Meooow!"</span>`;
          console.log("string:", string);
          const catDeetz = document.getElementById("cat-deetz");
          catDeetz.innerHTML = "";
          catDeetz.innerHTML = string;
        }
      });
    });
};

//{"name": "test", "age": 5, "colour": "white", "favourite_food": "tuna", "favourite_activity": "warbling"}
