// const express = require('express');
import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/authController.js';
// const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

export default router;
