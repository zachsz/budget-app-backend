import { Schema, model } from 'mongoose';

const schema = new Schema({
    month: {
        type: String,
        required: true
    },
    masterCategory: {
        type: Schema.Types.ObjectId,
        ref: 'MasterCategory',
        required: true
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    budgeted: {
        type: Number,
        default: 0.00
    },
    outflows: {
        type: Number,
        default: 0.00
    },
    balance: {
        type: Number,
        default: 0.00
    }
});

export default model('BudgetEntry', schema);
