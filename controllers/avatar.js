const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../models/user");
const { ctrlWrapper } = require("../helpers");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const resizeAvatar = async (path) => {
  const avatar = await Jimp.read(path);
  avatar.resize(250, 250).quality(80);
  await avatar.writeAsync(path);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: currentPath, filename } = req.file;
  const newFileName = `${_id}_${filename}`;

  await fs.rename(currentPath, `${avatarsDir}/${newFileName}`);
  const avatarURL = path.join("public", "avatars", newFileName);

  await User.findByIdAndUpdate(_id, { avatarURL });
  resizeAvatar(avatarURL);
  res.status(200).json({
    avatarURL,
  });
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
