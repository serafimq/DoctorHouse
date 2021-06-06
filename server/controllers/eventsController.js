const Events = require("../models/events")


const setAllEvents = async (req, res) => {
  console.log(req.params, 'req.params');
  const {id} = req.params
  const allEvents = await Events.find()
  const filterEvent = allEvents.filter(el => el.creator == id)
  res.json(filterEvent)
}
const addEvent = async (req, res) => {
  try {
    const { event, id } = req.body;
    const { hospital,
      firstLastName,
      specialization,
      address,
      comment, } = event
    const num = String(event.dateTime.match(/\d{2}\s/gm)).slice(0, 2)
    // console.log(Number(num))
    const date = Date.parse(event.dateTime)
    // console.log(date)

    if (event) {
      const newEvent = await Events.create({
        hospital,
        firstLastName,
        specialization,
        address,
        comment,
        dateTime: date,
        num,
        creator: id
      })
      return res.json(newEvent)
    }
    return res.sendStatus(500)
  } catch (error) {
  }

  res.json()
}

const findOneEvent = async (req, res) => {
  const {id} = req.params
  const {date} = req.body
  try {
    const allEvent = await Events.find()
    const onePersonEvent = allEvent.filter(el => el.creator == id)
    console.log('onePersonEvent', onePersonEvent)
    const dataString = onePersonEvent.filter(el => el.dateTime.toISOString().slice(0, 10).replace('-', '/').replace('-', '/') == date)
    console.log('dataString', dataString);
    return res.json({arr: dataString})
  } catch (error) {
    console.log('Ошибка в загрузке конкретных записей', error);
  }
  


}

module.exports = {
  setAllEvents,
  addEvent,
  findOneEvent
}


