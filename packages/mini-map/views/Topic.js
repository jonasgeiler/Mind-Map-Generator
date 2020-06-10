import Event from '../lib/events'
import { TOPIC } from '../constant'

const on = (type, cb) => Event.on(type, TOPIC, cb)
const off = (type, cb) => Event.off(type, TOPIC, cb)

on('click', (e) => {
  console.log('click topic', e)
})
