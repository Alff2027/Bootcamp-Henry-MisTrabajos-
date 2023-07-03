const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
// No modifiques nada arriba de esta línea

// Escribe la lógica de las rutas acá
router.post('/cat', (req, res) => {
    try {
        const { name } = req.body;
        const cat = controller.addCat(name);
        res.status(200).json({cat});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// No modifiques nada debajo de esta línea
module.exports = router;
