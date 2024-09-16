exports.permissionValidator = [
    check('permission_name', 'permission name is required').not().isEmpty(),
];
exports.permissionDeletValidator = [
    check('id', 'Id is required').not().isEmpty(),
];
exports.permissionUpdateValidator = [
    check('id', 'Id is required').not().isEmpty(),
    check('permission_name', 'permission name is required').not().isEmpty(),
];