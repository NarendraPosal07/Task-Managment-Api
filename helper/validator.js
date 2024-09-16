const { check } = require('express-validator');

exports.registerValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'please include valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'password is required').not().isEmpty(),
];

exports.loginValidator = [
    check('email', 'please include valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'password is required').not().isEmpty(),
];