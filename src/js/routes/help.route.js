const { Router } = require("express");
const HelpController = require("../controllers/help.controller");
const HelpDao = require("../daos/help.dao");
const router = Router();

const helpDao = new HelpDao();
const helpController = new HelpController(helpDao);

router
  .route("/")
  .get(helpController.Get.bind(helpController))
  .post(helpController.Post.bind(helpController))
  .delete(helpController.Delete.bind(helpController))
  .put(helpController.Put.bind(helpController));

router.route("/all").get(helpController.GetAll.bind(helpController));

module.exports = router;
