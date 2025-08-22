const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors()); // allow requests from frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-feedback", async (req, res) => {
  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: "pravallikasurabathula@gmail.com", pass: "mini_6167" }
  });

  await transporter.sendMail({
    from: email,
    to: "pravallikasurabathula@gmail.com",
    subject: "New Feedback from Fix My City",
    text: message
  });

  res.send("Feedback sent successfully!");
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
