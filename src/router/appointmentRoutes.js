import express from 'express';
import { createAppointment, getAllAppointments, getAppointmentByDate} from '../controller/appointmentController.js';

const router = express.Router();

// Route to create a new appointment
router.post('/appoint/:id', createAppointment);

//get all appointments
router.get('/appoints', getAllAppointments);

//get appointment by date
router.get('/appoints/:date', getAppointmentByDate);


export default router;