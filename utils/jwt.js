import jwt from "jsonwebtoken"

export const generateToken = (payload) => {
    const { JWT_TOKEN_SECRET, JWT_TOKEN_EXPIRES } = process.env;
    const token = jwt.sign(
        payload,
        JWT_TOKEN_SECRET,
        { expiresIn: JWT_TOKEN_EXPIRES * 24 * 60 * 60 * 1000 }
    )
    return token;
}

//ONLY FOR QR
export const verifyJWT = (qrToken) => {
    let error;
    jwt.verify(
        qrToken,
        process.env.JWT_TOKEN_SECRET,
        async (err, decoded) => {
            if (error) {
                error = true
            }
            if (decoded) {
                error =false
            }
        }
    );
    return error;
}

// FOR QR CODE ONLY
export const generateJWT = () => {
    const { JWT_TOKEN_SECRET } = process.env;
    const token = jwt.sign(
        {
            name: "HR Manage",
            company: "SMT"
        },
        JWT_TOKEN_SECRET,
    )
    return token;
}