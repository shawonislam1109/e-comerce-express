const Branch = require("../Branch/branchSchema");
const { profileGetService } = require("./profileService");

const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    const profileData = await profileGetService(req, res);
    // -> FIND BRANCH
    const findBranch = await Branch.find({ merchant: id });
    res.status(200).json({ data: profileData, branches: findBranch, token });
  } catch (error) {}
};

module.exports = { getProfile };
