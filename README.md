# Role-Based Dashboard

This project is a React + Redux application built as an interview assessment. It demonstrates a role-based login and dashboard system with protected routes and state management using Redux Toolkit.

## Features

- **Role-Based Access Control**: Three distinct user roles (Admin, Merchant, Member) with dedicated login pages and dashboards.
- **Authentication**: Secure login system using fake tokens stored in `localStorage`.
- **Protected Routes**: Client-side route protection to ensure only authenticated users can access their respective dashboards.
- **Redux State Management**: Centralized state management for authentication, user roles, and dummy data using Redux Toolkit.
- **Admin Dashboard**:
  - View and manage a table of users and merchants.
  - Approve or delete users and merchants.
- **Merchant Dashboard**:
  - Approve purchase requests.
  - Look up customer information.
  - Set a contribution rate.
  - View notifications.
- **Member Dashboard**:
  - View a summary of points.
- **Logout**: Clear the authentication token from `localStorage` and reset the Redux state.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for modern web projects.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development.
- **React Router**: The standard library for routing in React.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **shadcn/ui**: A collection of re-usable components built using Radix UI and Tailwind CSS.
- **Zod**: A TypeScript-first schema declaration and validation library.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/role-based-dashboard.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd role-based-dashboard
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## Usage

To start the development server, run the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
.
├── public
└── src
    ├── assets
    ├── components
    │   ├── layout
    │   └── ui
    ├── features
    │   ├── auth
    │   └── data
    ├── hooks
    ├── lib
    ├── pages
    │   ├── auth
    │   └── dashboard
    ├── routes
    ├── store
    └── utils
```

## Deployment

This project is deployed on Vercel. You can view the live demo here:

## License

This project is licensed under the MIT License.
