Cypress.Commands.add("canvasToImage", () => {
  cy.document().then((doc) => {
    const canvases = doc.querySelectorAll("canvas");
    if (canvases.length === 0) {
      console.log("No canvases found");
    } else {
      console.log(`Found ${canvases.length} canvas elements`);
    }
    canvases.forEach((canvas, index) => {
      let image = doc.createElement("img");
      let canvasImageBase64 = canvas.toDataURL("image/png");

      image.onload = () => {
        console.log(`Image ${index} loaded`);
        image.style = "max-width: 100%;";
        canvas.parentElement.insertBefore(image, canvas.nextSibling);
        canvas.style.display = "none";
      };

      image.src = canvasImageBase64;
      console.log(`Image ${index} source set`);
    });
  });
});
