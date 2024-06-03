import "@percy/cypress";

function validateShape(shape, color, position, type) {
  expect(shape).to.deep.include({
    options: {
      color: color,
      position: {
        x: position.x,
        y: position.y,
        z: position.z,
      },
    },
    type: type,
  });
}

function addShape(x, y, z, color, shapeType) {
  cy.get("#pos_x").clear().type(x);
  cy.get("#pos_y").clear().type(y);
  cy.get("#pos_z").clear().type(z);
  cy.get("#color").invoke("val", color).trigger("change");

  if (shapeType === "sphere") {
    cy.get("#add_sphere").click();
  } else if (shapeType === "cube") {
    cy.get("#add_cube").click();
  }
  cy.wait(2000);
}

function canvasToImage(selectorOrEl) {
  let canvas =
    typeof selectorOrEl === "object"
      ? selectorOrEl
      : document.querySelector(selector);
  let image = document.createElement("img");
  let canvasImageBase64 = canvas.toDataURL();
  cy.wait(5000);

  image.src = canvasImageBase64;
  image.style = "max-width: 100%";
  canvas.setAttribute("data-percy-modified", true);
  canvas.parentElement.appendChild(image);
  canvas.style = "display: none";
}

document
  .querySelectorAll("canvas")
  .forEach((selector) => canvasToImage(selector));

describe("Functionality & Validation Testing", () => {
  beforeEach(() => {
    // Since the app is served on localhost:8080ß
    cy.visit("http://localhost:8080");
  });

  //Positive Test Cases
  it("Adding & Deleting 1 Sphere Object ", () => {
    // Fill the position and color inputs
    addShape("2", "2", "2", "#000000", "sphere");

    // Validate the shape
    cy.window().should((win) => {
      validateShape(
        win.shapes[0],
        "#000000",
        { x: "2", y: "2", z: "2" },
        "sphere"
      );
    });

    cy.wait(2000);
    cy.get("#remove_last").click();
  });

  it("Adding & Deleting 1 Cube Object", () => {
    // Fill the position and color inputs
    addShape("2", "2", "2", "#000000", "cube");

    //Validation Using the validateShape function
    cy.window().should((win) => {
      validateShape(
        win.shapes[0],
        "#000000",
        { x: "2", y: "2", z: "2" },
        "cube"
      );
    });

    // Click the remove last button to delete the cube
    cy.get("#remove_last").click();

    //validation after removal
    cy.window().should((win) => {
      expect(win.shapes).to.be.empty;
    });
  });

  it("Creating Multiple Shapes and Removing All - Different Positions - Same Dimentional Coordinates", () => {
    // Assuming there's already shapes present
    addShape("2", "2", "2", "#000000", "sphere");
    addShape("3", "3", "3", "#832020", "cube");
    addShape("4", "4", "4", "#000000", "sphere");
    addShape("5", "5", "5", "#832020", "cube");
    //Validation
    cy.window().should((win) => {
      console.log(win.shapes);
      expect(win.shapes).to.have.length(4);
    });

    //Validation
    cy.window().should((win) => {
      validateShape(
        win.shapes[0],
        "#000000",
        { x: "2", y: "2", z: "2" },
        "sphere"
      );
      validateShape(
        win.shapes[1],
        "#832020",
        { x: "3", y: "3", z: "3" },
        "cube"
      );
      validateShape(
        win.shapes[2],
        "#000000",
        { x: "4", y: "4", z: "4" },
        "sphere"
      );
      validateShape(
        win.shapes[3],
        "#832020",
        { x: "5", y: "5", z: "5" },
        "cube"
      );
    });

    cy.get("#remove_all").click();
    cy.wait(2000);

    // Validation
    cy.window().should((win) => {
      console.log(win.shapes);
      expect(win.shapes).to.be.empty;
    });
  });

  it("Creating Multiple Shapes and Removing All - Same Position - Same Dimentional Coordinates", () => {
    //add using ad shape function
    addShape("2", "2", "2", "#000000", "sphere");
    addShape("2", "2", "2", "#000000", "cube");
    addShape("2", "2", "2", "#000000", "sphere");
    addShape("2", "2", "2", "#000000", "cube");

    //Validation
    cy.window().should((win) => {
      expect(win.shapes).to.have.length(4);
    });

    // Validation using validate shapre function
    cy.window().should((win) => {
      validateShape(
        win.shapes[0],
        "#000000",
        { x: "2", y: "2", z: "2" },
        "sphere"
      );
      validateShape(
        win.shapes[1],
        "#000000",
        { x: "2", y: "2", z: "2" },
        "cube"
      );
      validateShape(
        win.shapes[2],
        "#000000",
        { x: "2", y: "2", z: "2" },
        "sphere"
      );
      validateShape(
        win.shapes[3],
        "#000000",
        { x: "2", y: "2", z: "2" },
        "cube"
      );
    });

    cy.get("#remove_all").click();
    cy.wait(2000);

    // Validation
    cy.window().should((win) => {
      console.log(win.shapes);
      expect(win.shapes).to.be.empty;
    });
  });

  //create shapes with negatives positions
  it("Adding 1 Sphere Object & 1 Cube Object with Negative Position Coordinates ", () => {
    // Fill the position and color inputs
    addShape("-2", "-2", "-2", "#000000", "sphere");
    addShape("-4", "-4", "-4", "#832020", "cube");

    //Validation using the validateShape function
    cy.window().should((win) => {
      validateShape(
        win.shapes[0],
        "#000000",
        { x: "-2", y: "-2", z: "-2" },
        "sphere"
      );

      validateShape(
        win.shapes[1],
        "#832020",
        { x: "-4", y: "-4", z: "-4" },
        "cube"
      );
    });

    // Remove all shapes
    cy.get("#remove_all").click();

    // Validation
    cy.window().should((win) => {
      expect(win.shapes).to.be.empty;
    });
  });

  //Add 1 Cube and 1 Sphere with different positions (coordinates wise)
  it("Adding 1 Sphere Object & 1 Cube Object - Different Dimentional Coordinates", () => {
    // Fill the position and color inputs
    addShape("2", "3", "4", "#000000", "sphere");
    addShape("5", "6", "7", "#832020", "cube");

    // Validation using validateShape function
    cy.window().should((win) => {
      validateShape(
        win.shapes[0],
        "#000000",
        { x: "2", y: "3", z: "4" },
        "sphere"
      );

      validateShape(
        win.shapes[1],
        "#832020",
        { x: "5", y: "6", z: "7" },
        "cube"
      );
    });

    // Remove all shapes
    cy.get("#remove_all").click();
    cy.wait(2000);

    // Validation
    cy.window().should((win) => {
      expect(win.shapes).to.be.empty;
    });
  });

  //Add 1 Cube and 1 Sphere with positive and negative coordinates, use different colors
  it("Adding 1 Sphere Object & 1 Cube Object with different (sign) coordinates  and colors", () => {
    // Fill the position and color inputs
    addShape("2", "-3", "4", "#000000", "sphere");
    addShape("-5", "6", "-7", "#832020", "cube");

    // Validation use validateShape function
    cy.window().should((win) => {
      validateShape(
        win.shapes[0],
        "#000000",
        { x: "2", y: "-3", z: "4" },
        "sphere"
      );

      validateShape(
        win.shapes[1],
        "#832020",
        { x: "-5", y: "6", z: "-7" },
        "cube"
      );
    });

    // Remove all shapes
    cy.get("#remove_all").click();
    cy.wait(2000);

    // Validation
    cy.window().should((win) => {
      expect(win.shapes).to.be.empty;
    });
  });

  it("Adding 1 Sphere Object & 1 Cube Object with different colors and removing one by one", () => {
    // Fill the position and color inputs
    addShape("2", "3", "4", "#000000", "sphere");
    addShape("5", "6", "7", "#832020", "cube");

    // Validation using validateShape function
    cy.window().should((win) => {
      validateShape(
        win.shapes[0],
        "#000000",
        { x: "2", y: "3", z: "4" },
        "sphere"
      );

      validateShape(
        win.shapes[1],
        "#832020",
        { x: "5", y: "6", z: "7" },
        "cube"
      );
    });

    // Remove the last shape
    cy.get("#remove_last").click();
    cy.wait(2000);

    // Validation
    cy.window().should((win) => {
      expect(win.shapes).to.have.length(1);
      validateShape(
        win.shapes[0],
        "#000000",
        { x: "2", y: "3", z: "4" },
        "sphere"
      );
    });

    // Remove the last shape
    cy.get("#remove_last").click();
    cy.wait(2000);

    // Validation
    cy.window().should((win) => {
      expect(win.shapes).to.be.empty;
    });
  });

  describe("3D Object Interaction Test", () => {
    it("adds and interacts with a 3D sphere", () => {
      // Specify the coordinates where the object is located on the canvas
      let x = 2; // X-coordinate
      let y = 2; // Y-coordinate
      let z = 2; // Z-coordinate

      // Assuming addShape is defined globally or accessible in this context
      addShape(x, y, z, "#000000", "sphere");
      cy.wait(2000); // Wait for the shape to be fully added and rendered

      // Simulate the click on the canvas
      // Coordinates for the initial mousedown event
      const startX = 15;
      const startY = 10;

      // Coordinates for the mousemove and mouseup events, simulating the drag
      const endX = 7;
      const endY = 8;

      // Get the canvas and simulate the click and drag
      cy.get("canvas")
        .trigger("mousedown", { button: 0, clientX: startX, clientY: startY })
        .trigger("mousemove", { clientX: endX, clientY: endY })
        .trigger("mouseup", { clientX: endX, clientY: endY });
    });
  });

  it("Handles window resize correctly", () => {
    // Trigger a window resize
    cy.viewport(800, 600); // Change viewport size
    cy.wait(2000);
  });
});

describe("UI Testing", () => {
  beforeEach(() => {
    // Since the app is served on localhost:8080
    cy.visit("http://localhost:8080");
  });

  it("Should render the Shape Correctly", () => {
    // Fill the position and color inputs
    addShape("2", "2", "2", "#000000", "sphere");
    cy.wait(5000);

    cy.canvasToImage();
    cy.wait(2000);
    // Take a snapshot for visual testing
    cy.percySnapshot("Page after converting canvas to images");
  });
});

describe("Error Handling Testing", () => {
  beforeEach(() => {
    // Since the app is served on localhost:8080
    cy.visit("http://localhost:8080");
  });

  //Negative Test Cases - Position is invalid
  it("Adding 1 Sphere Object with invalid position - String", () => {
    // Fill the position and color inputs
    addShape("invalid", "invalid", "invalid", "#000000", "sphere");

    //Validation using funciton
    cy.window().should((win) => {
      validateShape(
        win.shapes[0],
        "#000000",
        { x: "", y: "", z: "" },
        "sphere"
      );
    });
  });

  //Negative Test Cases - Position is invalid - Special Characters
  it("Adding 1 Sphere Object with invalid position - Special Characters", () => {
    // Fill the position and color inputs
    addShape("@#", "@#", "@#", "#000000", "sphere");

    // validation with function
    cy.window().should((win) => {
      validateShape(
        win.shapes[0],
        "#000000",
        { x: "", y: "", z: "" },
        "sphere"
      );
    });
  });
});

