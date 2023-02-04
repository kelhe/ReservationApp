function getToday(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function getDateFormat(date){
    const arr = date.split("-")
    const year = arr[0]
    const month = arr[1] - 1
    const day = arr[2]
    const formattedForGetDay = new Date(year,month,day)
    return formattedForGetDay
}

function checkIfPast(date){
    const reservationDate = getDateFormat(date).getTime()
    const currentDate = new Date().getTime()
    const check = currentDate - reservationDate
    return check > 0 ? true : false 
 }
 
module.exports = {
    getToday,getDateFormat,checkIfPast
}