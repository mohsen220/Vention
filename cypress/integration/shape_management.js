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
    cy.get("#pos_x").clear().type("2");
    cy.get("#pos_y").clear().type("2");
    cy.get("#pos_z").clear().type("2");
    cy.get("#color").type("#000000");

    // Click the add sphere button
    cy.get("#add_sphere").click();
    cy.wait(5000);

    // Take a snanpshotf
    cy.percySnapshot("Sphere Shape");
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

