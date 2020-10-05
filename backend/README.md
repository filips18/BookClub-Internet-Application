The backend part was done using _Express.js_, and split up into several folders. 

The folder called **models** includes all the schemas defined with Mongoose since I used it to interact with my Mongo database.

The folder called **routes** includes the rest of the backend code, including all the functions for interacting with the database collections using routes through express's router. Part of the file has the necessary functions needed to implement some parts of this project, such as sending an email to reset an user's password, uploading a file to use as a user's profile picture/book's title picture and also the code used for implementing the _captcha_ feature used in user registration.

The **index.js** file is used to establish middleware usage and a connection to the Mongo database. It also starts the backend code on a given port, which by default is 3000.
