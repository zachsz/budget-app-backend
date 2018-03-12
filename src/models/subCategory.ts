import { Schema, Types, model } from 'mongoose';

const schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    masterCategory: {
        type: Types.ObjectId,
        ref: 'MasterCategory',
        required: true
    }
});

export default model('SubCategory', schema);
