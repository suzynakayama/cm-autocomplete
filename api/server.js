const express = require('express');
const axios = require('axios');
const cors = require('cors');

async function start() {
  const app = express();

  // same as calling this results, and then getting just the data from the results and then calling the results of the data and calling that users
  const {data: {results: users}} = await axios('https://randomuser.me/api/?results=1000');
  
  const router = express.Router()

  router.get('/search', (req, res, next) => {
    // or const q = req.query.q ==> Especially if you have multiple parameters: const {q, location} = req.query
    let { q } = req.query
    if (!q) return next(new Error('No query found!'))

    let searched = users.filter(user => {
      // we will return a boolean and that will 'decide' if we will have anything inside the array
      const name = `${user.name.first} ${user.name.last}`.toLowerCase()
      //it will return true or false in case the name includes the query
      return name.includes(q.toLowerCase());
    });
    searched = searched.slice(0, 9);
    res.json(searched);
  })

  app.use(cors());
  app.use(router);

  app.listen(3000);
  console.log('listening!');
}

start();