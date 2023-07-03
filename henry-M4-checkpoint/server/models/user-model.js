import Sequelize from 'sequelize';
import db from './_db';

const User = db.define('user', {});

export default User;