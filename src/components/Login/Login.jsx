import {
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    signOut,
    signInWithPopup,
} from "firebase/auth";
import app from "../../firebase/firebase_init";
import { useState } from "react";

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                // console.log(user);
                setUser(user);
            })
            .catch((error) => {
                console.log("error", error.message);
            });
    };

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                console.log(user);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleSignOut = () => {
        signOut(auth)
            .then((result) => {
                console.log(result);
                setUser(null);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div>
            {user ? (
                <button className="text-white bg-red-500 px-4 py-2" onClick={handleSignOut}>
                    Sign Out
                </button>
            ) : (
                <div className="flex gap-8">
                    <button
                        className="text-white bg-purple-800 px-4 py-2"
                        onClick={handleGoogleSignIn}
                    >
                        Google Login
                    </button>

                    <button
                        className="text-white bg-gray-900 px-4 py-2"
                        onClick={handleGithubSignIn}
                    >
                        GitHub Login
                    </button>
                </div>
            )}

            {user && (
                <div className="mt-6 space-y-2">
                    <h3>User: {user.displayName}</h3>
                    <p>Email: {user.email}</p>
                    <img src={user.photoURL} alt="User Image" />
                </div>
            )}
        </div>
    );
};

export default Login;
