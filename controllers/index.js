const express = require("express");

const router = express.Router();

const catRouter = require("./cat");
// const channelRouter = require("./channel");

module.exports = models => {
  router.use("/cats", catRouter(models));
  // router.use("/channels", channelRouter(models));

  return router;
};
