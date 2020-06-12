import mongoose from "mongoose";
const crypto = require("crypto");
const { String, Number } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "root"],
    },
    resetPasswordToken: {
      type: String,
      required: false,
      select: false,
    },

    resetPasswordExpires: {
      type: Number,
      required: false,
      select: false,
    },
    stripeId: {
      type: String,
      required: true,
    },
    stripePaymentMethods: [
      {
        payment_method: {
          type: String,
          required: false,
        },
        brand: {
          type: String,
          required: false,
        },
        exp_month: {
          type: Number,
          required: false,
        },
        exp_year: {
          type: Number,
          required: false,
        },
        last4: {
          type: String,
          required: false,
        },
      },
    ],
    address: [
      {
        name: {
          type: String,
          required: true,
        },
        surname: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postcode: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        addressOptional: {
          type: String,
          required: false,
        },
        province: {
          type: String,
          required: false,
        },
        phone: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
