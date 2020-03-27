const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./users-model.js');
const { jwtSecret } = require('../config/secrets.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({
          message: `Good to see you again, ${user.username}!`,
          token
        });
      } else {
        res.status (401).json({ message: "Heyyy, those credentials aren't valid!"});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || "user"
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
