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

// custom function to render pages instead of Express method "render"
// this will allow us to use .ejs files with Webpack hot reload in Dev mode
async function renderEJS(res, filename, data) {
  const ext = '.ejs'
  // remove extension .ejs from full fail name, and get all path to it(with nested folders)
  filename = filename.indexOf(ext) > -1 ? filename.split(ext)[0] : filename
  try {
    if (isDev) {
      // template for current filename
      const template = await getTemplateString(`${filename}.ejs`)
      // render file with Express render method
      let html = ejs.render(template, data)
      // send rendered .ejs file like .html 
      res.send(html)
    } else {
      // use Express render method to render file from views directory in Production mode
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
