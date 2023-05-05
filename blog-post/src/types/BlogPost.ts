export interface BlogPost{
    id: string,
    postedBy: string,
    content: string,
    postedOn: string,
    views: number,
    credibility: number
}

export interface BlogPostDTO{
    id: string,
    postedBy: string,
    content: string
}