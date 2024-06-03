# Project Name 🌟

## About The Project 📘

This project demonstrates a modern application architecture with automated provisioning using Terraform on AWS, robust integration testing with Cypress, and CI/CD workflows managed through GitHub Actions. It is designed to provide a reliable, scalable, and automated deployment pipeline.

## Features 🌟

- **AWS Infrastructure**: Managed through Terraform for reproducible and consistent environments.
- **Integration Testing**: Powered by Cypress to ensure the highest quality of code.
- **Continuous Integration & Deployment**: Fully automated using GitHub Actions.

## Prerequisites 🔍

Before starting, make sure you have the following tools installed:
- Node.js (v14.x or above)
- npm (v6.x or above) or Yarn
- AWS CLI (configured with administrator access)
- Terraform (v0.14.x or above)
- Cypress 
- Percy 

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1. **Clone the repo**
   ```sh
   git clone https://github.com/your-username/your-project-name.git
   cd your-project-name

2. **Run Application**
   ```sh
   npm run dev

3. **Run Testing suite**
   ```sh
   npx cypress open

4. **Run Testing Suite With Percy Integration**
   ```sh
   npx percy exec -- cypress run  

# Testing Strategy Summary

Below is a table summarizing the test cases, their actions, and the expected outcomes for our application's functionality and validation testing.

## Functionality & Validation Testing
| Test Case Description                                           | Action                                                  | Expected Outcome                                                   |
|-----------------------------------------------------------------|---------------------------------------------------------|--------------------------------------------------------------------|
| **Adding & Deleting 1 Sphere Object**                           | Add a sphere, validate, and delete                      | Shape added and removed correctly, validate shape attributes       |
| **Adding & Deleting 1 Cube Object**                             | Add a cube, validate, and delete                        | Shape added and removed correctly, validate shape attributes       |
| **Creating Multiple Shapes and Removing All**                   | Add multiple shapes, validate, and remove all           | Shapes added and all removed correctly, validate each shape        |
| **Adding Sphere & Cube with Negative Position Coordinates**     | Add shapes with negative coordinates, validate, and remove all | Negative coordinates handled correctly, shapes validated and removed |
| **Adding Shapes with Same & Different Dimensional Coordinates** | Add shapes at different coordinates, validate, and remove all | Validate positioning and attributes of each shape, remove all shapes correctly |
| **Adding Shapes with Different Colors**                         | Add shapes with different colors, validate, and remove one by one | Colors applied correctly, each shape validated and removed sequentially |

## UI Testing
| Test Case Description                             | Action                               | Expected Outcome                                    |
|---------------------------------------------------|--------------------------------------|-----------------------------------------------------|
| **UI Testing - Shape Rendering**                  | Render a shape, convert canvas to image, snapshot | Correct rendering, image visible, snapshot captured |

## Error Handling
| Test Case Description                             | Action                                   | Expected Outcome                                    |
|---------------------------------------------------|------------------------------------------|-----------------------------------------------------|
| **Error Handling - Invalid Position (String)** :x:          | Add a sphere with string positions, validate | Handle invalid input gracefully, validate error or lack of shape creation |
| **Error Handling - Invalid Position (Special Characters)** :interrobang: | Add a sphere with special characters as positions, validate | Handle invalid input gracefully, validate error or lack of shape creation |

## AWS Infrastructure Overview

This diagram provides an overview of the AWS setup for the project, including the Route 53 DNS zone, EC2 instance, security group, key pair, and IAM user.

```plaintext
AWS Infrastructure Overview
===========================

                     +---------------------+
                     |   Route 53 Zone     |
                     |   (venti-on.com)    |
                     +---------+-----------+
                               |
                               v
                     +---------+-----------+
                     |    EC2 Instance      |
                     | (MyVentionInstance)  |
                     +---------+-----------+
                               |
                               v
                     +---------+-----------+
                     | Security Group      |
                     | (my_security_group) |
                     +---------+-----------+
                               |
                               v
                 +-------------+---------------+
                 |   Inbound Traffic Rules     |
                 |   (Ports 22, 80, 8080)      |
                 +-------------+---------------+
                               |
                               v
                     +---------+-----------+
                     |   Key Pair           |
                     |  (VentionKey)        |
                     +---------+-----------+
                               |
                               v
                     +---------+-----------+
                     | IAM User             |
                     | (ventionuser)        |
                     +---------------------+


```
### Components

- **Route 53 DNS Zone**: Manages the domain `venti-on.com`.
- **EC2 Instance**: An instance named `MyVentionInstance` running in the `us-east-2` region.
- **Security Group**: Named `my_security_group`, allowing inbound traffic on ports 22 (SSH), 80 (HTTP), and 8080 (Custom).
- **Key Pair**: `VentionKey`, used for secure SSH access to the EC2 instance.
- **IAM User**: `ventionuser`, with permissions to manage the above resources.


