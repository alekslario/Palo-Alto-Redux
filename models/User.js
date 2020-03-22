import mongoose from "mongoose";
const crypto = require("crypto");
const { String, Number } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "root"]
    },
    resetPasswordToken: {
      type: String,
      required: false
    },

    resetPasswordExpires: {
      type: Number,
      required: false
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
