const express = require("express");

const router = express.Router();

const catRouter = require("./cat");

module.exports = models => {
  router.use("/cats", catRouter(models));

  return router;
};
