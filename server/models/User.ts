import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPasswords: (pw: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    name: {
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
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPasswords = async function (enterPassword: string) {
  let isValid = await bcrypt.compare(enterPassword, this.password);
  return isValid;
};

userSchema.pre<UserDoc>("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<UserDoc>("User", userSchema);
export default User;
