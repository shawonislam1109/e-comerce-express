const Brand = require("../../model/Brand");
/**
 * Saves a new brand to the database.
 * @async
 * @function productService
 * @param {object} req - The request object containing brand details.
 * @param {object} req.body - The body of the request containing brand details.
 * @param {string} req.body.name - The name of the brand.
 * @param {string} req.body.email - The email of the brand.
 * @param {string} req.body.website - The website of the brand.
 * @param {string} req.body.location - The location of the brand.
 * @param {string[]} req.body.suppliers - Array of supplier names associated with the brand.
 * @param {string} req.body.status - The status of the brand.
 * @param {object} res - The response object.
 * @returns {Promise<object>} A Promise that resolves to the saved brand object.
 * @throws {Error} If there is an error saving the brand to the database.
 */
const brandAddService = async (req, res) => {
  const { name, email, website, location, suppliers, status } = req.body;

  const brandDB = new Brand({
    name,
    email,
    website,
    location,
    suppliers,
    status,
  });

  const saveBD = await brandDB.save();

  return { saveBD };
};

// product delete service
const brandUpdateService = async (req, res) => {
  const { brandId } = req.params;

  const { name, email, website, location, suppliers, status } = req.body;

  const findBrand = await Brand.findByIdAndUpdate(
    { _id: brandId },
    {
      $set: {
        name: name,
        email: email,
        website: website,
        location: location,
        suppliers: suppliers,
        status: status,
      },
    },
    { new: true }
  );
  return { findBrand };
};
module.exports = { brandAddService, brandUpdateService };
