// import { config } from "dotenv"
// import User from '../../models/user.model';
// import Otp from '../../models/otp.model';
// import { generateOTP } from './generateOTP';
// import twilio from 'twilio';

// config();


// export const sendOTP = async (phone:string) => {

//   // Generate OTP
//   const otp = generateOTP();

//   // Delete existing OTPs for the phone
//   await Otp.deleteMany({ phone });

//   // Save new OTP
//   await Otp.create({ phone, otp });

//   // Send SMS directly here
//   try {

//     // from Twilio Console
//     const client = twilio(process.env.accountSid, process.env.authToken);
//     const message = await client.messages.create({
//       body: `Your OTP is ${otp}`,
//       from: '(320) 321-8813',  // Your Twilio phone number
//       to: "+916261109938"    // e.g., '+91XXXXXXXXXX'
//     });
//     return message ? 'User registered please verify your phone number. OTP sent successfully' : "Something went wrong"
//   } catch (error:any) {
//     return { message: error.message }
//   }
// };
