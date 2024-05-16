const { profileGetService } = require("./profileService");

const getProfile = async (req, res) => {
  try {
    const profileData = await profileGetService(req, res);
    res.status(200).json({ data: profileData });
  } catch (error) {}
};

module.exports = { getProfile };
