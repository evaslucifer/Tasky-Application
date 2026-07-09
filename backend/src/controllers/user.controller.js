import { asynaHandler } from "../utils/asyncHandler.js";

const registerUser = asynaHandler(async (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

export { registerUser };
