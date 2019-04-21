const inquirer = require('inquirer')
const pcs = require('child_process')

inquirer
  .prompt([
    {
      type: 'input',
      name: 'weburl',
      message: 'Please input web url you want to visit...'
    }
  ])
  .then(answers => {
    console.log(answers.weburl)
    const url = encodeURIComponent(answers.weburl)
    pcs.exec(`xcrun simctl openurl booted 'xxx://xxx/h5/url=${url}'`)
  })
