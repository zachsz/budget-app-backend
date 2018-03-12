import { Schema, Types, model } from 'mongoose';

const schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

export default model('MasterCategory', schema);
