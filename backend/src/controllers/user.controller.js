import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
//get user details from frontend
//validationv - not empty
//check if user already exist
//check for images,check for avatar
//upload them to cloudinary,avatar
//create usr object-create entry in db
//remove password and refresh token field from response
//check for user creation
//return res
const registerUser = asyncHandler(async (req, res) => {
  console.log("1. Request received");
  const { username, email, password } = req.body;
  console.log("2. Body parsed");

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "all fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log("3. Existing user checked");

  if (existedUser) {
    throw new ApiError(409, "user with this email or username already exist");
  }
  const profilePicLocalPath = req.files?.profilePic?.[0]?.path;

  if (!profilePicLocalPath) {
    throw new ApiError(400, "profilePic file is required");
  }
  const profilePic = await uploadOncloudinary(profilePicLocalPath);
  console.log("4. Avatar uploaded");
  console.log("Avatar value:", profilePic);
  console.log("Avatar type:", typeof profilePic);

  if (!profilePic) {
    throw new ApiError(400, "profilePic file is required");
  }
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    profilePic: profilePic.secure_url,
  });
  console.log("5. User created");
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});

export { registerUser };
