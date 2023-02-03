const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasValidProperties = require("../errors/hasValidProperties");
const hasRequiredProperties = require("../errors/hasRequiredProperties");

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${year}-${month}-${day}`;

//validation middleware for date,time,number,people
async function datePropertyIsValid(req,res,next){
  const {data : {reservation_date} = {}} = req.body
  if(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(reservation_date)){
    return next()
  }
  next({status:400, message: "Please provide a valid reservation_date"})
}

async function timePropertyIsValid(req,res,next){
  const {data : {reservation_time} = {}} = req.body
  if(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(reservation_time)){
    return next()
  }
  next({status:400, message: "Please provide a valid reservation_time"})
}

async function peoplePropertyIsValid(req,res,next){
  const {data : {people} = {}} = req.body
  if(!isNaN(people) && typeof people == "number"){
    return next()
  }
  next({status:400, message: "Please provide a valid number of people"})
}


async function list(req, res) {
  const { date = currentDate } = req.query;
  const data = await service.list(date);
  res.json({ data });
}

async function create(req,res){
  const data = await service.create(req.body.data)
  res.status(201).json({data})
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
    asyncErrorBoundary(create)
  ],
};
