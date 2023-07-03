const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
// No modifiques nada arriba de esta línea

// Escribe la lógica de las rutas acá
router.get('/accessories', (req, res) => {
    try {
        const { type, color } = req.query;
        const getAccess = controller.getAccessories(type, color);
        res.status(200).json(getAccess);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// No modifiques nada debajo de esta línea
module.exports = router;
