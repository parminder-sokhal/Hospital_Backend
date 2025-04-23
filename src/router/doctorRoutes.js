import express from 'express';
import {createDoctor } from '../controller/doctorController.js';
// import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/doctor', createDoctor);




export default router;