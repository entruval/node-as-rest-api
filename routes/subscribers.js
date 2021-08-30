const express = require('express'),
      Redis = require('redis')

const router = express.Router(),
      redis = Redis.createClient()


// index
router.get('/', async (req, res) => {
  const getAll = require("../domains/subscribers/queries/getAll.js")
  redis.get("subscribers", async (err, result) => {
    if (err) console.error(err)
    if (result) { res.status(200).json(JSON.parse(result)) }
    else {
      try {
        const {status, result} = await getAll()
        redis.setex("subscribers", 900, JSON.stringify(result))
        res.status(status).json(result)
      }
      catch (err) { res.status(500).json({ message: err.message }) }
    }
  })
})


// show
router.get('/:id', async (req, res) => {
  const getOne = require("../domains/subscribers/queries/getOne.js")
  const {status, result} = await getOne(req.params.id)

  res.status(status).json(result)
})


// create
router.post('/', async (req, res) => {
  const create = require("../domains/subscribers/services/create.js"),
        {status, result} = await create(req.body.name, req.body.subscribedToChannel)
  if (status == 201) redis.del("subscribers")
  res.status(status).json(result)
})


// update
router.patch('/:id', async (req, res) => {
  const update = require("../domains/subscribers/services/update.js"),
        {status, result} = await update(req.params.id, req.body.name, req.body.subscribedToChannel)

  if (status == 200) redis.del("subscribers")
  res.status(status).json(result)
})


// destroy
router.delete('/:id', async (req, res) => {
  const destroy = require("../domains/subscribers/services/destroy.js"),
        {status, result} = await destroy(req.params.id)
  
  if (status == 200) redis.del("subscribers")
  res.status(status).json(result)
})


module.exports = router