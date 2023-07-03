const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
// No modifiques nada arriba de esta línea

// Escribe la lógica de las rutas acá
router.put('/accessories', (req, res) => {
    try {
        const obj = req.body;
        const modifyAcc = controller.modifyAccessory(obj);

        if (modifyAcc.error) {
            res.status(404).json({ error: modifyAcc.error });
        } else {
            res.status(200).json(modifyAcc);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// No modifiques nada debajo de esta línea
module.exports = router;
