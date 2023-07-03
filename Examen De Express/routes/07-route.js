const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
// No modifiques nada arriba de esta línea

// Escribe la lógica de tu ruta GET /cats acá
router.get('/cats', (req, res) => {
    try {
        const age = req.query.age;
        const cats = controller.listCats(age);
        res.status(200).json(cats);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// No modifiques nada debajo de esta línea
module.exports = router;
