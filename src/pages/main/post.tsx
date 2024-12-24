import { useAuthState } from "react-firebase-hooks/auth";
import { Post as Ipost,  } from "./main";
import { db,auth } from "../../config/firebase";
import { addDoc, collection,query, where,getDocs,deleteDoc,doc } from "firebase/firestore";
import { useEffect, useState } from "react";
interface Props{
    post:Ipost;
}
interface Likes{
    userId: string
}
export const Post=(props: Props)=>{
    const {post} = props;

    //Add Likes
    const [user] = useAuthState(auth);
    const [likes,setLikes]= useState<Likes[] | null>(null);
    const likesRef=collection(db,"likes");
    const likesDoc=query(likesRef,where("postId","==",post.id));
    const getLikes=async ()=>{
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc)=>({userId: doc.data().userId})))
    }
    const addLike=async()=>{
        try{
        await addDoc(likesRef, {userId:user?.uid, postId:post.id})
        if(user){
            setLikes((prev)=> (
                prev ? [...prev, {userId: user.uid}] : [{userId: user.uid}]
            ))
        }
        }catch(err){
            console.log(err)
        }   
    }
    const removeLike=async()=>{
        try{
            const likeToDeleteQuery=query(likesRef,where("postId","==",post.id), where("userId","==",user?.uid))
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeToDelete=doc(db,"likes",likeToDeleteData.docs[0].id)
            await deleteDoc(likeToDelete);

        // await addDoc(likesRef, {userId:user?.uid, postId:post.id})
        // if(user){
        //     setLikes((prev)=> (
        //         prev ? [...prev, {userId: user.uid}] : [{userId: user.uid}]
        //     ))
        // }
        }catch(err){
            console.log(err)
        }   
    }
    const hasUserLiked = likes?.find((like)=>like.userId === user?.uid)
    useEffect(()=>{
        getLikes();
    },[])
    return(
        <div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div>
                <p>@{post.username}</p>
                {/* <button> &#120877; </button> */}
                <button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? "Unlike" : "like"}</button>
                {likes && <p>Likes: {likes.length}</p> }
            </div>
        </div>
    )
}