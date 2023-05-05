import express, {Request, Response} from 'express'
import { getBlogPostById, createBlogPost, getAllBlogPosts, likeBlogPost, createBlogPostVal } from '../services/blogpost.service'
import { BlogPost } from '../types/BlogPost'

const blogpostrouter = express.Router()

blogpostrouter.get('/:id',async (req: Request, res: Response) => {
   let data : BlogPost = await getBlogPostById(req.params.id)
   res.status(200).json(data)
})

blogpostrouter.post('/',async (req: Request, res: Response) => {
    try{
    let data : BlogPost = await createBlogPost(req.body)
    console.info(data)
    res.status(201).json(data)
    }catch(error : any){
        if(error.message === 'blog-post-service.110'){
            res.status(400).json({message: 'Error processing request'})
        }
    }
})

blogpostrouter.post('/hidden',async (req: Request, res: Response) => {
    try{
    let data : BlogPost = await createBlogPostVal(req.body)
    console.info(data)
    res.status(201).json(data)
    }catch(error : any){
        if(error.message === 'blog-post-service.110'){
            res.status(400).json({message: 'Error processing request'})
        }
    }
})

blogpostrouter.post('/like/:id',async (req: Request, res: Response) => {
    await likeBlogPost(req.params.id)
    res.sendStatus(201)
})

blogpostrouter.get('/',async (req: Request, res: Response) => {
    let data : BlogPost[] = await getAllBlogPosts()
    res.status(200).json(data)
})

export default blogpostrouter