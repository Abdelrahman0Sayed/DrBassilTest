import { useGoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const CustomGoogleLoginButton = () => {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // Google OAuth now returns tokenResponse containing access_token
            const token = tokenResponse;
            console.log(tokenResponse);
            await HandleGoogleSignin(token); // Use access_token instead of credential
        },
        onError: () => {
            alert("Login Failed");
        }
    });

    // Handling Google sign-in
    async function HandleGoogleSignin(token: any) {
        const response = await fetch(`http://localhost:7060/api/Auth/Sign-with-Google/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }), // Send the token in the body
        });

        const authToken = await response.text();
        if (response.status === 200) {
            localStorage.setItem("token", authToken);
            window.location.href = '/';
        } else {
            alert("Failed to login");
        }
    }

    return (
        <div>
            {/* Custom Google Login Button */}
            <button
                onClick={() => login()}
                style={{
                    backgroundColor: '#4285F4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                }}
            >
                <FontAwesomeIcon icon={faGoogle} />
                Sign in with Google
            </button>
        </div>
    );
};

export default CustomGoogleLoginButton;
