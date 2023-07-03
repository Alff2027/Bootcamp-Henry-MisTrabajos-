import express from 'express';
import db from '../models';
const User = db.model('user');
const Message = db.model('message');

// Este router esta ya montado en /useres en server/app.js
const router = express.Router();

export default router;