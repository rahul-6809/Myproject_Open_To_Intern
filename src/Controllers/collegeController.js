const collegeModel = require("../Models/collegeModel");

const validator = require('validator')






const isValid = function(value){
    if(typeof value === "undefined"|| value === null) return false
    if(typeof value === "string" && value.trim().length === 0) return false
    return true
  }  




const createCollege = async (req, res) => {
  try {
    const { name, fullName, logoLink } = req.body;

    if (!isValid(name) || !isValid(fullName) || !isValid(logoLink)) {
      return res.status(400).send({ status: false, message: "Invalid input" });
    }

    if (!validator.isURL(logoLink)) {
      return res.status(400).send({
        status: false,
        message: "Please provide a valid logo link"
      });
    }
    const collegeName = await collegeModel.findOne({ name });

    if (collegeName) {
      return res
        .status(400)
        .send({
          status: false,
          message: "college detail already exists",
        });
    }

    const collegeFullName = await collegeModel.findOne({ fullName });

    if (collegeFullName) {
      return res
        .status(400)
        .send({ status: false, message: "college Name already exists" });
    }

    const college = await collegeModel.create(req.body);

    const requiredData = await collegeModel
      .findById(college._id)
      .select({ _id: 0, __v: 0 });

    return res.status(201).send({ status: true, data: requiredData });
  } catch (err) {
    console.log(err),
      res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createCollege };
