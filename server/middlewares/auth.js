import jwt from 'jsonwebtoken'
// this userAuth the middleware : This is a middleware that checks if a request has
//  a valid token in the headers. It verifies the token, extracts the user ID,
//  and attaches it to the request body. If the token is missing or invalid,
//  it blocks access.


// The auth.js middleware is used to protect routes by verifying that incoming 
// requests have a valid authentication token. It checks the token in the request 
// headers, decodes it to get the user ID, and attaches the user ID to the request. 
// If the token is missing or invalid, it blocks access and returns an error.
// In short:
// auth.js ensures that only authenticated users can access certain API routes by
//  checking their token before allowing the request to proceed.
const userAuth = async (req, res, next) => {
    // Get token from headers
    const token = req.headers.token;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
//         auth.js is a route-protection middleware.
// It reads a JWT from req.headers.token, verifies it, and adds userId 
// to req.body.
// If valid, next(); if not, returns “Not Authorized”.
//why we storing id in req.body ka ans niche h 
// So controllers know who the caller is without re-verifying the token.
// They can directly use req.body.userId to:
// Fetch the user from DB, e.g., get credits/profile.
// Link new records to the user, e.g., generated images, transactions.

        if (!req.body) req.body = {};
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: 'Not Authorized Login Again' });
        }

        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;