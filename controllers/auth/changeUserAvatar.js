const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");

const userAvatarDir = path.join(__dirname, "../../", "public/avatars");

const changeUserAvatar = async (req, res) => {
  const { email, password } = req.body;

  let filedata = req.file;
  if (!filedata) {
    return res.status(400).json({
      status: "Bad request",
      message: "wrong mime type of file",
    });
  }
  const { path: tempDir, originalname } = req.file;
  // проверка на коректного юзера для изменения картинки только тем юзером кому пренадлежит акаунт
  const [bearer, token] = req.headers.authorization.split(" ");
  const currentUser = await User.findOne({ token: token });
  if (currentUser.email !== email) {
    return res.status(403).json({
      status: "Forbidden",
      code: 403,
      message:
        "Forbidden - you don`t not have permission to access the content",
    });
  }
  if (!email || !password) {
    res.status(400).json({
      message: "missing field of request email or password",
    });
  }
  try {
    const resultUpload = path.join(
      userAvatarDir,
      `${email.replace(/[\s.,%]/g, "")}-${originalname}`
    );

    await Jimp.read(tempDir)
      .then((ava) => {
        return ava
          .resize(250, 250) // resize
          .write(`${tempDir}`); // save
      })
      .catch((err) => {
        console.error(err);
      });

    await fs.rename(tempDir, resultUpload);

    const avatarURL = path.join(
      "/avatars",
      `${email.replace(/[\s.,%]/g, "")}-${originalname}`
    );

    const newUserAvatar = await User.findOneAndUpdate(
      { email: email },
      {
        avatarURL,
      },
      { new: true }
    );

    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        email: newUserAvatar.email,
        user_id: newUserAvatar._id,
        avatarURL: newUserAvatar.avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempDir);
    throw error;
  }
};

module.exports = changeUserAvatar;
