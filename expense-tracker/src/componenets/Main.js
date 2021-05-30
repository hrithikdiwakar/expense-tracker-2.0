import React from 'react';
import './Main.css';
import Login from './forms/Login';
import Register from './forms/Register';
// import './forms/Login.css';
import './Main.css'
import fire from '../config/fire.js';
import Tracker from './Tracker/Tracker';



class Main extends React.Component{

    state = {
        user: 1,
        loading: true,
        formSwitcher: false
    }

    componentDidMount(){
        this.authListener();
    }

    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({user});
            }else{
                this.setState({user: null});
            }
        })
    }

    formSwitcher(event){
        console.log(event);
        this.setState({formSwitchera: event === 'register' ? true : false})
        this.setState({display: event === 'register' ? <Register /> : <Login />})
    }
    constructor(props) {
            super(props)
        
            this.state = {
                display: <Login />,
                formSwitchera: false

            }
            this.formSwitcher = this.formSwitcher.bind(this)
        }
    
    render(){
             
        return(
            <>
            { !this.state.user ? 
                (<div>
                {this.state.display}
                {!this.state.formSwitchera ?
                (<div className='underline'>
                    <p>Don't have an account?   <span className='text-underline' 
                    onClick={() => this.formSwitcher(!this.state.formSwitchera ? 'register' : 'login')}>
                    Register here</span></p> 
                </div>) : (
                <div className='underline'>
                    <p>Already have an account?   <span className='text-underline' 
                    onClick={() => this.formSwitcher(!this.state.formSwitchera ? 'register' : 'login')}>
                    Login here</span></p> 
                </div>
                

                )
                
                }
                
                
            </div>
                ) : <Tracker />
            }
            </>
        );

    }
}

export default Main;