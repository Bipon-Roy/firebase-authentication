import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from "react";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase_init";
import { Link } from "react-router-dom";

const SignIn = () => {
    const auth = getAuth(app);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const emailRef = useRef(null);

    const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        //Clear Error Message
        setErrorMsg("");
        setSuccessMsg("");
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                if (result.user.emailVerified) {
                    setSuccessMsg("User Created Successfully");
                } else {
                    // sendEmailVerification(result.user).then(() =>
                    //     alert("Check Your Mail and Verify Your Account")
                    // );
                    alert("Please Verify Your Mail");
                }
            })
            .catch((e) => {
                console.log(e);
                setErrorMsg(e.message);
            });
    };

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log("Type Email", email);
            return;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log("please write a valid email");
            return;
        }

        //send validation email
        sendPasswordResetEmail(auth, email)
            .then(() => alert("Please Check Your Mail"))
            .catch((e) => console.log(e));
    };

    return (
        <div className="flex justify-center ">
            <form onSubmit={handleSignIn}>
                <h2 className="text-xl font-semibold">Sign In Here</h2>
                <div className="space-y-4 gap-4 my-4 w-[400px]">
                    <input
                        required
                        name="email"
                        className="border pl-2 py-2 w-full"
                        type="email"
                        placeholder="email"
                        ref={emailRef}
                    />

                    <div className="relative">
                        <input
                            required
                            name="password"
                            className="border pl-2 py-2 w-full"
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                        />
                        <label className="label">
                            <a
                                href="#"
                                onClick={handleForgetPassword}
                                className="label-text-alt link link-hover text-base"
                            >
                                Forgot password?
                            </a>
                        </label>
                        <span
                            className="text-lg absolute top-3 right-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                        </span>
                    </div>

                    <input
                        type="submit"
                        value="Sign In"
                        className="px-4 py-[6px] bg-orange-600 text-white w-full font-medium"
                    />
                </div>
                <p>
                    New To This Website Please
                    <Link
                        className="text-lg text-blue-800 font-semibold ml-2 underline"
                        to="/register"
                    >
                        Register
                    </Link>
                </p>
                {errorMsg && <p className="text-red-700 text-lg my-4">{errorMsg}</p>}
                {successMsg && <p className="text-green-600 text-lg my-4">{successMsg}</p>}
            </form>
        </div>
    );
};

export default SignIn;
