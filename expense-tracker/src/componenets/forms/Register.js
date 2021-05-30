import React from 'react';
import './Login.css';
import fire from '../../config/fire.js';





class Register extends React.Component {
    state= {
        email: '',
        displayName: '',
        password: '',
        fireErrors:''
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    register = event => {
        event.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            var currentUser = fire.auth().currentUser;
            currentUser.updateProfile({
                displayName: this.state.displayName
            })
        }).catch((errors) => {
            this.setState({
                fireErrors: errors.message
            })
        })
    }
    
    // const errors = this.state.fireErrors ? {this.state.fireErrors} : null;

    render(){
        let errorNotification = this.state.fireErrors ? 
        (<div className='error'>
            {this.state.fireErrors}
        </div>): null;
    return (
        <div>
        <div>
        <div className='sidenav'>
            <div class="login-main-text">
                <h1>EXPENSE <br /> Tracker</h1>
                <p>Login or register from here to access.</p>
            </div>
        </div>
        
            <div class="main">
                <div class="col-md-6 col-sm-12">
                    <div class="login-form">
                    <form>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" placeholder="Name" name='displayName'
                            onChange={this.handleChange} />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="text" class="form-control" placeholder="Email" name='email'
                            onChange={this.handleChange}/>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" placeholder="Password" name='password'
                            onChange={this.handleChange}/>
                        </div>
                        {errorNotification}
                        <button type="submit" class="btn btn-secondary mybtn" onClick={this.register}>Register</button>
                        
                        
                    </form>
                    
                    </div>
                </div>
            </div>

        </div>
        </div>
    )
}
}
export default Register;
