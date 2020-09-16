exports.getToken = function (req) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        throw new TokenError("No Authorization Header");
    }

    try {
        const token = authorization.split("Bearer ")[1];
        return token;
    } catch (err) {
        throw new TokenError("Invalid Token Format");
    }


};


