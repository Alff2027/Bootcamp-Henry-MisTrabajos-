import db from './_db';
import User from './user-model';
import Message from './message-model';

/*
    Podrías no haber visto el siguiente método de asociación antes.

    Las siguientes dos lineas agregan dos columnas adicionales a 
    la tabla `messages`: `toId` y `fromId`.

    La propiedad `as` en el objeto de opciones es llamado un "alias"
    y nos permite asociar foreign key de la misma entidad, en este caso
    user, más de una vez en una sola tabla/modelo.

    Estas aliases van a ser importantes de recordar y referenciar durante 
    la parte del servidor del checkpoint.
    
    http://sequelize.readthedocs.io/en/v3/docs/associations/#naming-strategy
*/

Message.belongsTo(User, { as: 'to' });
Message.belongsTo(User, { as: 'from' });

export default db;
