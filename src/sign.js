module.exports = async (pdfBytes) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
  
    // Iterate through each page
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
      const page = pdfDoc.getPage(i);
  
      // Add text to the page (in this case, a simple signature)
      const { width, height } = page.getSize();
      const fontSize = 30;
      page.drawText('Your Signature Here', {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        color: rgb(0, 0.53, 0.71),
      });
    }
  
    // Save the modified PDF
    return pdfDoc.save();
  };