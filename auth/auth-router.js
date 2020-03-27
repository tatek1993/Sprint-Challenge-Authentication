const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Jokes = require('../jokes/')

router.post('/register', (req, res) => {
  let user = req.body;
  
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
