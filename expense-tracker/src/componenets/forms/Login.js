import React from 'react';
import './Login.css';
import fire from '../../config/fire.js';


class  Login extends React.Component {
    state= {
        email: '',
        password: '',
        fireErrors:''
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleLogin = event => {
        event.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        
        .catch((error) => {
            this.setState({
                fireErrors: error.message
            });
        } )
    }


    render(){
        let errorNotification = this.state.fireErrors ? 
            ( <div className="error"> {this.state.fireErrors} </div> ) : null;

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
                            <label>Email</label>
                            <input type="text" 
                            class="form-control" 
                            placeholder="Email" 
                            name='email'
                            value={this.state.email} 
                            onChange={this.handleChange}/>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" 
                            placeholder="Password" name='password'
                            value={this.state.password}
                            onChange={this.handleChange}/>
                        </div>
                        {errorNotification}
                        <button type="submit" class="btn btn-secondary mybtn" onClick={this.handleLogin}>Login</button>
                        
                    </form>
                    
                    </div>
                </div>
            </div>

        </div>
        </div>
    )
}
}

export default Login;
