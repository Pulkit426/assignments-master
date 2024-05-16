/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    let startTime = Date.now()
    let promise1 = new Promise((resolve,reject) => {resolve()})

    for (let i=0; ;i++){
        if(Date.now() - startTime > milliseconds)
        break
    }
   
    return promise1
}

module.exports = sleep;
