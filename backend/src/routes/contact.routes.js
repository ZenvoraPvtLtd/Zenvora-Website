const express = require("express");
const { body } = require("express-validator");

const {
  submitContact,
  getAllContacts,
  updateContactStatus,
} = require("../controllers/contact.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const router = express.Router();

// Submit Contact
router.post(
  "/",
  [
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("email").isEmail(),
    body("message").notEmpty(),
  ],
  validate,
  submitContact,
);

// Admin Routes
router.get("/", protect, adminOnly, getAllContacts);

router.patch(
  "/:id/status",
  protect,
  adminOnly,
  [body("status").isIn(["new", "reviewed", "closed"])],
  validate,
  updateContactStatus,
);

module.exports = router;
