const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const nodemailer = require("nodemailer");

// Create a new Sequelize model for reservations, uses nodemailer for email confirmation
class Reservation extends Model {
  async sendConfirmationEmail(customerEmail, carTitle) {
    // Define email transport settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
      port: 465, // Port for SMTP (usually 465)
      secure: true, // Usually true if connecting to port 465
      auth: {
        user: process.env.GM_USER, // Your email address
        pass: process.env.GM_PASSWORD, // Password (for gmail, your app password)
        // ⚠️ For better security, use environment variables set on the server for these values when deploying
      },
    });

    // Define email message settings
    const message = {
      from: process.env.GM_USER,
      to: customerEmail, // replace with the customer's email address
      subject: "Reservation Confirmation",
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .container {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              background-color: #f5f5f5;
              padding: 30px;
            }
            .header {
              font-size: 24px;
              color: #333;
            }
            .content {
              font-size: 16px;
              color: #333;
            }
            .list {
              font-size: 14px;
              list-style-type: none;
            }
            .list-item {
              margin-bottom: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="header">Reservation Confirmation</h1>
            <p class="content">
              Thank you for reserving a car with us. Your reservation details are as
              follows:
            </p>
            <ul class="list">
              <li class="list-item">Car: ${carTitle}</li>
              <li class="list-item">Pickup Date: ${this.pickup}</li>
              <li class="list-item">Return Date: ${this.return}</li>
              <li class="list-item">Price: $${this.price}</li>
            </ul>
            <p class="content">
            ***Pick up time is 2PM, Return time is 11AM***
          </p>
            <p class="content">
              Thank you for choosing our car rental service!
            </p>
          </div>
        </body>
      </html>
      `
    };

    // Send the email and return the message ID
    const info = await transporter.sendMail(message);
    return info.messageId;
  }
}

Reservation.init(
  {
    reservationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    carId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cars',
        key: 'car_id',
      },
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'customer_id',
      },
    },
    pickup: {
      type: DataTypes.DATEONLY
    },
    return: {
      type: DataTypes.DATEONLY
    },
    price: {
      type: DataTypes.DECIMAL
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'reservation'
  }
);

module.exports = Reservation;

