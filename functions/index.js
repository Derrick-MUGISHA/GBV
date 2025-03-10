const functions = require("firebase-functions");
// const logger = require("firebase-functions/logger");

exports.createChatEngineUser = functions.auth.user().onCreate((user) => {
  console.log("create", user);
});

exports.deleteChatEngineUser = functions.auth.user().onDelete((user) => {
  console.log("delete", user);
});
