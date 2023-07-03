import express from 'express';
import db from '../models';
const Message = db.model('message');
const User = db.model('user');

// Este router esta ya montado en /messages en server/app.js
const router = express.Router();



export default router;