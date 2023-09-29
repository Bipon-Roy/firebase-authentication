import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase_init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const auth = getAuth(app);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(name, email, password);

        //Clear Error Message
        setErrorMsg("");
        setSuccessMsg("");

        if (password.length < 6) {
            setErrorMsg("Password Should be at least 6 characters or longer");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setErrorMsg("Your password should have at least one upper case characters.");
            return;
        } else if (!terms) {
            setErrorMsg("Please Accept Our Terms and Conditions");
            return;
        }

        //create user
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result);
                setSuccessMsg("User Created Successfully");
                //update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg",
                })
                    .then(() => console.log("profile updated"))
                    .catch((e) => console.log(e));

                //Send Verification Mail
                sendEmailVerification(result.user).then(() =>
                    alert("Check Your Mail and Verify Your Account")
                );
            })
            .catch((e) => {
                console.log(e);
                setErrorMsg(e.message);
            });
    };

    return (
        <div className="flex justify-center ">
            <form onSubmit={handleRegister}>
                <h2 className="text-xl font-semibold">Register Here</h2>
                <div className="space-y-4 gap-4 my-4 w-[400px]">
                    <input
                        required
                        name="name"
                        className="border pl-2 py-2 w-full"
                        type="text"
                        placeholder="Your Name"
                    />
                    <input
                        required
                        name="email"
                        className="border pl-2 py-2 w-full"
                        type="email"
                        placeholder="email"
                    />

                    <div className="relative">
                        <input
                            required
                            name="password"
                            className="border pl-2 py-2 w-full"
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                        />

                        <span
                            className="text-lg absolute top-3 right-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                        </span>
                    </div>
                    <div className="my-2">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-3" htmlFor="terms">
                            Accept Our Terms and Conditions
                        </label>
                    </div>

                    <input
                        type="submit"
                        value="Submit"
                        className="px-4 py-[6px] bg-orange-600 text-white w-full"
                    />
                </div>
                <p>
                    Already Have An Account Please
                    <Link
                        className="text-lg text-blue-800 font-semibold ml-2 underline"
                        to="/register"
                    >
                        Login
                    </Link>
                </p>
                {errorMsg && <p className="text-red-700 text-lg my-4">{errorMsg}</p>}
                {successMsg && <p className="text-green-600 text-lg my-4">{successMsg}</p>}
            </form>
        </div>
    );
};

export default Register;
