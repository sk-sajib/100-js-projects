
// callback example ()

// const takeOrder = (tableNumber, callBack) => {
//     console.log("Take order for cus1" + tableNumber);
//     callBack(tableNumber)
// }

// const processOrder = (tableNumber, callBack) => {

//     console.log("processing order for cus1" + tableNumber);

//     setTimeout( () => {
//         console.log("cooking complete");
//         console.log("order process for cus1" + tableNumber);
//         callBack(tableNumber);
//     }, 3000)

// }


// const completeOrder = (tableNumber) => {
//     console.log("finally completed order" +  tableNumber);
// }



// takeOrder("table No 1", (tableNumber) => {
//     processOrder(tableNumber, () => {
//         completeOrder("tableNumber shjsg")
//     })
// })

// console.log("hello")


const hasMeting = true;

const meting = new Promise( ( resolve, reject) => {
    if(!hasMeting) {
        const metingDetails = {
            meetingTopic : "Js meetup",
            metingTime: "9 pm"
        } 
        
       resolve(metingDetails) 
    } else {
        reject(new Error("meting already sheduled"));
    }
});


const addToCalender = (metingDetails) => {
    const calender = `metthing will be topic ${metingDetails.meetingTopic} at ${metingDetails.metingTime}`

    return Promise.resolve(calender);
}


// meting.then(addToCalender)
// .then(res => console.log(res))
// .catch(err => {
//     console.log(err.message)
// })


async function metingTime() {

   try{
    const metingInfo = await  meting
    const mettingTime = await addToCalender(metingInfo)
    console.log(mettingTime)
   } catch(err) {
    console.log(err.message)
   }
}

metingTime()