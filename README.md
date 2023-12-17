# SAML Authentication with Express and Passport

This project demonstrates SAML authentication using Express.js and Passport.js with the SAML strategy.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)

## Introduction

This project showcases a simple web application using Express.js, Passport.js, and the SAML strategy for authentication. It allows users to log in using SAML authentication and displays a home page with a logout option upon successful authentication.

## Features

- SAML authentication using Passport.js
- Home page with user's welcome message and logout option

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/barath-sk17/SAML_IAM.git

2. Install dependencies:

   ```bash
   npm install

3. Configure SAML settings:

Edit the SAML settings in app.js to match your SAML provider's details.

4. Run the application:

   ```bash
   npm start

## Usage
Visit http://localhost:3000 in your web browser.
Click on the "Login" button to initiate the SAML authentication process.
Upon successful authentication, you will be redirected to the home page.
The home page displays a welcome message with your username and a "Logout" button.

## Dependencies
- Express.js
- Passport.js
- passport-saml

