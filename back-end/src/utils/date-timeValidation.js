//Get todays date in YYYY-MM-DD format 
function getToday() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

//get the date in new Date format to be used to check if the date is in future or pass
//This will focus on date only and leave time check to different middleware and correct error messages will occur when entering a time on same day but after business hours
function getDateFormat(date) {
  const arr = date.split("-");
  const year = arr[0];
  const month = arr[1] - 1;
  const day = arr[2];
  const formattedForGetDay = new Date(year, month, day);
  return formattedForGetDay;
}

function checkIfPast(date) {
  const reservationDate = getDateFormat(date).getTime();
  const currentDate = getDateFormat(getToday()).getTime(); //again this is to focus on date only
  const check = currentDate - reservationDate;
  return check > 0 ? true : false;
}

//converts time to a number to be compared with predetermined opening (10:30AM or 1030) and closing times (9:30PM or 2130)
function checkBusinessHours(time){
  const resTime = Number(time.split(":").join(""))
  console.log(resTime)
  if(resTime < 1030){
    return false
  } else if (resTime > 2130){
    return false
  } else {
    return true
  }
}

function checkTimePassed(time){
  const date = new Date();
  const [hour, minutes, seconds] = [date.getHours(),date.getMinutes(),date.getSeconds()];
  const currentTime = `${hour}:${minutes}:${seconds}`
  //if the reservation time is less than the current time means already passed
  return time < currentTime ? true : false
}

module.exports = {
  getToday,
  getDateFormat,
  checkIfPast,
  checkBusinessHours,
  checkTimePassed
};
