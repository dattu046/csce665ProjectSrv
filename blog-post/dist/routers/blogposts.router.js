"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogpost_service_1 = require("../services/blogpost.service");
const blogpostrouter = express_1.default.Router();
blogpostrouter.get('/:id', async (req, res) => {
    let data = await (0, blogpost_service_1.getBlogPostById)(req.params.id);
    res.status(200).json(data);
});
blogpostrouter.post('/', async (req, res) => {
    try {
        let data = await (0, blogpost_service_1.createBlogPost)(req.body);
        console.info(data);
        res.status(201).json(data);
    }
    catch (error) {
        if (error.message === 'blog-post-service.110') {
            res.status(400).json({ message: 'Error processing request' });
        }
    }
});
blogpostrouter.post('/hidden', async (req, res) => {
    try {
        let data = await (0, blogpost_service_1.createBlogPostVal)(req.body);
        console.info(data);
        res.status(201).json(data);
    }
    catch (error) {
        if (error.message === 'blog-post-service.110') {
            res.status(400).json({ message: 'Error processing request' });
        }
    }
});
blogpostrouter.post('/like/:id', async (req, res) => {
    await (0, blogpost_service_1.likeBlogPost)(req.params.id);
    res.sendStatus(201);
});
blogpostrouter.get('/', async (req, res) => {
    let data = await (0, blogpost_service_1.getAllBlogPosts)();
    res.status(200).json(data);
});
exports.default = blogpostrouter;
