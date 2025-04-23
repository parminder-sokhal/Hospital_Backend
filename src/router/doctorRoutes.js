import express from 'express';
import {createDoctor, getAllDoctors, getDoctorById, changeAvailability } from '../controller/doctorController.js';
// import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/doctor', createDoctor);
//get All doctors
router.get('/doctors', getAllDoctors);

//get doctors by id
router.get('/doctor/:id', getDoctorById);

//chnage availability
router.put('/doctor/:id/availability', changeAvailability);




export default router;