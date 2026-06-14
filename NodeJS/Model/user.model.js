import mongoose from "mongoose";

// ==========================================
// MAIN SCHEMA: USER ACCOUNT DETAILS
// ==========================================
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true, // Automatically removes leading/trailing white spaces
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,   // Ensures database-level uniqueness for user log-ins
      lowercase: true, // Forces string conversion to lowercase before saving
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
  },
  { 
    timestamps: true // Tracks registration and profile update timestamps
  }
);

// Export Mongoose model mapping to the 'users' collection
export default mongoose.model("User", userSchema);