const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
// No modifiques nada arriba de esta línea

// Escribe la lógica de las rutas acá
router.put('/cats/add-accessory', (req, res) => {
    const { catName, catAccessory } = req.body;
    try {
        const message = controller.addCatAccessory(catName, catAccessory);
        res.status(200).json({ message });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// No modifiques nada debajo de esta línea
module.exports = router;
