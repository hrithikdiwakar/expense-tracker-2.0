import React from 'react';
import './Tracker.css'

class Transaction extends React.Component{
    render(){
        return(
            <li className={this.props.type === 'deposit'? 'plus' : 'minus'}>
                <div>{this.props.name}</div>  
                <div>{this.props.type === 'deposit' ? (
                <span className=""> +${this.props.price} </span>
            ) : (
                <span className="">
                    -${this.props.price}
                </span>
            )}</div>
                
            </li>
        )
    }
}

export default Transaction;