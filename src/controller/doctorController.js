import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import Doctor from '../model/DoctorModel.js'; // Import the Doctor model
// Controller function to create a new doctor

//create doctor
export const createDoctor = catchAsyncError(async (req, res, next) => {
   
        const { name, specialization, hospital, about, qualification, awards, experience, fees, availability, phone, email, slots } = req.body;

        // Validate required fields
        if (!name || !specialization || !email) {
            return next(new ErrorHandler(400, 'All fields are required'));
        }

        // Create a new doctor
        const newDoctor = new Doctor({
            name,
            specialization,
            hospital,
            about,
            qualification,
            awards,
            experience,
            fees,
            availability,
            contact: {
                phone,
                email,
            },
            slots,
            // image: {
            //     public_id: req.file ? req.file.filename : null, // Assuming you're using multer for file uploads
            //     url: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null, // Adjust the URL as needed
            // },
            // createdBy: req.user.id, 
        });

        // Save the doctor to the database
        const savedDoctor = await newDoctor.save();

        res.status(201).json({
            success: true,
            message: 'Doctor created successfully',
            doctor: savedDoctor,
        });
    
});


//get all doctors
export const getAllDoctors = catchAsyncError(async (req, res, next) => {
    const doctors = await Doctor.find({ isdeleted: false });
    res.status(200).json({
        success: true,
        message: 'Doctors fetch successfully',
        doctors,
    });
});

//get doctor by id
export const getDoctorById = catchAsyncError(async (req, res, next) => {
    const{id }= req.params;

    const doctor = await Doctor.findById(id).populate('createdBy', 'name email');
    if (!doctor) {
        return next(new ErrorHandler(404, 'Doctor not found'));
    }
    res.status(200).json({
        success: true,
        message: 'Doctor fetch successfully',
        doctor,
    });
});

//chnage availability
export const changeAvailability = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { availability } = req.body;

    const doctor = await Doctor.findById(id);
    if (!doctor) {
        return next(new ErrorHandler(404, 'Doctor not found'));
    }

    if (availability === doctor.availability) {
        return next(new ErrorHandler(400, 'Availability is already set to this value'));
    }

    doctor.availability = availability;
    await doctor.save();

    res.status(200).json({
        success: true,
        message: 'Availability updated successfully',
        doctor,
    });
});
