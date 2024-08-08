const mongoose = require("mongoose");

const sellerSchema = new Schema(
  {
    sellerUserId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    userrole: {
      type: String,
      default: "Seller",
    },
    phoneno: {
      type: String,
    },

    profileUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    autoCreate: true, // auto create collection
    autoIndex: true, // auto create indexes
  }
);

/* // Hash the password before saving schema
sellerSchema.pre('save', async function () {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    } catch (err) {
        winstonlog("error").error(err.stack)
    }
});

// Compare hashed passwords during login
sellerSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        winstonlog("error").error(err.stack)
    }
}; */

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
