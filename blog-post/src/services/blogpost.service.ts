import { readBlogPostsById, saveBlogPost, modifyBlogPostCredibility, modifyBlogPostViews, readallBlogPosts } from '../repository/blogpost.repository'
import { BlogPost, BlogPostDTO } from '../types/BlogPost'
import { v4 as uuidv4 } from 'uuid'

export async function getBlogPostById(id: string) : Promise<BlogPost>{
    let data : BlogPost = await readBlogPostsById(id)
    if(data !== null){
        let viewCount : number = data.views === undefined ? 1 : data.views + 1
        await modifyBlogPostViews(data.id, viewCount)
        data.views = viewCount
    }else{
        throw new Error('Blog Post Not Found')
    }
    return data
}

/*Created a user facing object blog post which doesn't know any internal state*/
export async function createBlogPost(blogPostDTO: BlogPostDTO) : Promise<BlogPost>{
    let blogPost : BlogPost = blogPostDTO as BlogPost
    blogPost.id = uuidv4()
    blogPost.postedOn = new Date().toISOString()
    await saveBlogPost(blogPost)
    return blogPost
}

/*Unsafe implicit parsing to blog post object directly, Creates option for HPA/prototype pollution*/
export async function createBlogPostVal(blogPost: BlogPost) : Promise<BlogPost>{
    blogPost.id = uuidv4()
    let data = JSON.stringify(blogPost)
    console.log(data)
    const fetchResponse = await fetch('http://127.0.0.1:5000/blogposts/validate',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogPost)  
    })

    const modelValidate = await fetchResponse.json()
    console.log(modelValidate)
    if(modelValidate.malicious){
        throw new Error('blog-post-service.110')
    }
    blogPost.postedOn = new Date().toISOString()
    await saveBlogPost(blogPost)
    return blogPost
}

export async function getAllBlogPosts() : Promise<BlogPost[]>{
    let data : BlogPost[] = await readallBlogPosts()
    return data
}

export async function likeBlogPost(id: string){
    let data : BlogPost = await readBlogPostsById(id)
    if(data !== null){
        let credibility : number = data.credibility === undefined ? 1 * 2 : data.credibility * 2
        await modifyBlogPostCredibility(id, credibility)
    }else{
        throw new Error('Blog Post Not Found')
    }
}