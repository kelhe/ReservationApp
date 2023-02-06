const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasValidProperties = require("../errors/hasValidProperties");
const hasRequiredProperties = require("../errors/hasRequiredProperties");
const {getDateFormat,getToday,checkIfPast,checkBusinessHours,checkTimePassed} = require("../utils/date-timeValidation");
const reservationExists = require("../utils/reservationExists")
const currentDate = getToday();

//validation middleware for date,time,people
async function datePropertyIsValid(req, res, next) {
  const { data: { reservation_date, reservation_time } = {} } = req.body;
  if (!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(reservation_date)) {
    return next({status: 400, message: "Please provide a valid reservation_date"});
  }
  if(checkIfPast(reservation_date,reservation_time)){
    return next({status:400, message: "The date you selected has already passed. Please select a future date!"})
  }
  if(getDateFormat(reservation_date).getDay() === 2){
    return next({status: 400, message : "Sorry, We're closed on Tuesdays. Please select a new date!"})
  }
  next();
}

async function timePropertyIsValid(req, res, next) {
  const { data: { reservation_date,reservation_time } = {} } = req.body;
  if (!/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(reservation_time)) {
    return next({
      status: 400,
      message: "Please provide a valid reservation_time",
    });
  }
  if(!checkBusinessHours(reservation_time)){
    return next({status:400, message: "Time must be in between 10:30AM and 9:30PM"})
  }
  if(checkIfPast(reservation_date,reservation_time)){
    return next({status:400, message: "The time you selected has already passed. Please select a future time!"})
  }
  next();
}


async function peoplePropertyIsValid(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (isNaN(people) && typeof people !== "number") {
    return next({
      status: 400,
      message: "Please provide a valid number of people",
    });
  }
  next();
}

async function list(req, res) {
  const { date = currentDate } = req.query; //if no date in query then default to today's date
  const data = await service.list(date);
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function read(req,res){
  const data = res.locals.reservation
  res.status(200).json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasValidProperties),
    asyncErrorBoundary(
      hasRequiredProperties(
        "first_name",
        "last_name",
        "mobile_number",
        "reservation_date",
        "reservation_time",
        "people"
      )
    ),
    asyncErrorBoundary(datePropertyIsValid),
    asyncErrorBoundary(timePropertyIsValid),
    asyncErrorBoundary(peoplePropertyIsValid),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists),asyncErrorBoundary(read)]
};
