# Momentum

Momentum is a task management application designed to streamline your life with the elegance of organization. It turns your tasks into daily achievements, catapulting your productivity to new heights.

# Table of Contents

- [Momentum](#momentum)
- [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

## Technologies Used

- [Vue.js](https://vuejs.org/) for frontend development
- [Vite](https://vitejs.dev/) for building the frontend
- [TypeScript](https://www.typescriptlang.org/) for static typing
- [Node.js](https://nodejs.org/) for backend development
- [Fastify](https://www.fastify.io/) for the backend server
- [Mongoose](https://mongoosejs.com/) for MongoDB object modeling
- [Docker](https://www.docker.com/) for containerization and deployment

## Project Structure

The project is divided into two main packages:

- `backend`: Contains the server-side code
- `frontend`: Contains the client-side code

## Getting Started

### Prerequisites

- Node.js
- npm
- Docker (optional)

### Installation

This application is using **NPM workspaces** to manage the frontend and backend packages.

To get started, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/anthonypillot/momentum.git
```

2. Install the dependencies for both the frontend and backend:

```sh
npm install
```

3. Create a `.env` file in the `backend` directory with the following content:

```sh
MONGODB_URI=mongodb://momentum:password@localhost:27017
```

4. Start the frontend and backend:

```sh
npm run dev
```

1. Open [http://localhost:5173](http://localhost:5173) to view the frontend in your browser.
