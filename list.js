const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const pcs = require('child_process')

let customerSimulators = []
const shellFile = path.join(process.cwd(), 'booted.sh')

console.log('checking your simulator devices......')

pcs.exec('xcrun instruments -s', function(err, stdout, stderr) {
  const startPos = stdout.indexOf('iPhone')
  const finishPos = stdout.lastIndexOf(' (Simulator)')
  let simulators = stdout.substring(startPos, finishPos).split('\n')
  customerSimulators = simulators.map(item => {
    const formatItem = item.replace(/\(Simulator\)/g, '')
    return {
      name: formatItem.substring(0, formatItem.indexOf(' [')),
      value: formatItem
    }
  })

  // select devices
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'iphoneType',
        message: 'Please select an iphone for simulator...',
        choices: customerSimulators.map(item => item.name),
        default: 0
      }
    ])
    .then(answers => {
      console.log('Need a little time, please wait, thank you!')
      const selectValue = customerSimulators.filter(
        item => item.name === answers.iphoneType
      )[0].value

      pcs.exec(`xcrun instruments -w '${selectValue}'`)
      pcs.execFile(shellFile, function(error, stdout, stderr) {
        // console.log(stdout)
      })
    })
})

// boot an app
// xcrun simctl launch booted 'com.xxx.myapp'

// install
// xcrun simctl install booted xxx.app

// uninstall
// xcrun simctl uninstall booted com.xxx.xxx.xxx

// xcrun --help
