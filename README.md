# Story_Digital
REST APIs in nodejs

## PROJECT EXECUTION SETUP
1) git clone the project from the repository online 
(link - https://github.com/supro99/Story_Digital.git)
2) Enter your MongoDB database connection string in config(folder) > config.js(file) > database_url(variable)
3) To get required module to run the project > npm install (if failed to execute, try -> sudo npm install)
4) To start the nodejs server > npm start

	

## DATABASE ARCHITECTURE
1) Mongodb is used to store, retrieve and manipulate the data.

2) Only one database is created, named as - 'story-digital-db'

3) This DB has two collections called as 'users' and 'blogs' collections.
    These collection has all the user and blogs(posts) related data and all the operations are performed on this data.


## PROJECT ARCHITECTURE
Technology used for the project - Node.js, Express.js, MongoDB

1) This project uses ES6 syntax of javascript.

2) All the routes are in "routes" folder inside "users.js" file. You can navigate to each function from here.

3) All the business logic is written in "services" folder inside the "userServices.js" file.

4) Middleware to authenticated and verify JWT token is written in "auth" folder inside "verifyToken.js" file

5) All the constants/configuration strings are inside the config folder, such as database connection url, database name, some key secrets (not to be written in config file but to be placed in .env variable for security and privacy purpose)


## API DOCUMENTATION
This project has following API endpoints

A Middleware authentication mechanism is established before all APIs execution, except while registering new user and login existing user, to check if the user who is requesting the resources is valid user or not. 
This can be found in 'authentication' folder in verifyToken.js file.

1)API for user Registration (SignUp)
		curl --location --request POST 'localhost:3000/users/signup' \
		--header 'Content-Type: application/json' \
		--header 'Cookie:cookieName=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ4Nzk3ZGY4ZTgwM2JmYzU1MTBiMiIsImlhdCI6MTYxOTg4ODA0OSwiZXhwIjoxNjE5OTc0NDQ5fQ.DiYoaQ48R-nP6HZd2JrQpue_8MqdyXFWMcxYAlEAt8I' \	--data-raw '{  "userName" : "Reena Vargis",  "mobile"  : 9494563246, "email" :"reena@gmail.com",  "password" : "Reena@39"}'



2)API for user LogIn
		curl --location --request POST 'localhost:3000/users/login' \
		--header 'Content-Type: application/json' \
		--header 'Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ4ODllZGY4ZTgwM2JmYzU1MTBiNCIsImlhdCI6MTYxOTg4ODI5OSwiZXhwIjoxNjE5OTc0Njk5fQ.PPGflDEyjHIyBb0nOcN0ynaDBxdvT4ugI0VdvzTILS8; cookieName=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ4ODllZGY4ZTgwM2JmYzU1MTBiNCIsImlhdCI6MTYxOTg4ODI5OSwiZXhwIjoxNjE5OTc0Njk5fQ.PPGflDEyjHIyBb0nOcN0ynaDBxdvT4ugI0VdvzTILS8' \--data-raw '{"email" :"reena@gmail.com",  "password" : "Reena@39"}'

3)API for Creating a Post
		curl --location --request POST 'localhost:3000/users/' \
		--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ4Nzk3ZGY4ZTgwM2JmYzU1MTBiMiIsImlhdCI6MTYxOTg4ODA0OSwiZXhwIjoxNjE5OTc0NDQ5fQ.DiYoaQ48R-nP6HZd2JrQpue_8MqdyXFWMcxYAlEAt8I' \--header 'Content-Type: application/json' \--header 'Cookie: cookieName=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ4Nzk3ZGY4ZTgwM2JmYzU1MTBiMiIsImlhdCI6MTYxOTg4ODA0OSwiZXhwIjoxNjE5OTc0NDQ5fQ.DiYoaQ48R-nP6HZd2JrQpue_8MqdyXFWMcxYAlEAt8I' \--data-raw '{ "title" : "Impact on Environment","createdBy" : "608d8797df8e803bfc5510b2","date" : "12/3/2020","detailedText" : "There is now growing consensus around a key finding first published by the IPCC in 2018: the world needs to reach net-zero carbon dioxide emissions by mid-century to meet the 1.5° C temperature target of the Paris Agreement, something which will require transformational changes across energy and transport systems, industrial technologies and processes, and lifestyles."
}'

4)API for Getting all the posts 
		curl --location --request GET 'localhost:3000/users/' \
		--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQxMjNlMjk3MjY1MTU1Y2ZiM2Y3OSIsImlhdCI6MTYxOTg3MDA3NSwiZXhwIjoxNjE5OTU2NDc1fQ.WZ8sJwmHcooFs3vshTLb87TWZRFTdto8DU7neSd_O98' \--header 'Cookie: cookieName=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQxMjNlMjk3MjY1MTU1Y2ZiM2Y3OSIsImlhdCI6MTYxOTg4NzczMiwiZXhwIjoxNjE5OTc0MTMyfQ.qrg78lFra1VfkfGOG249U52qIqUfWzS3zHWumyWd89I'


5)API for Deleting a post (Only the authenticate user can delete the post own by/created by him)
		curl --location --request DELETE 'localhost:3000/users/' \
		--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ4ODllZGY4ZTgwM2JmYzU1MTBiNCIsImlhdCI6MTYxOTg4ODI5OSwiZXhwIjoxNjE5OTc0Njk5fQ.PPGflDEyjHIyBb0nOcN0ynaDBxdvT4ugI0VdvzTILS8' \--header 'Content-Type: application/json' \--header 'Cookie: cookieName=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGQ4ODllZGY4ZTgwM2JmYzU1MTBiNCIsImlhdCI6MTYxOTg4ODI5OSwiZXhwIjoxNjE5OTc0Njk5fQ.PPGflDEyjHIyBb0nOcN0ynaDBxdvT4ugI0VdvzTILS8' \--data-raw '{  "postId" : "608d88ebdf8e803bfc5510b5"}'

