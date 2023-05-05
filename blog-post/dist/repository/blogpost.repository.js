"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyBlogPostCredibility = exports.modifyBlogPostViews = exports.saveBlogPost = exports.readallBlogPosts = exports.readBlogPostsById = void 0;
const dbconfig_1 = __importDefault(require("../config/dbconfig"));
const COLLECTION_NAME = 'blogposts';
const collection = dbconfig_1.default.collection(COLLECTION_NAME);
async function readBlogPostsById(id) {
    let data = await collection
        .findOne({ id: id });
    return data;
}
exports.readBlogPostsById = readBlogPostsById;
async function readallBlogPosts() {
    let data = await collection
        .find();
    let blogPosts = [];
    console.info(data);
    await data.forEach(record => {
        console.info(record);
        blogPosts.push(record);
    });
    return blogPosts;
}
exports.readallBlogPosts = readallBlogPosts;
async function saveBlogPost(blogPost) {
    await collection.insertOne({
        id: blogPost.id,
        postedBy: blogPost.postedBy,
        content: blogPost.content
    });
}
exports.saveBlogPost = saveBlogPost;
async function modifyBlogPostViews(id, viewCount) {
    await collection.updateOne({ id: id }, { '$set': { 'views': viewCount } });
}
exports.modifyBlogPostViews = modifyBlogPostViews;
async function modifyBlogPostCredibility(id, credibility) {
    await collection.updateOne({ id: id }, { '$set': { 'credibility': credibility } });
}
exports.modifyBlogPostCredibility = modifyBlogPostCredibility;
