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
        });
        catPen.appendChild(image);
        return `${cat.name} ${cat.age}`;
      });
    });
};

fetchGetAllCats();
const getAllCatsBtn = document.getElementById("get-all-cats");
window.addEventListener("load", fetchGetAllCats);
getAllCatsBtn.addEventListener("click", fetchGetAllCats);

const createCatBtn = document.getElementById("create-new-cat");
createCatBtn.addEventListener("click", () => {
  const name = document.getElementById("create-name").value;
  const age = document.getElementById("create-age").value;
  const colour = document.getElementById("create-colour").value;
  const favourite_food = document.getElementById("create-food").value;
  const favourite_activity = document.getElementById("create-act").value;
  const jsonData = {
    name: name,
    age: age,
    colour: colour,
    favourite_food: favourite_food,
    favourite_activity: favourite_activity
  };

  fetch("/api/cats/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonData)
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

const deleteCatBtn = document.getElementById("delete-cat");
deleteCatBtn.addEventListener("click", () => {
  const name = document.getElementById("delete-name").value;
  const object = {
    name: name
  };
  const jsonData = JSON.stringify(object);
  fetch(`/api/cats/${jsonData}/`, {
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
      const form = document.getElementById("delete-form");
      form.reset();
      fetchGetAllCats();
    });
});

const editCatBtn = document.getElementById("edit-cat");
editCatBtn.addEventListener("click", () => {
  const name = document.getElementById("edit-name").value;
  const age = document.getElementById("edit-age").value;
  const colour = document.getElementById("edit-colour").value;
  const favourite_food = document.getElementById("edit-food").value;
  const favourite_activity = document.getElementById("edit-act").value;
  const object = {
    name: name,
    age: age,
    colour: colour,
    favourite_food: favourite_food,
    favourite_activity: favourite_activity
  };
  const jsonData = JSON.stringify(object);
  fetch(`/api/cats/`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: jsonData
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
          const catDeetz = document.getElementById("cat-deetz");
          catDeetz.innerHTML = "";
          catDeetz.innerHTML = string;
        }
      });
    });
};