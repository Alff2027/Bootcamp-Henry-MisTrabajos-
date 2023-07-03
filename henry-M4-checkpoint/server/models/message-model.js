import Sequelize from 'sequelize';
import db from './_db';
const User = db.model('user');

const Message = db.define('message', {});

export default Message;