const knex = require("../db/connection");

function list(date) {
  return knex("reservations").select("*").where({"reservation_date" : date}).orderBy("reservation_time");
}

function create(newReservation){
    return knex("reservations").insert(newReservation).returning("*").then((createdReservation) => createdReservation[0])
}

module.exports = {
    list,
    create
}