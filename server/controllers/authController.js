import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import AuthorUser from '../models/AuthorUser.js'; // Import specialized user models as needed
import AdminUser from '../models/AdminUser.js';
import ReviewerUser from '../models/ReviewerUser.js';

// /* REGISTER USER (modified for role-based actions) */
export const registerAuthor = async (req, res) => {
    const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        phone,
        affiliation,
        academicInterest,
        selectedOption,
        supervisor,
        appliedProjects,
        blocked,
        blockingReason,
        myStatus
    } = req.body;

    // Validate required fields
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
        return res.status(400).json({ error: "Required fields are missing" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
    }

    try {
        // Check if the email already exists
        const existingUser = await AuthorUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Create new AuthorUser
        const newAuthor = new AuthorUser({
            email,
            password: passwordHash,
            firstName,
            lastName,
            phone,
            affiliation,
            academicInterest,
            selectedOption,
            supervisor,
            appliedProjects,
            blocked,
            blockingReason,
            myStatus
        });

        // Save the user
        const savedAuthor = await newAuthor.save();
        res.status(201).json({ message: "Author registered successfully", user: savedAuthor });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const registerReviewer = async (req, res) => {
    const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        phone,
        affiliation,
        academicInterest,
        reviewCapacity
    } = req.body;

    // Validate required fields
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
        return res.status(400).json({ error: "Required fields are missing" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
    }

    try {
        // Check if the email already exists
        const existingUser = await ReviewerUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Create new ReviewerUser
        const newReviewer = new ReviewerUser({
            email,
            password: passwordHash,
            firstName,
            lastName,
            phone,
            affiliation,
            academicInterest,
            reviewCapacity
        });

        // Save the user
        const savedReviewer = await newReviewer.save();
        res.status(201).json({ message: "Reviewer registered successfully", user: savedReviewer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const registerAdmin = async (req, res) => {
    const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        phone,
        appliedStudents,
        canApply,
        options,
        selectedOption,
        deadline,
        description,
        studentCapacity,
        submittedStudents,
        title,
        topic
    } = req.body;

    // Validate required fields
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
        return res.status(400).json({ error: "Required fields are missing" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
    }

    try {
        // Check if the email already exists
        const existingUser = await AdminUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Create new AdminUser
        const newAdmin = new AdminUser({
            email,
            password: passwordHash,
            firstName,
            lastName,
            phone,
            appliedStudents,
            canApply,
            options,
            selectedOption,
            deadline,
            description,
            studentCapacity,
            submittedStudents,
            title,
            topic
        });

        // Save the user
        const savedAdmin = await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully", user: savedAdmin });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Login User
export const loginAuthor = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AuthorUser.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user._id, 'author');
            res.status(200).json({ user: { email: user.email, role: 'author' }, token });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login for ReviewerUser
export const loginReviewer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await ReviewerUser.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user._id, 'reviewer');
            res.status(200).json({ user: { email: user.email, role: 'reviewer' }, token });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login for AdminUser
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AdminUser.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user._id, 'admin');
            res.status(200).json({ user: { email: user.email, role: 'admin' }, token });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
