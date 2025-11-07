// app/models/project.js

var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    clientName: String,
    projectName: String,
    deadline: Date,
    deliverables: String,
    hours: Number,
    invoiceStatus: {
        type: String,
        enum: ['Not Invoiced', 'Invoiced', 'Paid', 'Overdue'],
        default: 'Not Invoiced'
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    rating: {
        type: Number,
        default: 5,
        min: 0,
        max: 10
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);

