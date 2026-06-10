import jwt from "jsonwebtoken";
const protect = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, access denied" });
  }
  const token = authToken.split(" ")[1];

  try {
    const decodedUser = jwt.verify(
      token,
      "urbanbasket@2026@secure#key$flag@auth",
    );
    req.user = decodedUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token, access denied" });
  }
};

export default protect;
