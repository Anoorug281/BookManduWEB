import { Router } from 'express';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import Book from '../models/book.js';
import UserModel from '../models/user.model.js';

const bookRouter = Router();

bookRouter.post('/add-book', auth, async (req, res) => {
    try {
        const { id } = req.headers;

        if (!id) {
            return res.status(400).json({ message: "User ID is required in headers" });
        }

        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin privileges required" });
        }

        const { url, title, author, price, desc, language } = request.body;

        if (!url || !title || !author || !price || !desc || !language) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const book = new Book({
            url,
            title,
            author,
            price,
            desc,
            language,
        });

        await book.save();

        return res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

bookRouter.post('/update-book', auth, async (req, res) => {
    try {
        const { id } = req.headers;

        if (!id) {
            return res.status(400).json({ message: "User ID is required in headers" });
        }

        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin privileges required" });
        }

        const { url, title, author, price, desc, language } = request.body;

        if (!url || !title || !author || !price || !desc || !language) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const book = new Book({
            url,
            title,
            author,
            price,
            desc,
            language,
        });

        await book.save();

        return res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default bookRouter;
