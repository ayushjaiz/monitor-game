import cron from 'node-cron';
import task from './task.js';

cron.schedule('17 03 * * *', task);

console.log("Daily review categorization and saving task scheduled.");