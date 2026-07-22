import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken;
    const refreshToken = user.generateRefreshToken;
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};
//register user
const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validationv - not empty
  //check if user already exist
  //check for images,check for avatar
  //upload them to cloudinary,avatar
  //create usr object-create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "all fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user with this email or username already exist");
  }
  const profilePicLocalPath = req.files?.profilePic?.[0]?.path;

  if (!profilePicLocalPath) {
    throw new ApiError(400, "profilePic file is required");
  }
  const profilePic = await uploadOncloudinary(profilePicLocalPath);

  if (!profilePic) {
    throw new ApiError(400, "profilePic file is required");
  }
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    profilePic: profilePic.secure_url,
  });
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

//login user
const loginUser = asyncHandler(async (req, res) => {
  //req.body
  //check for username or email
  //find user
  //check password
  //access and refreh token
  //send cookie
  const { username, email, password } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "username or password is required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(400, "user does not exist");
  }
  const isPasswordVaild = await user.isPasswordCorrect(password);
  if (!isPasswordVaild) {
    throw new ApiError(401, "Invalid user credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,

    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
export { registerUser, loginUser, logoutUser };
