const fs = require("fs");
fs.readFile("hello.txt", "utf-8", (err, data) => {
  console.log(data);
});

for (let i = 0; i < 10000; i++) {
    console.log(i)
}