import { GridItem, Grid, Textarea, Button, Box, Input, useToast, FormErrorMessage } from "@chakra-ui/react"
import { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";

interface Post{
    postedBy: string, 
    content: string,
    postedOn: string
}

const service_url : string = "http://localhost:8080/blogposts";

const CreateSanitized: React.FC = () => {
    const defaultState : Post = {postedBy: '', content: ''} as Post;
    const defaultError : any = {isError: false, message: undefined};
    const [postState, setPostState] = useState(defaultState);
    const [error, setErrorState] = useState(defaultError);
    const toast = useToast();

    async function handleSave(){
        if(postState.postedBy === '' || postState.content === ''){
            setErrorState({isError: true, message: 'Invalid Input'});
        }else{

            const response = await fetch(service_url, {
                method: 'POST',
                headers:{
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    postedBy: postState.postedBy,
                    content: sanitizeString(postState.content),
                    postedOn: new Date().toISOString()
                })
            });
            const responseJson = await response.json();
            if(responseJson.malicious){
                setErrorState({isError: true, message: 'Malicious Input'});
            }else{
                setErrorState(defaultError);
                toast({
                    title: "Post saved.",
                    status: "success"
                })
            }
            setPostState(defaultState);
        }
    }

    function sanitizeString(str : string){
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
        return str.trim();
    }

    function handleEmailChange(event : any){
        setPostState({postedBy: event.target.value, content: postState.content} as Post);
    }

    function handleContentChange(event : any){
        setPostState({postedBy: postState.postedBy, content: event.target.value} as Post);
    }

    return (
        <Grid templateColumns='1fr' justifyItems='center'>
            <GridItem height='56px' />
                <GridItem width='1200px' height='600px' overflow='auto'>
                <Box border='0.8px solid #E6E8F0' borderRadius='8px' height='600px' overflow='auto'>
                    <Input placeholder='Enter your email' 
                           margin='16px' 
                           width='1150px' 
                           type='email'
                           className="form_input__email"
                           value={postState.postedBy}
                           onChange={handleEmailChange}></Input>
                    <Textarea placeholder='Type your content here' 
                              id='textarea'
                              className="form_input__textbox"
                              margin='16px' 
                              width='1150px' 
                              height='380px'
                              overflow='auto'
                              value={postState.content}
                              onChange={handleContentChange}/>
                    {error.isError ? <text className='error-text' style={{
                        padding: '16px',
                        color: 'darkred'
                    }}>{error.message}</text> : undefined}
                </Box>
                </GridItem>
                <GridItem width='1200px' height='100px' overflow='auto'>
                <Button rightIcon={<AiOutlineSave />} 
                    colorScheme='blue' 
                    variant='outline' 
                    float='right'
                    id='savepost'
                    onClick={handleSave}
                    aria-label='Save post'
                    className="form_input__submit"
                    marginTop='16px'>
                    Save Post
                </Button>
            </GridItem>
        </Grid>
    );
}

export default CreateSanitized;