import { Link } from "react-router-dom";
import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth"
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate=useNavigate();
    const signUserOut=async()=>{
        await signOut(auth);
        navigate("/");
    }
    return (
        <div className="navbar">
            <h2>NavBar</h2>
            <Link to="/">Home</Link>
            {!user ? ( <Link to="/login">Login</Link> ): ( <Link to="/createpost">Create Post</Link>) }
            <div className="user-info">
                {user && (
                    <>
                <p>{user?.displayName}</p>
                <img src={user?.photoURL || ""} alt="User" />
                <button onClick={signUserOut}>Logout</button>
                </>
                )
            }
            </div>
        </div>
    );
};
