import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from  'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { User, AuthorUser, ReviewerUser } from './models/index.js';
// import authRoutes from './routes/auth.js';
import router from './routes/authRoutes.js';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


/* ROUTES */
app.use('/auth', router);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    autoIndex: true
})


app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
    
})

// mongoose.connect(process.env.MONGO_URL)
//     .then(() => {
//     app.listen(PORT, () => console.log(`Server is Listening to port ${PORT}`));
// }).catch((error) => console.log(`${error} did not connect`));


app.post("/register", async (req, res) => {
    const {
        userType, // "author" or "reviewer"
        givenName, // Author's First Name
        familyName, // Author's Last Name
        email,
        phoneNumber,
        affiliation,
        academicInterest,
        program, // Only for Author
        supervisor, // Select from reviewers, only for Author
        reviewCapacity, // Only for Reviewer
        password,
        confirmPassword,
    } = req.body;

    // Validate input fields
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ error: "Email and passwords are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
    }

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Initialize the new user based on userType
        let newUser;
        if (userType === "author") {
            newUser = new AuthorUser({
                firstName: givenName,
                lastName: familyName,
                email,
                phone: phoneNumber,
                affiliation,
                academicInterest: {
                    options: [], // To be populated later
                    selectedOption: academicInterest,
                },
                program: {
                    options: [], // To be populated later
                    selectedOption: program,
                },
                supervisor, // Reviewer ID as supervisor
                password: passwordHash,
            });
        } else if (userType === "reviewer") {
            newUser = new ReviewerUser({
                firstName: givenName,
                lastName: familyName,
                email,
                phone: phoneNumber,
                affiliation,
                academicInterest: academicInterest,
                reviewCapacity,
                password: passwordHash,
            });
        } else {
            return res.status(400).json({ error: "Invalid user type" });
        }

        // Save the user to the database
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: savedUser });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
