const knex = require("../db/connection");

function read(reservation_id){
  return knex("reservations").select("*").where({"reservation_id": reservation_id}).first()
}

function list(date) {
  return knex("reservations").select("*").where({"reservation_date" : date}).orderBy("reservation_time");
}

function create(newReservation){
    return knex("reservations").insert(newReservation).returning("*").then((createdReservation) => createdReservation[0])
}

module.exports = {
    list,
    create,
    read
}