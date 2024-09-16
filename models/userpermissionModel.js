const mongoose = require('mongoose');
// const { permission } = require('process');

const userPermissionSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.type.objectId,
        ref: 'User',
        required: true
    },
    permission: {
        permission_name: String,
        permission_value: [Number] //0-creat 1-read 2-updat 3-delet
    }

});

module.exports = mongoose.model('Categories', userPermissionSchema);