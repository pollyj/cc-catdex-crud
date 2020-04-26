const express = require("express");

module.exports = models => {
  /**
   * Controller Logic
   */
  const createCat = (req, res) =>
    models.cats
      .create({
        name: req.body.name,
        age: req.body.age,
        colour: req.body.colour,
        favourite_food: req.body.favourite_food,
        favourite_activity: req.body.favourite_activity
      })
      .then(cat => res.status(201).json(cat.serialize()))
      .catch(err => {
        // if (err.message === "That username already exists") {
        //   return models.users
        //     .get({ username: req.body.username })
        //     .then((user) => res.status(200).json(user.serialize()));
        // }

        return res.status(400).send(err.message);
      });

  const getAllCats = (req, res) =>
    models.cats
      .list()
      .then(cats => cats.map(cat => cat.serialize()))
      .then(cats => res.status(200).json(cats))
      .catch(err => res.status(400).send(err.message));

  // const getOneCat = (req, res) =>
  //   models.cats
  //     .list()
  //     .then((cats) => cats.map((cat) => cat.serialize()))
  //     .then((cats) => res.status(200).json(cats))
  //     .catch((err) => res.status(400).send(err.message));

  const patchCat = (req, res) =>
    models.cats
      .update({
        name: req.body.name,
        age: req.body.age,
        colour: req.body.colour,
        favourite_food: req.body.favourite_food,
        favourite_activity: req.body.favourite_activity
      })
      .then(cat => res.status(200).json(cat))
      .catch(err => res.status(400).send(err.message));

  const deleteCat = (req, res) =>
    models.cats
      .delete({
        name: req.params.name
      })
      .then(cats => res.status(200).json(cats))
      .catch(err => res.status(400).send(err.message));

  /**
   * Routes
   */
  const router = express.Router();
  router.post("/", createCat);
  router.get("/", getAllCats);
  // router.get("/:name", getOneCat);
  router.patch("/", patchCat);
  router.delete("/:name", deleteCat);

  return router;
};
