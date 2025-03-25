// import { compare, genSalt, hash } from "bcrypt";
import { Schema, Types, model } from "mongoose";


// export type Token = {
//   token: string;
//   location: string;
//   createdAt: string;
// };

export interface UserDocument extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  verified: boolean;
//   tokens: Token[];
//   roles: TariffloRoles[];
  createdAt: string;
  updatedAt: string;
//   stripeId: string;
//   currentOrganization: Types.ObjectId;
//   defaultOrganization: Types.ObjectId;
//   oauthProvider?: string;
//   oauthId?: string;
//   twoStepVerification?: boolean;
}

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  verified: boolean;
  createdAt: string;
  stripeId: string;
}

// interface Methods {
//   comparePassword: (password: string) => Promise<boolean>;
// }

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true },
);

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await genSalt(10);
//     this.password = await hash(this.password, salt);
//   }
//   next();
// });

// userSchema.methods.comparePassword = async function (password) {
//   return await compare(password, this.password);
// };

const UserModel = model("User", userSchema);
export default UserModel;