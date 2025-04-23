import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import Doctor from '../model/DoctorModel.js'; // Import the Doctor model
// Controller function to create a new doctor

//create doctor
export const createDoctor = catchAsyncError(async (req, res, next) => {
   
        const { name, specialization, email, phone } = req.body;

        // Validate required fields
        if (!name || !specialization || !email || !phone) {
            return next(new ErrorHandler(400, 'All fields are required'));
        }

        // Create a new doctor
        const newDoctor = new Doctor({
            name,
            specialization,
            email,
            phone,
        });

        // Save the doctor to the database
        const savedDoctor = await newDoctor.save();

        res.status(201).json({
            success: true,
            message: 'Doctor created successfully',
            doctor: savedDoctor,
        });
    
});

