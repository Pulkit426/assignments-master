const fs = require('fs')

fs.writeFile("hello.txt", "This is  a line written by JSCODE", (err) => {
    console.log("File write operation successful")
})
