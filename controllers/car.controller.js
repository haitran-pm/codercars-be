const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../helpers/utils.js");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  const newCar = req.body;
  try {
    if (!newCar) throw new AppError(402, "Bad Request", "Create Car Error");
    const created = await Car.create(newCar);
    sendResponse(
      res,
      200,
      true,
      { car: created },
      null,
      "Create Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    // Lấy `page` và `limit` từ query parameters
    const page = parseInt(req.query.page) || 1; // Mặc định page = 1
    const limit = parseInt(req.query.limit) || 10; // Mặc định limit = 10
    const skip = (page - 1) * limit;
    //mongoose query
    const listOfFound = await Car.find()
      .sort({ createdAt: -1 }) // Sắp xếp giảm dần theo createdAt (-1 giảm dần, 1 tăng dần)
      .skip(skip) // Bỏ qua `skip` document
      .limit(limit); // Lấy tối đa `limit` document

    const totalCars = await Car.countDocuments();

    sendResponse(
      res,
      200,
      true,
      {
        cars: listOfFound,
        total: Math.ceil(totalCars / limit),
        page: page,
      },
      null,
      "Get Car List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  const targetId = req.params.id;
  const updateInfo = req.body;
  const options = { new: true }; //options to modify query. e.g new true return lastest update of data
  try {
    if (!targetId || !updateInfo)
      throw new AppError(402, "Bad Request", "Update Car Error");
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);
    sendResponse(
      res,
      200,
      true,
      { car: updated },
      null,
      "Update Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

/* Hard delete */
carController.deleteCar = async (req, res, next) => {
  const targetId = req.params.id;
  const options = { new: true };
  try {
    if (!targetId) throw new AppError(402, "Bad Request", "Delete Car Error");
    const updated = await Car.findByIdAndDelete(targetId, options);
    sendResponse(
      res,
      200,
      true,
      { car: updated },
      null,
      "Delete Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
