import { appendFile } from 'fs'

function log(message) {
    const date = (new Date()).toISOString()
    appendFile('./log', `${date}|${message}\n`, () => {})
}

export default log