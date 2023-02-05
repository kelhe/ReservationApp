//Get todays date in YYYY-MM-DD format 
function getToday() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

//get the date in new Date format to be used to check if the date is in future or pass
//if time parameter is given then will return with specific time
function getDateFormat(date,time = 0) {
  const arr = date.split("-");
  const [year,month,day] = arr;
  if(time){
    const arrTime = time.split(":")
    const [hour,minute,second = 0] = arrTime
    return new Date(year,month - 1, day, hour, minute, second) 
  }
  return new Date(year, month - 1, day);
}
//Checks for if date is in the past
function checkIfPast(date,time = 0) {
  const reservationDate = getDateFormat(date,time).getTime();
  const currentDate = new Date().getTime();
  const check = currentDate - reservationDate;
  return check > 0 ? true : false;
}

//converts time to a number to be compared with predetermined opening (10:30AM or 1030) and closing times (9:30PM or 2130)
function checkBusinessHours(time){
  const resTime = Number(time.split(":").join(""))
  if(resTime < 1030){
    return false
  } else if (resTime > 2130){
    return false
  } else {
    return true
  }
}


module.exports = {
  getToday,
  getDateFormat,
  checkIfPast,
  checkBusinessHours,
};
