const ProfileSchema = require("./profileSchema");

const profileGetService = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await ProfileSchema.findOne({
      $or: [{ merchant: id }, { profileId: id }],
    }).select({ password: 0, __v: 0, confirmPassword: 0 });
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).send("Error fetching profile");
  }
};

module.exports = { profileGetService };
