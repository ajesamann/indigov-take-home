import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import constituentRoutes from './routes/constituents';

dotenv.config();
const app = express();

// Register middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/constituents', constituentRoutes);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
