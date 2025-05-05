// importing the compatibiltiy map to use for returning for the info card
const compatibilityMap = require('./compatibility-map');

// configuring express to serve the angular build
const path = require('path');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
// create an express app
const app = express();
// const port = 3000;
const PORT = process.env.PORT || 3000

const uri = process.env.MONGO_URI
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

// jenna local
// const uri = process.env.MONGO_URI || "mongodb+srv://jn4gz:jn4gz12345@clustera4.jcqksc9.mongodb.net/tigertraits?retryWrites=true&w=majority";

console.log("Environment PORT:", process.env.PORT);

const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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


const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
    if(!token) {
        return res.sendStatus(401).json({message: 'invalid token'}); // Unauthorized
    }
}

// 2. user login auth
app.post('/login', async (req, res) => {
    try {
        
        console.log('Login request received:', req.body);
        
        const db = await connectToMongoDB();
        const usersCollection = db.collection('users');
        const email = req.body.email.toLowerCase();
        const user = await usersCollection.findOne({ email });
        
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
        const token = jwt.sign(
            { userID: user._id, email: user.email },
            process.env.JWT_SECRET
        );

        //include personalityType as a response parameter on login for results page
        const quizResults = db.collection('quizResults');
        
        //append quiz results here to return results upon login
        const userQuizData = await quizResults.findOne({ userId: user._id.toString()});
        //return the type if found, null if no match
        const userType = userQuizData?.personalityType || null;

        //.post/login is at least returning correct user type now from db
        //console.log("userType:", userType);


        console.log('Login successful!');
        // res.status(200).json({ message: 'Login successful!' });
        // modified the above code to send the info needed for authservice (userId)
        res.status(200).json({
            message: 'Login successful!',
            userId: user._id.toString(),
            email: user.email,
            token: token,
            personalityType: userType
          });
          console.log('Token:', token);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 3. register new user and insert new document into mongo "users" collection
app.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/\d/).withMessage('Password must contain at least one number.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .withMessage('Password must contain at least one uppercase letter.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log('Registration request received:', req.body);
    try {
        const db = await connectToMongoDB();
        const usersCollection = db.collection('users');
        const email = req.body.email.toLowerCase();
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists. Please go to the login page to log in.' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await usersCollection.insertOne({
          email,
          password: hashedPassword
        });
        
        console.log('User registered successfully!');
        console.log('case sensetivity test email:', email);

        return res.status(201).json({ message: 'Account successfully created! Please go to the login page to log in.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 4. insert user quiz results into mongo "quizResults" collection
app.post('/quizResults',authenticateJWT, async (req, res) => {
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

// 5. get and store the user's 3 compatibility matches based on their result type
app.post('/compatibilities', async (req, res) => {
  try {
    const { userId, resultType } = req.body;

    const db = await connectToMongoDB();
    const usersCollection = db.collection('users');
    const quizResultsCollection = db.collection('quizResults');
    const compatCollection = db.collection('compatibilities');

    const compatibleTypes = compatibilityMap[resultType];

    if (!compatibleTypes) {
      return res.status(400).json({ message: 'Invalid personality type' });
    }

    // lookup users from quizResults with compatible personalityType
    const compatibleResults = await quizResultsCollection.aggregate([
      {
        $match: {
          personalityType: { $in: compatibleTypes },
          userId: { $ne: userId }
        }
      },
      {
        $sample: { size: 3 }
      }
    ]).toArray();

    // might be useful?: get their emails from the users collection (join)
    const matchedUsers = await Promise.all(
      compatibleResults.map(async (result) => {
        const user = await usersCollection.findOne({ _id: new ObjectId(String(result.userId)) });
        return {
          userId: result.userId,
          personalityType: result.personalityType,
          email: user?.email || 'N/A'
        };
      })
    );

    const newEntry = {
      userId: userId,
      resultType: resultType,
      matchedUsers
    };

    await compatCollection.updateOne(
      { userId: userId },
      { $set: newEntry },
      { upsert: true }
    );

    // checking logic for finding matches for compatiblities
    console.log('Compatible types for', resultType, ':', compatibleTypes);
    console.log('Compatible quizResults found:', compatibleResults.length);
    console.log('Matched Users:', matchedUsers);

    res.status(200).json({ message: 'Compatibility stored', data: newEntry });
  } catch (error) {
    console.error('Error storing compatibility:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 6. get the compatible user contact cards from db to link in info card
app.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const db = await connectToMongoDB();
  const usersCollection = db.collection('profiles');

  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get personality type for a given user ID (contact.component.ts)
app.get('/api/user/:id/personality', async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectToMongoDB();
    const quizResults = db.collection('quizResults');

    const result = await quizResults.findOne({ userId: id });

    if (!result || !result.personalityType) {
      return res.status(404).json({ message: 'Personality type not found for this user.' });
    }

    res.status(200).json({ personality: result.personalityType });
  } catch (error) {
    console.error('Error fetching personality type:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/delete-account', authenticateJWT, async (req, res) => {
  const userId = req.user.userID;
  const db = await connectToMongoDB();
  await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
  res.status(200).json({ message: 'Account deleted successfully.' });
});




// serve static files from the angular app (i.e. the "dist" folder created from the production build command)
app.use(express.static(path.join(__dirname, 'dist/tigertraits-deployed/browser')));
// for any routes that don't match the api, serve the angular index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/tigertraits-deployed/browser/index.html'));
});

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

// start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
