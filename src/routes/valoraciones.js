const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authJwt');
const { permit } = require('../middlewares/role');
const ctrl = require('../controllers/valoracionesController');

router.post('/', authenticateJWT, permit('admin','cliente'), ctrl.create);
router.get('/', authenticateJWT, permit('admin','profesional','cliente'), ctrl.list);
router.get('/:id_valoracion', authenticateJWT, permit('admin','profesional','cliente'), ctrl.get);
router.put('/:id_valoracion', authenticateJWT, permit('admin'), ctrl.update);
router.delete('/:id_valoracion', authenticateJWT, permit('admin'), ctrl.remove);

module.exports = router;
