const Subscriber = require('../../../models/subscriber')

module.exports = async function getAll() {
  const subscribers = await Subscriber.find()

  if (subscribers == null) return { status: 200, result: [] }
  return { status: 200, result: subscribers }
}
