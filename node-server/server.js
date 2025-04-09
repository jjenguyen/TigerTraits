// configuring express to serve the angular build
const path = require('path');

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// create an express app
const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;

const uri = process.env.MONGO_URI || "mongodb+srv://jn4gz:jn4gz12345@clustera4.jcqksc9.mongodb.net/tigertraits?retryWrites=true&w=majority";
console.log("Environment PORT:", process.env.PORT);

const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

// mongodb connection string from mongodb atlas (change db to "tigertraits")
// const uri = "mongodb+srv://jn4gz:jn4gz12345@clustera4.jcqksc9.mongodb.net/tigertraits?retryWrites=true&w=majority";

// function to connect to mongodb
async function connectToMongoDB() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Successfully connected to MongoDB Atlas!');
        return client.db(); // return the database instance
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error;
    }
}

// /api route - returns overview of api info
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the Tiger Traits API!',
    endpoints: {
      login: '/login',
      register: '/register',
      quizResults: '/quizResults'
    }
  });
});

// 1. db hashing: function to check if a password is hashed, call in user login auth
function isPasswordHashed(password) {
    // check if password starts with the bcrypt hash identifier
    return password.startsWith('$2b$');
}

// 2. user login auth
app.post('/login', async (req, res) => {
    try {
        console.log('Login request received:', req.body);
        
        const db = await connectToMongoDB();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email: req.body.email });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'User not found. Please try again or register an account.' });
        }

        console.log('Mongodb User:', user);

        // check if password stored in db is already hashed
        if (!isPasswordHashed(user.password)) {
            console.log('Database password is not hashed. Hashing now...');
            // if password is not hashed, hash it and update the database
            const hashedPassword = await bcrypt.hash(user.password, 10);
            console.log('Hashed Password:', hashedPassword);
            await usersCollection.updateOne(
                { email: req.body.email },
                { $set: { password: hashedPassword } }
            );

            // update the user object with the hashed password
            user.password = hashedPassword;
        } else {
            console.log('Database password is already hashed.');
        }

        // compare the user input password with the hashed password retrieved from the database
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            console.log('Incorrect password');
            return res.status(401).json({ message: 'Incorrect password. Please try again.' });
        }

        console.log('Login successful!');
        // res.status(200).json({ message: 'Login successful!' });
        // modified the above code to send the info needed for authservice (userId)
        res.status(200).json({
            message: 'Login successful!',
            userId: user._id.toString(),
            email: user.email
          });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 3. register new user and insert new document into mongo "users" collection
app.post('/register', async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const usersCollection = db.collection('users');
        const existingUser = await usersCollection.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists. Please go to the login page to log in.' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await usersCollection.insertOne({
            email: req.body.email,
            password: hashedPassword
        });
        console.log('User registered successfully!');
        return res.status(201).json({ message: 'Account successfully created! Please go to the login page to log in.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 4. insert user quiz results into mongo "quizResults" collection
app.post('/quizResults', async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const quizResultsCollection = db.collection('quizResults');

        // expecting data from the client like:
        // { userId: "[user's id number]", personalityType: "[INFP, ENFJ, etc.]" }
        const { userId, personalityType } = req.body; // userId is a string now
        const result = await quizResultsCollection.updateOne(
            { userId: userId },  // match on string userId
            {
                $set: {
                    personalityType,
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );

        console.log('Quiz result updated:', result);
        res.status(200).json({ message: 'Quiz result updated successfully' });
    } catch (error) {
        console.error('Error updating quiz result:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// serve static files from the angular app (i.e. the "dist" folder created from the production build command)
app.use(express.static(path.join(__dirname, 'dist/tigertraits-deployed/browser')));
// for any routes that don't match the api, serve the angular index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/tigertraits-deployed/browser/index.html'));
});

// start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
