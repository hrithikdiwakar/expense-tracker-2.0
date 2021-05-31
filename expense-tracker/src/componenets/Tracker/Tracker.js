import React from 'react';
import fire from '../../config/fire.js'
import './Tracker.css'



class  Tracker extends React.Component {

    logout = ()=> {
        fire.auth().signOut();
    }
    render(){

    return (
        <div className='container'>
            <div className=''>
                <h3> Expense Tracker </h3>
                <h4>Balance</h4>
                <h1>$0.00</h1>
            </div>

            <div className='income-expense'>
                <div >
                    <h5>INCOME</h5>
                    <p id='money-plus' className='money plus'> +$0.00</p>
                </div>
                <div >
                    <h5>EXPENSE</h5>
                    <p id='money-minus' className='money minus'> -$0.00</p>
                </div>
            </div>

            <div>
                <h4>History</h4>
                <hr />
                <ul className='list'>
                    <li className='plus'>Salary <span>+10000000</span></li>
                    <li className='minus'>Movie Ticket <span>-100</span></li>
                </ul>
            </div>

            <div>
                <h4>Add new transaction</h4>
                <hr />
                <div className="transaction-text">
                    <h5>Text</h5>
                    <input type='text' placeholer="Enter Text...." />
                </div>
                <div className="new-transaction">
                    <div>
                        <select name="type">
                            <option value="0">Type</option>
                            <option value="deposit">Deposit</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" placeholder="Price" name="price" />
                    </div>
                </div>
            </div>



            

            
            
            
            
            {/* <button onClick={this.logout}> Logout</button> */}
        </div>
    )
    }
}

export default Tracker
