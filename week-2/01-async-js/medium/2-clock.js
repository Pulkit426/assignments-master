function clock() {
  
    setInterval(() => {
      let currentDate = new Date()
      let time24HourFormat = currentDate.toLocaleTimeString()
      let time12HourFormat = currentDate.toLocaleTimeString([], {hour12:true})
      console.log("Time in 24 hour Format :- ", time24HourFormat, " & Time in 12 hour Format: ", time12HourFormat);
    }, 1000);
}
  
clock();
  