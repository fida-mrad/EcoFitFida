import React, {useState} from "react";

const defaultFormFields = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    BirthDay: ""
}

function SignUp() {

    const [formFields, setformFields] = useState(defaultFormFields);
    const handleInputValueChange = (event) => {
        const {name, value} = event.target;
        setformFields({...formFields, [name]: value})
    }
    const handleSubmit = (event) =>{
        event.preventDefault(); // pour ne pas faire refresh
        console.log(formFields);
    }
    return (
        <section className="form-container">
            <h1 className="form-heading"> Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-item" id="Fist">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter your First Name" name="firstName"
                           value={formFields.firstName}
                           onChange={handleInputValueChange}/>
                </div>
                <div className="form-item" id="name">
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter Last Name" name="lastName" value={formFields.lastName}
                           onChange={handleInputValueChange}/>
                </div>
                <div className="form-item" id="User">
                    <label>User Name</label>
                    <input type="text" placeholder="Enter User Name" name="userName" value={formFields.userName}
                           onChange={handleInputValueChange}/>
                </div>
                <div className="form-item" id="Email">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your Email" name="email" value={formFields.email}
                           onChange={handleInputValueChange}/>
                </div>
                <div className="form-item" id="Pass">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your Password" name="password" value={formFields.password}
                           onChange={handleInputValueChange}/>
                </div>
                <div className="form-item" id="Pass">
                    <label> Confirm your Password</label>
                    <input type="password" placeholder="Confirm your Password" name="confirmPassword"
                           value={formFields.confirmPassword}
                           onChange={handleInputValueChange}/>
                </div>
                <div className="form-item" id="Phone">
                    <label>Phone</label>
                    <input type="number" placeholder="Enter your Phone" name="phone" value={formFields.phone}
                           onChange={handleInputValueChange}/>
                </div>
                <div className="form-item" id="name">
                    <label>BirthDay</label>
                    <input type="date" placeholder="Enter your name" name="BirthDay"value={formFields.BirthDay}
                           onChange={handleInputValueChange} />
                </div>
                <div className="form-item" id="image">
                    <label>Profile Image</label>
                    <input type="file" placeholder="Enter your name" name="Image"/>
                </div>
                <button className="form-button" type="submit">Sign Up</button>
            </form>
        </section>
    )
}

export default SignUp;
