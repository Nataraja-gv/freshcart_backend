
const express = require('express');
const { UserProfile } = require('../controllers/ProfileControllers');
const userAuth = require('../middleware/userauth');
 
const profileRouter = express.Router();

profileRouter.get("/auth/profile/view",userAuth,UserProfile)
module.exports = profileRouter;