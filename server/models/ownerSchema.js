const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    discordId:{
      type: String,
      required: true, 
    },
    password: {
      type: String,
      required: true,
    },
    members: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Owner = mongoose.model("Owner", ownerSchema);
module.exports = Owner;