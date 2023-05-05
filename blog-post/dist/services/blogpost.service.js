"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeBlogPost = exports.getAllBlogPosts = exports.createBlogPostVal = exports.createBlogPost = exports.getBlogPostById = void 0;
const blogpost_repository_1 = require("../repository/blogpost.repository");
const uuid_1 = require("uuid");
async function getBlogPostById(id) {
    let data = await (0, blogpost_repository_1.readBlogPostsById)(id);
    if (data !== null) {
        let viewCount = data.views === undefined ? 1 : data.views + 1;
        await (0, blogpost_repository_1.modifyBlogPostViews)(data.id, viewCount);
        data.views = viewCount;
    }
    else {
        throw new Error('Blog Post Not Found');
    }
    return data;
}
exports.getBlogPostById = getBlogPostById;
/*Created a user facing object blog post which doesn't know any internal state*/
async function createBlogPost(blogPostDTO) {
    let blogPost = blogPostDTO;
    blogPost.id = (0, uuid_1.v4)();
    blogPost.postedOn = new Date().toISOString();
    await (0, blogpost_repository_1.saveBlogPost)(blogPost);
    return blogPost;
}
exports.createBlogPost = createBlogPost;
/*Unsafe implicit parsing to blog post object directly, Creates option for HPA/prototype pollution*/
async function createBlogPostVal(blogPost) {
    blogPost.id = (0, uuid_1.v4)();
    let data = JSON.stringify(blogPost);
    console.log(data);
    const fetchResponse = await fetch('http://127.0.0.1:5000/blogposts/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogPost)
    });
    const modelValidate = await fetchResponse.json();
    console.log(modelValidate);
    if (modelValidate.malicious) {
        throw new Error('blog-post-service.110');
    }
    blogPost.postedOn = new Date().toISOString();
    await (0, blogpost_repository_1.saveBlogPost)(blogPost);
    return blogPost;
}
exports.createBlogPostVal = createBlogPostVal;
async function getAllBlogPosts() {
    let data = await (0, blogpost_repository_1.readallBlogPosts)();
    return data;
}
exports.getAllBlogPosts = getAllBlogPosts;
async function likeBlogPost(id) {
    let data = await (0, blogpost_repository_1.readBlogPostsById)(id);
    if (data !== null) {
        let credibility = data.credibility === undefined ? 1 * 2 : data.credibility * 2;
        await (0, blogpost_repository_1.modifyBlogPostCredibility)(id, credibility);
    }
    else {
        throw new Error('Blog Post Not Found');
    }
}
exports.likeBlogPost = likeBlogPost;
