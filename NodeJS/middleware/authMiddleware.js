import jwt from "jsonwebtoken";

/**
 * Middleware function to protect private routes by verifying the JWT token.
 * Intercepts incoming requests, validates headers, and decodes the user payload.
 */
const protect = (req, res, next) => {
  // Extract the Authorization header from the request
  const authToken = req.headers.authorization;
  
  // Check if the authorization header exists and follows the 'Bearer <token>' format
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, access denied" });
  }
  
  // Extract the actual token string from the header space split
  const token = authToken.split(" ")[1];

  try {
    // Verify the token validity using the secure key from your .env file
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded token payload (e.g., userId) directly to the request object
    req.user = decodedUser;
    
    // Pass execution control over to the next middleware or controller function
    next();
  } catch (error) {
    // Catch authorization flaws (expired tokens, mismatched keys, or tampering)
    return res.status(401).json({ message: "Invalid token, access denied" });
  }
};

export default protect;