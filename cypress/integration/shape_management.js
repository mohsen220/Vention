function validation(window,color,position,type){
  cy.window().should(window => {
    console.log(window.shapes);
    expect(shape).to.deep.include({
      options: {
        color: color,
        position: {
          x: position.x,
          y: position.y,
          z: position.z
        }
      },
      type: type
    });
});
}

describe('Functionality & Validation Testing', () => {
    beforeEach(() => {
      // Since the app is served on localhost:8080ß
      cy.visit('http://localhost:8080');
    });
  
    //Positive Test Cases
    it('Adding & Deleting 1 Sphere Object ', () => {
      // Fill the position and color inputs
      cy.get('#pos_x').clear().type('2');
      cy.get('#pos_y').clear().type('2');
      cy.get('#pos_z').clear().type('2');
      cy.get('#color').type("#000000");
  
      // Click the add sphere button
      cy.get('#add_sphere').click();

      // Validation 
      cy.window().should(win => {
        console.log(win.shapes);
        expect(win.shapes[0]).to.deep.include({
          options: {
            color: '#000000',
            position: {
              x: '2',
              y: '2',
              z: '2'
            }
          },
          type: 'sphere'
        });
      });

      //Validation using function 
      //validation(window,'#000000',{x:'2',y:'2',z:'2'},'sphere');

    cy.wait(5000);

    // Click the remove last button to delete the sphere
    cy.get('#remove_last').click();
    });

    it('Adding & Deleting 1 Cube Object', () => {
        // Fill the position and color inputs
        cy.get('#pos_x').clear().type('2');
        cy.get('#pos_y').clear().type('2');
        cy.get('#pos_z').clear().type('2');
        cy.get('#color').type("#000000");
    
        // Click the add cube button
        cy.get('#add_cube').click();

        // Validation
        cy.window().should(win => {
          console.log(win.shapes);
          expect(win.shapes[0]).to.deep.include({
            options: {
              color: '#000000',
              position: {
                x: '2',
                y: '2',
                z: '2'
              }
            },
            type: 'cube'
          });
      });
      cy.wait(5000);

      // Click the remove last button to delete the cube
      cy.get('#remove_last').click();
      });
  
    
    it('Creating Multiple Shapes and Removing All - Different Positions', () => {
        // Assuming there's already shapes present
        cy.get('#pos_x').clear().type('2');
        cy.get('#pos_y').clear().type('2');
        cy.get('#pos_z').clear().type('2');
        cy.get('#color').type("#000000");
        cy.get('#add_sphere').click();
        cy.wait(5000);

        cy.get('#pos_x').clear().type('3');
        cy.get('#pos_y').clear().type('3');
        cy.get('#pos_z').clear().type('3');
        cy.get('#color').type("#832020");
        cy.get('#add_cube').click();
        cy.wait(5000);

        cy.get('#pos_x').clear().type('4');
        cy.get('#pos_y').clear().type('4');
        cy.get('#pos_z').clear().type('4');
        cy.get('#color').type("#000000");
        cy.get('#add_sphere').click();
        cy.wait(5000);

        cy.get('#pos_x').clear().type('5');
        cy.get('#pos_y').clear().type('5');
        cy.get('#pos_z').clear().type('5');
        cy.get('#color').type("$000000"); 
        cy.get('#add_cube').click();
        cy.wait(5000);

        //Validation
        cy.window().should(win => {
          console.log(win.shapes);
          expect(win.shapes).to.have.length(4);
        });

        //Validate each element in the array
        cy.window().should(win => {
          console.log(win.shapes);
          expect(win.shapes[0]).to.deep.include({
            options: {
              color: '#000000',
              position: {
                x: '2',
                y: '2',
                z: '2'
              }
            },
            type: 'sphere'
          });
          expect(win.shapes[1]).to.deep.include({
            options: {
              color: '#000000',
              position: {
                x: '3',
                y: '3',
                z: '3'
              }
            },
            type: 'cube'
          });
          expect(win.shapes[2]).to.deep.include({
            options: {
              color: '#000000',
              position: {
                x: '4',
                y: '4',
                z: '4'
              }
            },
            type: 'sphere'
          });
          expect(win.shapes[3]).to.deep.include({
            options: {
              color: '#000000',
              position: {
                x: '5',
                y: '5',
                z: '5'
              }
            },
            type: 'cube'
          });
        })
      
        cy.get('#remove_all').click();
        cy.wait(5000);

        // Validation
        cy.window().should(win => {
          console.log(win.shapes);
          expect(win.shapes).to.be.empty;
        });

    });

    it('Creating Multiple Shapes and Removing All - Same Position', () => {
      cy.get('#pos_x').clear().type('2');
      cy.get('#pos_y').clear().type('2');
      cy.get('#pos_z').clear().type('2');
      cy.get('#color').type("#000000");
      cy.get('#add_sphere').click();
      cy.wait(5000);

      cy.get('#pos_x').clear().type('2');
      cy.get('#pos_y').clear().type('2');
      cy.get('#pos_z').clear().type('2');
      cy.get('#color').type("#000000");
      cy.get('#add_cube').click();
      cy.wait(5000);

      cy.get('#pos_x').clear().type('2');
      cy.get('#pos_y').clear().type('2');
      cy.get('#pos_z').clear().type('2');
      cy.get('#color').type("#000000");
      cy.get('#add_sphere').click();
      cy.wait(5000);

      cy.get('#pos_x').clear().type('2');
      cy.get('#pos_y').clear().type('2');
      cy.get('#pos_z').clear().type('2');
      cy.get('#color').type("#000000");
      cy.get('#add_cube').click();
      cy.wait(5000);

      //Validation
      cy.window().should(win => {
        console.log("Im at the validation step" + win.shapes);
        expect(win.shapes).to.have.length(4);
      });

      //Validate each element in the array
      cy.window().should(win => {
        console.log(win.shapes);
        expect(win.shapes[0]).to.deep.include({
          options: {
            color: '#000000',
            position: {
              x: '2',
              y: '2',
              z: '2'
            }
          },
          type: 'sphere'
        });
        expect(win.shapes[1]).to.deep.include({
          options: {
            color: '#000000',
            position: {
              x: '2',
              y: '2',
              z: '2'
            }
          },
          type: 'cube'
        });
        expect(win.shapes[2]).to.deep.include({
          options: {
            color: '#000000',
            position: {
              x: '2',
              y: '2',
              z: '2'
            }
          },
          type: 'sphere'
        });
        expect(win.shapes[3]).to.deep.include({
          options: {
            color: '#000000',
            position: {
              x: '2',
              y: '2',
              z: '2'
            }
          },
          type: 'cube'
        });
      });

      cy.get('#remove_all').click();
      cy.wait(5000);

      // Validation
      cy.window().should(win => {
        console.log(win.shapes);
        expect(win.shapes).to.be.empty;
      });
    });

    it('Handles window resize correctly', () => {
      // Trigger a window resize
      cy.viewport(800, 600); // Change viewport size
      cy.wait(5000);
    });
  })



















/* describe('Error Handling Testing', () => {
  beforeEach(() => {
    // Since the app is served on localhost:8080
    cy.visit('http://localhost:8080');
  });

  //Negative Test Cases - Color is invalid
  it('Adding 1 Sphere Object with invalid color', () => {
    // Fill the position and color inputs
    cy.get('#pos_x').clear().type('2');
    cy.get('#pos_y').clear().type('2');
    cy.get('#pos_z').clear().type('2');
    cy.get('#color').type("invalid");

    // Click the add sphere button
    cy.get('#add_sphere').click();

    // Validation 
    cy.window().should(win => {
      console.log(win.shapes);
      expect(win.shapes[0]).to.deep.include({
        options: {
          color: 'invalid',
          position: {
            x: '2',
            y: '2',
            z: '2'
          }
        },
        type: 'sphere'
      });
    });
  cy.wait(5000);
  })

  //Negative Test Cases - Position is invalid
  it('Adding 1 Sphere Object with invalid position', () => {
    // Fill the position and color inputs
    cy.get('#pos_x').clear().type('invalid');
    cy.get('#pos_y').clear().type('invalid');
    cy.get('#pos_z').clear().type('invalid');
    cy.get('#color').type("#000000");

    // Click the add sphere button
    cy.get('#add_sphere').click();

    // Validation 
    cy.window().should(win => {
      console.log(win.shapes);
      expect(win.shapes[0]).to.deep.include({
        options: {
          color: '#000000',
          position: {
            x: 'invalid',
            y: 'invalid',
            z: 'invalid'
          }
        },
        type: 'sphere'
      });
    });
  cy.wait(5000);
  })
});
*/




  