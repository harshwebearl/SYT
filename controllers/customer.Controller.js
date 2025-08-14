const express = require("express");
const router = express.Router();
const UserController = require("../controllers/customer.Controller");
const userController = new UserController();
const { uploadFile } = require("../middleware/genericMulter.js");
const isAuthAllowed = require("../middleware/isAuthAllowed");
const adminUserAuth = require("../middleware/admin-user-auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/users");
  },
  filename: function (req, file, cb) {
    cb(null, (Date.now() + file.originalname).replace(/\s+/g, ""));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(null, true);
  }
});

// User registration
router.post("/", (req, res) => userController.register(req, res));

// Check mobile number
router.post("/checkmobilenumber", (req, res) => userController.checkmobile_number(req, res));

// Display user data
router.get("/", (req, res) => userController.getUsers(req, res));

// Display all users by admin
router.get("/alluserlist", (req, res) => userController.display_all_user_list_by_admin(req, res));

// Display user details by admin
router.get("/userdetail", (req, res) => userController.display_all_user_detail_by_admin(req, res));

// Password management
router.put("/chengepassword", (req, res) => userController.forgotPassword(req, res));
router.put("/updatepassword", (req, res) => userController.updatePassword(req, res));

// Delete user
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

// Get user profile
router.get("/userprofile", adminUserAuth, (req, res) => userController.userInfo(req, res));

// User history
router.get("/history", (req, res) => userController.usershistory(req, res));

// OTP routes
router.post("/send-otp", (req, res) => userController.send_otp(req, res));
router.post("/verify-otp", (req, res) => userController.verify_otp(req, res));

// Update profile with image upload
router.put(
  "/changeprofile",
  upload.single("photo"),
  (req, res) => userController.updateProfile(req, res)
);

module.exports = router;
