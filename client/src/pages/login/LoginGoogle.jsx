const LoginGoogle = () => {

    const google = () => {
        window.open("http://localhost:8000/auth/google", "_self");
    };

    return(
        <div>
            <button onClick={google}>Google</button>
        </div>
    )
}

export default LoginGoogle;