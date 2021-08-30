const Subscriber = require('../../../models/subscriber')

module.exports = async function create(name, subscribedToChannel) {
  if (name == null) return { status: 400, result: "Name is required" }
  if (typeof name != "string") return { status: 400, result: "Wrong type for name" }
  if (subscribedToChannel == null) return { status: 400, result: "Channel is required" }
  if (typeof subscribedToChannel != "string") return { status: 400, result: "Wrong type for channel name" }

  const newSubscriber = new Subscriber({
    name: name,
    subscribedToChannel: subscribedToChannel
  })

  try {
    const subscriber = await newSubscriber.save()

    return { status: 201, result: subscriber }
  }
  catch (err) {
    return { status: 500, result: err.message }
  }
}
