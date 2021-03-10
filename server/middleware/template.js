const axios = require('axios')
const ejs = require('ejs')
const isDev = process.env.NODE_ENV === 'development'

function getTemplateString(filename) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:8000/public/views/${filename}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

async function renderEJS(res, filename, data) {
  const ext = '.ejs'
  filename = filename.indexOf(ext) > -1 ? filename.split(ext)[0] : filename
  try {
    if (isDev) {
      const template = await getTemplateString(`${filename}.ejs`)
      let html = ejs.render(template, data)
      res.send(html)
    } else {
      res.render(filename, data)
    }
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = {
  getTemplateString,
  renderEJS
}
