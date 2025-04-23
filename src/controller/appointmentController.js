import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

import Appointment from "../model/AppointmentModel.js";
import Patient from "../model/PatientModel.js";


//create Appointment
export const createAppointment = catchAsyncError(async (req, res, next) => {
  const {id} = req.params; 
  const { name, age, gender, phone, email, address, bloodGroup, date, timeSlot, symptoms } = req.body;

  // create patient mosel
  const patient = await Patient.create({
    name,
    age,
    gender,
    contact: {
      phone,
      email,
      address,
    },
    bloodGroup,
  });

  const appointment = new Appointment({
    patient: patient._id,
    doctor: id,
    date: date,
    timeSlot,
    symptoms,
  });

  await appointment.save();

  // send message to whatapps
  // write to payment  model
  // send message tp finalize the appointment
  // send message to doctor

  res.status(201).json({ 
    success: true,
    message: "Appointment created successfully",
    appointment 
  });
});

//  //get all appointments
export const getAllAppointments = catchAsyncError(async (req, res, next) => {
    const appointments = await Appointment.find({ isdeleted: false })
      .populate({
        path: 'patient',
        select: 'name age gender contact.phone contact.email contact.address bloodGroup',
      })
      .populate({
        path: 'doctor',
        select: 'name specialization fees availability slots',
      });
  
    res.status(200).json({
      success: true,
      message: 'Appointments fetched successfully',
      appointments,
    });
  });


  // get appointment by  date
export const getAppointmentByDate = catchAsyncError(async (req, res, next) => {
    const { date } = req.params;

    const appointments = await Appointment.find({ date, isdeleted: false })
      .populate({
        path: 'patient',
        select: 'name age gender contact.phone contact.email contact.address bloodGroup',
      })
      .populate({
        path: 'doctor',
        select: 'name specialization fees availability slots',
      });

    res.status(200).json({
      success: true,
      message: 'Appointments fetched successfully',
      appointments,
    });
  });
  