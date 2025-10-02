const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Usuario } = require('../models');
require('dotenv').config();

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) return done(null, false, { message: 'Usuario no encontrado' });
    const valid = await user.validatePassword(password);
    if (!valid) return done(null, false, { message: 'Credenciales incorrectas' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Buscar por oauth_id o email
    const oauthId = profile.id;
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    let user = await Usuario.findOne({ where: { oauth_provider: 'google', oauth_id: oauthId } });
    if (!user && email) {
      user = await Usuario.findOne({ where: { email } });
    }
    if (!user) {
      user = await Usuario.create({
        email,
        nombre: profile.displayName,
        oauth_provider: 'google',
        oauth_id: oauthId,
        is_verified: true,
      });
    } else {
      // actualizar provider/id cuando aplique
      if (!user.oauth_id) {
        user.oauth_provider = 'google';
        user.oauth_id = oauthId;
        await user.save();
      }
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// No usamos sesiones en JWT flow, pero passport requiere serialize/deserialize
passport.serializeUser((user, done) => done(null, user.id_usuario));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
