import database from '../config/dbconfig'
import { BlogPost } from '../types/BlogPost'
import { Collection } from 'mongodb'

const COLLECTION_NAME : string = 'blogposts'
const collection : Collection<BlogPost> = database.collection(COLLECTION_NAME)

export async function readBlogPostsById(id: string) : Promise<BlogPost>{
    let data = await collection
    .findOne({id: id}) as BlogPost
    return data
}

export async function readallBlogPosts() : Promise<BlogPost[]>{
    let data = await collection
    .find()
    let blogPosts : BlogPost[] = []
    console.info(data)
    await data.forEach(record => {
        console.info(record)
        blogPosts.push(record)
    })
    return blogPosts
}

export async function saveBlogPost(blogPost: BlogPost){
    await collection.insertOne({
        id: blogPost.id,
        postedBy: blogPost.postedBy,
        content: blogPost.content
    } as BlogPost)
}

export async function modifyBlogPostViews(id: string,viewCount: number){
    await collection.updateOne({id: id},{'$set':{'views': viewCount}})
}

export async function modifyBlogPostCredibility(id: string, credibility: number){
    await collection.updateOne({id: id}, {'$set':{'credibility': credibility}})
}