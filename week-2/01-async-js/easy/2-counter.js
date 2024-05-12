let count= 1
const stopCount = 10

function counter(){
    console.log(count++)

    if(count<=stopCount){
        setTimeout(counter, 1000)
    }
    else{
        console.log("Counter Stopped")
    }

}

counter()
