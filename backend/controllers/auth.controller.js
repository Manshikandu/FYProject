import jwt from "jsonwebtoken";

import redis from "../lib/redis.js";
import User from "../models/user.model.js";
import Artist from "../models/Artist.model.js";
import bcrypt from "bcryptjs";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2d" });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// CLIENT SIGNUP → uses User model
export const clientSignup = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    if (!username || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ $or: [{ email }, { phone }] });
    if (exists) return res.status(400).json({ message: "User already exists" });


    const user = new User({
      username,
      email,
      password, // hashed via pre-save
      phone,
      role: "client",
    });
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        username,
        email,
        phone,
        role: user.role,
      },
      message: "Client signed up successfully",
    });
  } catch (error) {
    console.error("Error in clientSignup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ARTIST SIGNUP → only in Artist model
export const artistSignup = async (req, res) => {
  try {
    const { username, email, password, phone, category, location } = req.body;

    if (!username || !email || !password || !phone || !category || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Artist.findOne({ $or: [{ email }, { phone }] });
    if (exists) return res.status(400).json({ message: "Artist already exists" });


    const artist = new Artist({
      username,
      email,
      password,
      phone,
      role: "artist",
      category,
     location: {
    type: "Point",
    coordinates: req.body.location.coordinates,
    city: req.body.location.city,
  },
    });

    await artist.save();

    const { accessToken, refreshToken } = generateTokens(artist._id);
    await storeRefreshToken(artist._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: artist._id,
        username: artist.username,
        email: artist.email,
        phone: artist.phone,
        role: artist.role,
        category: artist.category,
        location: artist.location,
      },
      message: "Artist signed up successfully",
    });
  } catch (error) {
    console.error("Error in artistSignup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN → check BOTH User and Artist models
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    console.log("Login attempt for email:", email);

    let user = await User.findOne({ email }) || await Artist.findOne({ email });
    console.log("User found:", user);

    if (!user) return res.status(401).json({ message: "Invalid credentials (email)" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials (password)" });

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ user: userData }); // role already included inside userData.role ✅
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// LOGOUT
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token:${decoded.userId}`);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "2d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 *24 * 60 * 1000,
    });

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error("Error in refreshToken:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
