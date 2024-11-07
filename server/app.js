import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import authorUserRoutes from './routes/authorUserRoutes.js';
import reviewerUserRoutes from './routes/reviewerUserRoutes.js';
import adminUserRoutes from './routes/adminUserRoutes.js';
import paperSubmissionRoutes from './routes/paperSubmissionRoutes.js';
import projectRoutes from "./routes/projectRoutes.js";
import toBeReviewedRoutes from "./routes/toBeReviewedRoutes.js";


dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

// Mount the AuthorUser routes
app.use("/api/author-users", authorUserRoutes);

// Mount the ReviewerUser routes
app.use("/api/reviewer-users", reviewerUserRoutes);

// Mount the AdminUser routes
app.use("/api/admin-users", adminUserRoutes);

// Mount the PaperSubmission routes
app.use("/api/paper-submissions", paperSubmissionRoutes);

// Mount the Project routes
app.use("/api/projects", projectRoutes);

// Mount the ToBeReviewed routes
app.use("/api/to-be-reviewed", toBeReviewedRoutes);

export default app;