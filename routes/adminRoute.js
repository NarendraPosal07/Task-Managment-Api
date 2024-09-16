const express = require('express');
const router = express();

const permissionController = require('../controllers/admin/permissionController')
const auth = require('../middlewares/authMiddleware');
const { onlyAdminAccess } = require('../middlewares/adminMiddlewares')
const { permissionValidator, permissionDeletValidator, permissionUpdateValidator } = require('../helper/adminvalidator');

router.post('/add-permission', auth, onlyAdminAccess, permissionValidator, permissionController.addPermission);
router.get('/get-permission', auth, onlyAdminAccess, permissionController.getPermission);
router.post('/delet-permission', auth, onlyAdminAccess, permissionDeletValidator, permissionController.deletPermission);
router.post('/update-permission', auth, onlyAdminAccess, permissionUpdateValidator, permissionController.updatePermission);

module.exports = router;