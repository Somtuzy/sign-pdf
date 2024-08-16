const cloudinary = require('cloudinary').v2;
const axios = require('axios')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports.fetchPdfFromCloudinary = async (secureUrl) => {
    const response = await axios.get(secureUrl, { responseType: 'arraybuffer' });
    return response.data;
  };
  
module.exports.deletePdfFromCloudinary = async (publicId) => {
    return cloudinary.uploader.destroy(publicId);
  };
  
module.exports.uploadPdfToCloudinary = async (pdfBytes) => {
    const cloudinaryUploadResult = await cloudinary.uploader.upload(pdfBytes, {
      resource_type: 'raw',
    });
  
    return cloudinaryUploadResult;
};