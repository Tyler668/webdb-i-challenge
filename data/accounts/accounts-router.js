const express = require('express');

// database access using knex
const db = require('../dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
  // get the list of posts from the db
  // select * from posts
  db.select('*')
    .from('accounts') // all knex commands return a promise
    .then(accounts => {
      // send the list of posts to the client
      res.status(200).json(accounts);
    })
    .catch(error => {
      // remember to handle the error
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  // select * from posts where id = req.params.id
  db.select('*')
    .from('accounts')
    .where('id', '=', req.params.id)
    .first()
    .then(account => {
      // send the post to the client
      res.status(200).json(account);
    })
    .catch(error => {
      // remember to handle the error
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  const accountData = req.body;
  // validate the data before saving it to the database. NEVER TRUST THE CLIENT!!

  // insert into posts () values ()
  // db.insert(postData, 'id').into('posts')
  db('accounts')
    .insert(accountData, 'id')
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(error => {
      // remember to handle the error
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      // remember to handle the error
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      // remember to handle the error
      res.status(500).json(error);
    });
});

module.exports = router;
