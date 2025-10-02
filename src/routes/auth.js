const express = require('express');
const router = express.Router();
const passport = require('../passport');
const authController = require('../controllers/authController');

// registro local
router.post('/register', authController.register);

// login local -> usamos passport.authenticate('local',{session:false})
router.post('/login', passport.authenticate('local', { session: false }), authController.login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/' }), authController.oauthCallback);

module.exports = router;
