import {auth} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import { getDocs,collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post{
    id:string,
    userId:string,
    title:string,
    username:string,
    description:string;
}

export const Main=()=>{
    const [user]=useAuthState(auth);
    const postsRef= collection(db,"posts");
    const [postsList, setPostsList] = useState<Post[] | null>(null);

    const getPosts=async ()=>{
        const data= await getDocs(postsRef);
        setPostsList(data.docs.map((doc)=>({...doc.data(), id: doc.id})) as Post[]);
    }
    useEffect(()=>{
        getPosts();
    },[])
    return(
        <div>
        <h1>This is Home page. welcome to our page {user?.displayName}</h1>
        {postsList?.map((post)=> (<Post post={post}/>))}
        </div>
        
    )
}