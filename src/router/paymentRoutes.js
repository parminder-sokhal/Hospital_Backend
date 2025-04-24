
import express from "express";
import { createPayment, verifyPayment, getAllPayments } from "../controller/paymentController.js";

const router = express.Router();

router.post("/payment/create/:appointmentId", createPayment);
router.post("/payment/verify", verifyPayment);

router.get("/payment/all", getAllPayments);




export default router;