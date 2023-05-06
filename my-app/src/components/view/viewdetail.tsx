import { Grid, GridItem, Box, Text, Button, useToast } from "@chakra-ui/react";
import { useLocation } from "react-router";
import { BsHandThumbsUp} from 'react-icons/bs';
import { useEffect, useState } from "react";

interface Post{
    id: string,
    postedBy: string,
    content: string,
    postedOn: string,
    views: number,
    credibility: number
}

const ViewDetail: React.FC = () => {
    const location = useLocation();
    const toast = useToast();

    const defaultState : Post = {} as Post;
    const [post, setPost] = useState(defaultState);

    useEffect(()=>{
        async function getBlogPost(){
            let data = await fetch(`http://localhost:8080/blogposts/${location.state.postId}`);
            const jsonData = await data.json();
            setPost(jsonData);
        }
        getBlogPost().catch(console.error);
    },[]);

    async function handleLike(){
        await fetch(`http://localhost:8080/blogposts/like/${post.id}`,{
                    method: 'POST',
                    headers:{
                        'Content-Type': "application/json"
                    },
        });

        toast({
            title: 'Post Liked !',
            status: 'success',
            isClosable: true,
            position: 'top-right'
          });
    }

    return (
        <Grid templateColumns='1fr' justifyItems='center'>
            <GridItem height='56px' />
            <GridItem width='1200px' height='900px' overflow='auto'>
                <Box border='0.8px solid #E6E8F0' borderRadius='8px' height='850px' overflow='auto'>
                    <Text fontSize='4xl' padding='16px'>Content</Text>
                    <Text fontSize='2xl' fontWeight='400' padding='16px'>
                        {post.content}
                    </Text>
                </Box>
                
            </GridItem>
            <GridItem width='1200px' height='100px' overflow='auto'>
            <Button rightIcon={<BsHandThumbsUp />} 
                    colorScheme='blue' 
                    variant='outline' 
                    float='right'
                    onClick={handleLike}>
                Like Post
            </Button>
            </GridItem>
        </Grid>
    )
}

export default ViewDetail;