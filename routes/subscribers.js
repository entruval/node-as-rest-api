const express = require('express'),
      router = express.Router(),
      Subscriber = require('../models/subscriber')


// index
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.status(200).json(subscribers)
  }
  catch (err) { res.status(500).json({ message: err.message }) }
})


// show
router.get('/:id', getSubscriber, (req, res) => {
  try {
    res.status(200).json(res.subscriber)
  }
  catch (err) { res.status(500).json({ message: err.message }) }
})


// create
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })

  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  }
  catch (err) { res.status(400).json({ message: err.message }) }
})


// update
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) res.subscriber.name = req.body.name
  if (req.body.name != null) res.subscriber.subscribedToChannel = req.body.subscribedToChannel

  try {
    const updatedSubscriber = await res.subscriber.save()
    res.status(200).json(updatedSubscriber)
  }
  catch (err) { res.status(400).json({ message: err.message }) }
})


// delete
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.status(200).json({ message: 'Subscriber deleted' })
  }
  catch (err) { res.status(500).json({ message: err.message }) }
})


// functions

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)

    if (subscriber == null) return res.status(404).json({ message: 'Cannot find subscriber' })
  }
  catch (err) { res.status(500).json({ message: err.message }) }

  res.subscriber = subscriber
  next()
}


module.exports = router