import UserModel from "src/models/user";

export const createNewUser = async (email: string, password: string, name: string) => {
    email = email.trim().toLowerCase();

    // need to connect mongo db to docker to get this to work
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const newUser = new UserModel({
        email,
        password,
        name,
    });

    await newUser.save();
    return newUser;
};