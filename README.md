# MonVieuxGrimoire - Book Collections and Rating App

MonVieuxGrimoire is a full-stack application designed to manage book collections and ratings. The project involved creating a back-end system that integrates with an existing front-end to deliver a seamless user experience. Users can browse a catalog of books, add new entries, delete unwanted ones, and rate books. The foundation of the API was guided by a pre-defined API specification document.

The back-end was built using Node.js and the Express framework, with MongoDB as the database, connected through Mongoose. CRUD operations for books were implemented via structured data models, middleware, controllers, and routes. Secure user authentication, including signup and login functionality, was achieved through encryption and token-based authentication.

## Overview

### The challenge

Users should be able to:

- Sign up and log in to the app
- View a list of books
- See detailed information and ratings for each book
- View the top 3 highest-rated books
- Add a new book to the collection
- Rate books

### Links

- Live Site URL: [See the live page here](https://book-app-frontend-three.vercel.app/)
- Frontend Repository: [Forked frontend used in this project](https://github.com/Kasia307584/mon_vieux_grimoire-book-app--frontend)

## My process

### Built with

- **Node.js** - for building the server
- **Express** - as the web framework
- **MongoDB** - for storing data
- **Mongoose** - for handling data models and database operations
- **REST API** - for connecting the front-end and back-end
- **Vercel** - for deploying and hosting the application

### What I learned

- Set up a Node.js server with the Express framework
- Configure and managing a cloud-hosted MongoDB Atlas database
- Connect the database to the server using Mongoose
- Create an API with full CRUD functionality
- Utilize middleware in Express to handle API requests
- Design and manage data models with Mongoose
- Understand how back-end routing works, execute middleware and controllers in sequence
- Handle image uploads and optimization using `Multer` and `Sharp`
- Implement secure user authentication with `JSON Web Tokens` (`JWT`) and `Bcrypt` for password encryption
- Deploy a full-stack application to Vercel for live hosting

### Continued development

- Ensure the login functionality works on the deployed version of the application
