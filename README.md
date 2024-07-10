# User Management Application

## Description

This is a simple user management application built using React and TypeScript. The application displays a list of users fetched from a JSON API and allows you to view user details in a modal. Additionally, you can add, edit, and delete users. The application is styled using Tailwind CSS and is fully responsive. State management is handled using MobX, and unit tests are written with React Testing Library. The code follows best practices with ESLint and Prettier configurations.

## Features

1. **User Interface**: Built using React with Tailwind CSS for styling.
2. **Responsive Design**: Works on both desktop and mobile devices.
3. **Data Fetching**: Fetches JSON data from a REST API endpoint.
4. **State Management**: Centralized state management using MobX.
5. **CRUD Operations**: Add, edit, and delete users.
6. **Code Quality**: Configured with ESLint and Prettier for code quality and formatting.
7. **TypeScript**: Utilizes TypeScript with models, types, and interfaces.
8. **Unit Testing**: Performed with React Testing Library.
9. **README**: Detailed instructions and information provided.
10. **Deployment**: Application is deployed for live demo.

## Instructions

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fauzanmuhtadi/user-app.git
   cd user-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

### Running Tests

1. Run unit tests:
   ```bash
   npm test
   # or
   yarn test
   ```

### Building the Application

1. Build the application for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

### Formatting code by Prettier

1. Formatting:
   ```bash
   npm run format
   # or
   yarn format
   ```

### Ejecting the Application

1. Ejecting:

   ```bash
   npm run eject
   # or
   yarn eject
   ```

   **Note**: This action is irreversible. Ejecting the application will expose the configuration files (like Webpack, Babel, etc.) that are hidden by default in `create-react-app`. This allows for more customization but increases the complexity of managing the configuration. Only eject if you need to add custom configurations that are not supported by `create-react-app` out of the box.

### Deployment

The application is deployed and can be accessed at [Live Demo](https://fauzanmuhtadi.github.io/user-app).

## Additional Information

- **State Management**: This application uses MobX for state management. The state includes the user list and selected user details.
- **CRUD Operations**: The add, edit, and delete operations are implemented by updating the MobX state. These changes are immediately reflected in the UI.
- **Profile Pictures**: Random images from [Picsum](https://picsum.photos) are used as user profile pictures.
