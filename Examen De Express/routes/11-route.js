const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
// No modifiques nada arriba de esta línea

// Escribe la lógica de las rutas acá
router.post('/accessories', (req, res) => {
    try {
        const obj = req.body;
        const message = controller.addAccessory(obj);
        res.status(201).json({ message });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// No modifiques nada debajo de esta línea
module.exports = router;
