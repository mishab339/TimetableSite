const twilio = require('twilio');
const cron = require('node-cron');
const mongoose = require('mongoose');
const Student = require("../models/periodRemainder");
const { studentSignup_validation } = require('../controllers/siteController');

const accountSid = process.env.TWILIO_ACCOUNT_SID // Replace with your Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN // Replace with your Auth Token
const twilioClient = twilio(accountSid, authToken);

     async function sendSMS(to, message){
        try {
          const sms = await twilioClient.messages.create({
            body: message,
            from:process.env.PHONE_NUMBER,
            to,
          });
          console.log(`Message sent to ${to} with SID: ${sms.sid}`);
        } catch (error) {
          console.error(`Failed to send SMS to ${to}:`, error.message);
        }
      }
     async function sendReminders(){
<<<<<<< HEAD
=======
        const students = await Student.find();
        console.log(students);
>>>>>>> a339ce04614246c11ebb2c613c23b078000d4489
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}`;
<<<<<<< HEAD

          const students = await Student.find({
            'schedule.startingTime': "09:30",
          });
        
          if (students.length === 0) {
            console.log('No reminders to send at this time.');
            return;
=======
        for (const student of students) {
          for (const period of student.schedule) {
            console.log(period);
            if (period.startingTime === currentTime) {
              const message = `Hi ${student.name}, this is a reminder for your class on "${period.subject}" starting at ${period.startingTime}.`;
              await sendSMS(student.phone, message);
            }
>>>>>>> a339ce04614246c11ebb2c613c23b078000d4489
          }
          for (const student of students) {
            // Find the exact period matching the current time
            const currentPeriod = student.schedule.find(
              (period) => period.startingTime === currentTime
            );
            if (currentPeriod) {
              const message = `Hi ${student.name}, this is a reminder for your class on "${currentPeriod.subject}" starting at ${currentPeriod.startingTime}.`;
              try {
                await sendSMS(student.phone, message);
              } catch (error) {
                console.error(`Failed to send SMS to ${student.phone}:`, error.message);
              }
            }
      }
    }
      cron.schedule('* * * * *', () => {
        console.log('Checking schedules and sending reminders...');
        sendReminders();
      });
      console.log('Reminder service is running...');      
