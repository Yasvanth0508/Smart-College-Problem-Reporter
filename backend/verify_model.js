import mongoose from 'mongoose';
import Issue from './src/models/Issue.js';

const verifyLocal = () => {
    try {
        const issue = new Issue({
            title: 'Test',
            description: 'Test',
            priority: 'critical', // THE TEST CASE
            createdBy: new mongoose.Types.ObjectId() // Fake ID
        });

        const error = issue.validateSync();
        if (error) {
            console.error('Validation Failed:', error.message);
        } else {
            console.log('Validation Success: Critical priority accepted.');
        }

        const invalidIssue = new Issue({
            title: 'Test',
            description: 'Test',
            priority: 'invalid_priority',
            createdBy: new mongoose.Types.ObjectId()
        });
        const invalidError = invalidIssue.validateSync();
        if (invalidError) {
            console.log('Validation Correctly Failed for invalid priority.');
        } else {
            console.error('Validation Failed: Invalid priority was accepted.');
        }

    } catch (e) {
        console.error('Error:', e);
    }
};

verifyLocal();
