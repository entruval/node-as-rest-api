const Subscriber = require('../../../models/subscriber')

module.exports = async function destroy(subscriberId) {
  if (subscriberId == null) return { status: 400, result: "Subscriber id is required" }
  if (typeof subscriberId != "string") return { status: 400, result: "Wrong type for subscriber id" }

  const subscriber = await Subscriber.findById(subscriberId)

  if (subscriber == null) return {status: 400, result: "Subscriber not found"}

  try {
    let response = await subscriber.remove()
    return {status: 200, result: "Deleted"}
  }
  catch (err) {return {status: 500, result: err.message}}
}
