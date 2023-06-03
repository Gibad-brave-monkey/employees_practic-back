const express = require("express");
const { auth } = require("../middleware/auth");
const {
  all,
  add,
  employee,
  remove,
  edit,
} = require("../controllers/employees.controller");

const router = express.Router();

router.get("/", auth, all);
router.get("/:id", auth, employee);
router.post("/", auth, add);
router.delete("/", auth, remove);
router.put("/:id", edit);

module.exports = router;
