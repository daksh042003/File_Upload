  const express = require("express");
  const router =express.Router();

  const {localFileUpload,imageUpload,imageSizeReducer,videoUpload} = require("../controllers/fileUpload");
  router.post("/localFileUpload",localFileUpload);
  router.post("/imageUpload",imageUpload);
  router.post("/imageSizeReducer",imageSizeReducer);
  router.post("/videoUpload",videoUpload);
  module.exports = router;
