# Movie database

## Description
This is a Movie database application that allows users to browse and search for movies, view movie details, add reviews, and save movies to a "watch-later" of "favorites" list. The application includes an administration section for managing movies, directors, and categories.

## Features
The Movie Database Application offers the following features:

### User Section
- Browse and search movies by title and category.
- View movie details including title, description, and an image.
- Add reviews to movies.
- Save movies to a "watch-later" or "favorites" list.
- User authentication with registration and login functionality.
- Responsive design optimized for both desktop and mobile resolutions.

### Administration Section
- Perform CRUD operations on movies, directors, and categories.
- Web interface for managing movies, directors, and categories.
- Restricted access to the administration section with user authentication.

## Installation and Setup
To set up the Movie Database Application, follow these steps:

1. Clone the repository: git clone https://gitlab.fi.muni.cz/xsidlovs/movie-database.
2. Install the required dependencies by running `npm install` in /movie-database/backend and /movie-database/frontend folders.
3. Configure the database connection in the application's configuration file.
4. Run the database migrations and seed the initial data by running `npm run seed` in /movie-database/backend.
5. Start the application by running `npm run start` in /movie-database/backend folder and `npm run dev` in /movie-database/frontend folder.
6. Access the application in your web browser at http://localhost:4000.

## Technologies Used
The Movie Database Application is built using the following technologies:

- Backend: TypeScript, Express, Prisma ORM
- Frontend: CSS, TypeScript, React, React Query, React Router
- Database: PostgreSQL


## Credit
This project was developed by **Štefan Šidlovský**, **Veronika Lenková**, **Lucia Bušniaková** and **Tamara Jadušová** as a final project for course PB138 Modern markup languages at FI MUNI.




