const process = require('child_process')
const path = require('path')

console.log('Installing app')
console.log('please wait~')

process.exec(`xcrun simctl uninstall booted com.xxx.xxx.xxx`, function(err) {
  console.log('Uninstalling...')
  if (!err) {
    process.exec(
      `xcrun simctl install booted ${path.resolve(__dirname, 'bin')}/xxx.app`,
      function(err) {
        if (err) {
          console.log(`error: ${err}`)
          return
        }
        console.log('Installation')
        process.exec(`xcrun simctl launch booted 'com.xxx.xxx.xxx'`)
      }
    )
  }
})
