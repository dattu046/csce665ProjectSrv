import { useState, useEffect } from "react";

interface EvaluationResult{
    status: number
    malicious: boolean
    body: {}
}

const service_url : string = "http://localhost:8080/blogposts";

function BlogPost(){
    const [evaluationResult, setEvaluationResult] = useState({malicious: false} as EvaluationResult);

    async function handleButtonClick(){
        const response = await fetch(service_url, {
            method: 'POST',
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                postedBy: "dattu046@gmail.com",
                content: "This is a content space",
                postedOn: "2022-10-11"
            })
        });
        console.log(await response.json());
        console.log(response.status);
    }

    return(
        <>
            <button onClick={handleButtonClick}>Get data</button>
        </>
    );
}

export default BlogPost;