const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authJwt');
const { permit } = require('../middlewares/role');
const ctrl = require('../controllers/pagosController');

router.post('/', authenticateJWT, permit('admin'), ctrl.create);
router.get('/', authenticateJWT, permit('admin','profesional'), ctrl.list);
router.get('/:id_pago', authenticateJWT, permit('admin','profesional'), ctrl.get);
router.put('/:id_pago', authenticateJWT, permit('admin'), ctrl.update);
router.delete('/:id_pago', authenticateJWT, permit('admin'), ctrl.remove);

module.exports = router;
