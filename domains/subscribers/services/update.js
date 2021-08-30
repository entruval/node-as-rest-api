const Subscriber = require('../../../models/subscriber')

module.exports = async function update(subscriberId, name, subscribedToChannel) {
  if (subscriberId == null) return { status: 400, result: "Subscriber id is required" }
  if (typeof subscriberId != "string") return { status: 400, result: "Wrong type for subscriber id" }
  if (name && typeof name != "string") return { status: 400, result: "Wrong type for name" }
  if (subscribedToChannel && typeof subscribedToChannel != "string") return { status: 400, result: "Wrong type for channel name" }

  const subscriber = await Subscriber.findById(subscriberId)

  if (name != null) subscriber.name = name
  if (subscribedToChannel != null) subscriber.subscribedToChannel = subscribedToChannel

  try {
    let response = await subscriber.save()
    return {status: 200, result: response}
  }
  catch (err) {return {status: 500, result: err.message}}
}
