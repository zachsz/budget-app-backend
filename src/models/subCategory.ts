import { Schema, model } from 'mongoose';

const schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    masterCategory: {
        type: Schema.Types.ObjectId,
        ref: 'MasterCategory',
        required: true
    }
});

export default model('SubCategory', schema);
