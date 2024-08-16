const express = require('express')
const fs = require('fs')
const multer = require('multer');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const signPdf = require('./sign')
const { fetchPdfFromCloudinary, uploadPdfToCloudinary, deletePdfFromCloudinary } = require('./cloudinary')
const app = express()

const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/uploads`)
    }
});
const upload = multer({ storage: storage });

app.post('/upload-pdf', upload.single('pdf'), async (req, res) => {
    try {
        console.log(req.file);
        // const file = await uploadPdfToCloudinary(req.file.buffer)
        // console.log(file);

        // return res.status(201).json({
        //     file
        // })
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

app.post('/process-pdf', async (req, res) => {
    try {
      const originalPdfSecureUrl = 'https://res.cloudinary.com/dzukycark/raw/upload/v1705700678/vtbu1dkdxnecmoulqce2';
      const originalPdfBytes = await fetchPdfFromCloudinary(originalPdfSecureUrl);
  
      // Sign the PDF
      const signedPdfBytes = await signPdf(originalPdfBytes);
  
      // Delete the original PDF from Cloudinary
      const originalPdfPublicId = 'ORIGINAL_PDF_PUBLIC_ID';
      await deletePdfFromCloudinary(originalPdfPublicId);
  
      // Upload the signed PDF to Cloudinary
      const signedPdf = await uploadPdfToCloudinary(signedPdfBytes);
  
      // Send the signed PDF's secure URL as a response
      res.status(200).json({ signedPdf });
    } catch (error) {
      console.error('Error processing PDF:', error);
      res.status(500).send('Internal Server Error');
    }
});  

app.listen(3000, () => {
    console.log('heyyyyyyy');
})