import { Schema, Types, model } from 'mongoose';

const schema = new Schema({
    month: {
        type: String,
        required: true,
        unique: true
    },
    subCategory: {
        type: Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    budgeted: {
        type: Number
    },
    outflows: {
        type: Number
    },
    Balance: {
        type: Number
    }
});

export default model('Month', schema);
