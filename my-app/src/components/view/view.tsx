import { List, ListItem, Card, CardBody, Text, Grid, GridItem, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Post{
    id: string,
    postedBy: string,
    content: string,
    postedOn: string,
    views: number,
    credibility: number
}

const View: React.FC = () => {
    const defaultState : Post[] = [];
    const [posts, setPosts] = useState(defaultState);
    const navigator = useNavigate();

    useEffect(()=>{
        async function getBlogPosts(){
            let data = await fetch('http://localhost:8080/blogposts');
            const jsonData = await data.json();
            setPosts(jsonData);
        }
        getBlogPosts().catch(console.error);
    },[]);

    function handlePostView(event: any){
        console.log(event.target.id);
        navigator('/viewdetail',{state:{postId: event.target.id}})
    }


    return (
        <Grid templateColumns='1fr' justifyItems='center'>
            <GridItem height='56px' />
            <GridItem width='1200px' height='900px' justifyContent='center' overflow='auto'>
                <List spacing={3}>
                    <ListItem>
                        <Card>
                            {
                                posts.map(post => {
                                        return <CardBody backgroundColor='#E9F1FB' borderRadius='0px'>
                                                    <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
                                                        <Text fontWeight='400'>Posted By: <strong>{post.postedBy}</strong></Text>
                                                    </div>
                                                    <Text noOfLines={2} fontWeight='400'>{post.content}</Text>
                                                    <div style={{display:'flex',justifyContent:'flex-end',flexWrap:'wrap'}}>
                                                        <Text fontWeight='400' padding='8px'>Views: <strong>{post.views === undefined ? 0 : post.views}</strong></Text>
                                                        <Text fontWeight='400' padding='8px'>Credibility: <strong>{post.credibility === undefined ? 0 : post.credibility}</strong></Text>
                                                    </div>
                                                    <Button float='right' 
                                                            variant='solid'
                                                            background='blue.400'
                                                            color='white'
                                                            fontWeight='400'
                                                            onClick={handlePostView}
                                                            id={post.id}>View more</Button>
                                                </CardBody>
                            }   )}
                        </Card>
                    </ListItem>
                </List>
            </GridItem>
        </Grid>
    );
}

export default View;