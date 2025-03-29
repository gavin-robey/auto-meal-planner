import { compare, genSalt, hash } from "bcrypt";
import { Schema, Types, model, Document } from "mongoose";

export interface AuthVerificationTokenDocument extends Document {
    token: string;
    owner: Types.ObjectId;
    createdAt: Date;
}

interface Methods {
    compareToken: (token: string) => Promise<boolean>;
}

const authVerificationTokenSchema = new Schema<AuthVerificationTokenDocument, {}, Methods>(
    {
        token: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            expires: 86400, 
        },
    },
);

authVerificationTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        const salt = await genSalt(10);
        this.token = await hash(this.token, salt);
    }
    next();
});

authVerificationTokenSchema.methods.compareToken = async function (token: string) {
    return await compare(token, this.token);
};

const AuthVerificationTokenModel = model<AuthVerificationTokenDocument>("AuthVerificationToken", authVerificationTokenSchema);
export default AuthVerificationTokenModel;