import "cypress-downloadfile/lib/downloadFileCommand";

Cypress.Commands.add("canvasToImage", (selectorOrEl) => {
  cy.document().then((doc) => {
    const canvasToImage = (selectorOrEl) => {
      let canvas =
        typeof selectorOrEl === "object"
          ? selectorOrEl
          : doc.querySelector(selectorOrEl);
      let canvasImageBase64 = canvas.toDataURL("image/png");

      // This will create a link and download the image
      const link = doc.createElement("a");
      link.href = canvasImageBase64;
      link.download = "canvas-image.png"; // Specify the download name here
      link.click();
    };

    doc.querySelectorAll("canvas").forEach((canvas) => canvasToImage(canvas));
  });
});
