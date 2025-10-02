const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authJwt');
const { permit } = require('../middlewares/role');
const controller = require('../controllers/clientesController');

// Create: admin o cliente puede crear su perfil
router.post('/', authenticateJWT, permit('admin','cliente'), controller.create);

// List: admin, profesional, cliente (según rol)
router.get('/', authenticateJWT, permit('admin','profesional','cliente'), controller.list);

// Get
router.get('/:id_cliente', authenticateJWT, permit('admin','profesional','cliente'), controller.get);

// Update
router.put('/:id_cliente', authenticateJWT, permit('admin','cliente'), controller.update);

// Delete
router.delete('/:id_cliente', authenticateJWT, permit('admin'), controller.remove);

module.exports = router;
