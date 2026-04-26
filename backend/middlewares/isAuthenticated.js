import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // 1. Get the token from the cookie
    const token = req.cookies.token;

    // 2. If no token, user is not logged in
    if (!token) {
      return res.status(401).json({
        message: "Please login first.",
        success: false,
      });
    }

    // 3. Verify the token is valid and not expired
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 4. Attach the user ID to the request object
    req.id = decoded.userId;

    // 5. Let the request continue to the controller
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired session. Please login again.",
      success: false,
    });
  }
};

export default isAuthenticated;