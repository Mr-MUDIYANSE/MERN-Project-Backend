import User from "../model/user.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export function postUsers(req, res) {

    const user = req.body;

    const password = req.body.password;

    const hashedPassword = bcryptjs.hashSync(password, 10);
    user.password = hashedPassword;

    const newUser = new User(user);

    newUser.save().then(
        () => {
            res.json({
                message: "User created successfully"
            });
        }
    ).catch(
        (error) => {
            res.json({
                message: "Failed to create user",
                error: error.message
            });
        }
    );
}

export function loginUser(req, res) {

    const credentials = req.body;

    User.findOne(
        {
            email: credentials.email
        }
    ).then(
        (user) => {
            if (!user) {
                res.status(403).json(
                    {
                        message: "User not found"
                    }
                );
            } else {
                const isPasswordValid = bcryptjs.compareSync(credentials.password, user.password);

                if (!isPasswordValid) {
                    res.status(403).json(
                        {
                            message: "Password is incorrect"
                        }
                    );
                } else {
                    const payload = {
                        email: user.email,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        type: user.type
                    };
                    const token = jwt.sign(payload, "secret-key", { expiresIn: '24h' });
                    res.json({
                        message: "User authenticated successfully",
                        user: user,
                        token: token
                    });
                }
            }
        }
    )
}