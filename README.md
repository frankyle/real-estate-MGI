# Real Estate MGI Project

This repository contains the source code for the Real Estate MGI project.

## 8.New Feature: User Lists and Navigation

- Added functionality for users to view their trip list, wish list, and reservation list in separate pages.
- Users can add properties to their wish list by clicking the like button, and remove them by clicking again.
- Users can navigate to the property list page from the main page.

## 7.New Feature: Estate Details and Booking

- Added functionality for users to view details of selected estates.
- Users can view all available pictures and details posted by the host.
- Implemented booking functionality, allowing users to select dates for booking.

## 6.New Feature: Home Page Listing and Card View

- Added listing of categories on the home page: When a new user enters the home page, they will see all the categories available to select.
- Implemented card view of all estates: Users can see a card view of all the estates added by hosts. The cards include navigation arrows allowing users to navigate left and right.

## 5.New Feature: CreatingList Page

- Implemented CreatingList page which can be accessed from the "Become a Host" link at the top of the navigation bar.
- Various functionalities have been implemented within this page:

    - **Single Item Selection**: Users can select single items which are related to them specifically.
    - **Auto Form Input for Location**: Location input is automatically filled based on user input.
    - **Math Counters**: Counters are used for numerical inputs, which are updated in the database.
    - **Multiple Selections**: Users can make multiple selections which are updated in the database with relation to the user.
    - **Uploading Multiple Pictures**: Users can upload multiple pictures at once. Items can be added or removed before final submission.
    - **Drag and Drop Positioning**: Drag and drop functionality is implemented for positioning items, although there may be an issue with the draggable ID "photo".
    - **Normal Form Inputs**: Users can input data through standard form inputs.
    - **Money Counter**: Counter is provided for increasing money, which is updated in the database.
    - **Submitting Data to Backend**: All data entered by the user is submitted to the backend.

## 4.New Feature: Slide Hero and Categories

- Added slide-hero feature to showcase important information or images.
- Implemented categories feature to categorize items or content.

## 3.New Feature: Login Page and Redux Integration

- Implemented a login page for registered users.
- Integrated Redux Toolkit for state management.

## 2.New Feature: Backend User Registration

- Implemented backend routes and models for user registration.
- Connected backend to MongoDB for storing user information.

## 1. New Feature: Register Page

- Added a register page to allow users to create accounts.
- Installed server dependencies required for development.

## How to Use

1. Clone the repository.
2. Install dependencies (`npm install` or `yarn install`).
3. Run the server (`npm start` or `yarn start`).

## Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.
