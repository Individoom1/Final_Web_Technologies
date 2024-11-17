# Final_Web_Technologies
My web technologies final project.
My project is a portfolio platform where users can register and log in to create, edit, and delete their portfolios.

To begin, you need to initialize the project with npm init -y, then install all the necessary dependencies:

"bcrypt": "^5.1.1",
"body-parser": "^1.20.3",
"chart.js": "^4.4.6",
"cookie-parser": "^1.4.7",
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"ejs": "^3.1.10",
"express": "^4.21.1",
"express-session": "^1.18.1",
"jsonwebtoken": "^9.0.2",
"mongodb": "^6.10.0",
"mongoose": "^8.8.1",
"nodemailer": "^6.9.16",
"nodemon": "^3.1.7"

Next, create a .env file where you will place the MongoDB connection string and the port:

MONGO_URI=mongodb+srv://Individoom:25452Timan@blogdb.zqufy.mongodb.net/?retryWrites=true&w=majority&appName=blogDB
PORT=3000

Additionally, for ease of use, you can add "dev": "nodemon app.js" to the scripts section of the package.json file. This way, the server will restart automatically whenever you update the code, thanks to the nodemon dependency.

So, the main page includes Login, Register, and Portfolio:

![Screenshot (1890)](https://github.com/user-attachments/assets/70fb4a7c-a905-4fa6-a909-33f6fbd2569b)


![Screenshot (1891)](https://github.com/user-attachments/assets/7d211149-937a-48cc-a9bd-a162f2a8f7a5)




