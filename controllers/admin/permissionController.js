
const { validationResult } = require('express-validator');

const permission = require('../../models/permisionModel')

const addPermission = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'errors',
                errors: errors.array()
            });
        }

        const { permission_name } = req.body;
        const permissionExist = await permission.findOne({ permission_name });
        if (permissionExist) {
            return res.status(200).json({
                success: false,
                msg: 'Permission already exist',
            });
        }
        const permissionData = new permission({
            permission_name
        });
        const permissionResult = await permissionData.save();
        return res.status(200).json({
            success: true,
            msg: 'Permission added successfully',
            data: permissionResult
        });

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

const getPermission = async (req, res) => {
    try {
        const permissionData = await permission.find();
        return res.status(200).json({
            success: true,
            msg: 'Permission fetched successfully',
            data: permissionData
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const deletPermission = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'errors',
                errors: errors.array()
            });
        }
        const { id } = req.body;
        const permissionData = await permission.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            success: true,
            msg: 'Permission deleted successfully',
            data: permissionData
        });

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const updatePermission = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'errors',
                errors: errors.array()
            });
        }

        const { id, permission_name } = req.body;
        const ispermissionExist = await permission.findOne({
            _id: { $ne: id },
            permission_name: permission_name
        });
        if (ispermissionExist) {
            return res.status(200).json({
                success: false,
                msg: 'Permission already exist',
                data: ispermissionExist
            });
        }
        const permissionData = await permission.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({
            success: true,
            msg: 'Permission updated successfully',
            data: permissionData
        });
    }

    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

module.exports = {
    addPermission,
    getPermission,
    deletPermission,
    updatePermission
}