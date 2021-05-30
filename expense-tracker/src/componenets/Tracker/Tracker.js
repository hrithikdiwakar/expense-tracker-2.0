import React from 'react';
import fire from '../../config/fire.js'


class  Tracker extends React.Component {

    logout = ()=> {
        fire.auth().signOut();
    }
    render(){

    return (
        <div>
            Tracker
            <button onClick={this.logout}> Logout</button>
        </div>
    )
    }
}

export default Tracker
