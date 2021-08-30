const Subscriber = require('../../../models/subscriber')

module.exports = async function getOne(id) {
  if (id == null) return { status: 400, result: "Subscriber id is required" }
  if (typeof id != "string") return { status: 400, result: "Wrong type for subscriber id" }

  try {
    const subscriber = await Subscriber.findById(id)

    if (subscriber == null) return { status: 404, result: 'Cannot find subscriber' }
    return { status: 200, result: subscriber }
  }
  catch (err) { return {status: 500, result: err.message} }
}
