const fs = require('fs')

var rule=/\s{1,}/g;

fs.readFile('1-file-cleaner.md', 'utf-8', (err,data) => {
    let filteredData = data.split(rule).join(" ")
console.log(filteredData)
})

