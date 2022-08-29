const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = async (email, subject, token,username) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "msaranhos10870@gmail.com",
      pass: "MsAranhos@10870",
    },
  });

  var mailOptions = {
    from: "msaranhos10870@gmail.com",
    to: email,
    subject: subject,
    html: `<p>กดที่ลิงค์นี้เพื่อรีเซ็ตรหัสผ่านของท่าน บัญชีผู้ใช้งาน: ${username} <a href="${process.env.BASE_URL}/reset-password/${token}">link</a> to reset your password</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  console.log("email sent sucessfully");
};

module.exports = sendEmail;
