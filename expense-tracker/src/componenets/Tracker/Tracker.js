import React from 'react';
import fire from '../../config/fire.js'
import './Tracker.css'
import Transaction from './Transaction'



class  Tracker extends React.Component {

    state = {
        transactions : [],
        money: 0.00,
        income:0.00,
        expense:0.00,

        transactionName: '',
        price: '',
        transactionType : '',
        currentUID: fire.auth().currentUser.uid

    }

    logout = ()=> {
        fire.auth().signOut();
    }

    handleTransactionName = input => (event) =>{
        console.log(input)
        this.setState({
            [input] : event.target.value !== "0" ? event.target.value: ""
        });
    }
    

    addnewTransaction = () => {
        const {transactionName, transactionType, price, currentUID, money, income, expense} = this.state;

        //validation 
        if(transactionName && transactionType && price){
            const BackUpState = this.state.transactions;
            BackUpState.push({
                id: BackUpState.length + 1,
                name: transactionName,
                type: transactionType,
                price: price,
                user_id: currentUID
            });

        fire.database().ref('Transactions/' + currentUID).push({            
                id: BackUpState.length  ,
                name: transactionName,
                type: transactionType,
                price: price,
                user_id: currentUID
        }).then((data) => {
            //sucess callback
            console.log('sucess callback')
            this.setState({
                transactions: BackUpState,
                money : transactionType === 'deposit' ? money + parseFloat(price) : money-parseFloat(price),
                income : transactionType === 'deposit' ? income + parseFloat(price) : income + 0,
                expense : transactionType === 'expense' ? money + parseFloat(price) : expense - 0,
                transactionName: '',
                transactionType: '',
                price: ''
            })
        }).catch((error) => {
            //error callback
            console.log('error', error)
        })

        

        }
    }


    componentWillMount(){
        const {currentUID, money, income, expense} = this.state;
        let totalMoney = money;
        let totalIncome = income;
        let totalExpense = expense;
        const BackUpState = this.state.transactions;
        fire.database().ref('Transactions/' + currentUID).once('value',
        (snapshot) => {
            // console.log(snapshot);
            snapshot.forEach((childSnapshot) => {

                totalMoney = 
                    childSnapshot.val().type === 'deposit' ? 
                    parseFloat(childSnapshot.val().price) + totalMoney
                    : totalMoney - parseFloat(childSnapshot.val().price);

                totalIncome = 
                    childSnapshot.val().type === 'deposit' ? 
                    parseFloat(childSnapshot.val().price) + totalIncome
                    : totalIncome - 0;

                totalExpense = 
                    childSnapshot.val().type === 'expense' ? 
                    parseFloat(childSnapshot.val().price) + totalExpense
                    : totalExpense - 0;
                
                BackUpState.push({
                    id: childSnapshot.val().id,
                    name: childSnapshot.val().name,
                    type: childSnapshot.val().type,
                    price: childSnapshot.val().price,
                    user_id: childSnapshot.val().user_id
                });
                // console.log(childSnapshot.val().name);
            });
            this.setState({
                transactions: BackUpState,
                money: totalMoney,
                income: totalIncome,
                expense:totalExpense
            });
        });
    }


    render(){
        var currentUser = fire.auth().currentUser;

    return (
        <div className='container'>
            <div className=''>
                <h3 className='header'> Expense Tracker </h3>
                 <hr /> <br />
                 <button className='logout' onClick={this.logout}> LogOut</button>
                <h4 className="displayuser">Welcome, {currentUser.displayName}</h4>
                <h4>Balance</h4>
                <h1>${this.state.money.toFixed(2)}</h1>
            </div>

            <div className='income-expense'>
                <div >
                    <h5>INCOME</h5>
                    <p id='money-plus' className='money plus'> ${this.state.income}</p>
                </div>
                <div >
                    <h5>EXPENSE</h5>
                    <p id='money-minus' className='money minus'> ${this.state.expense}</p>
                </div>
            </div>

            <div>
                <h4>History</h4>
                <hr />
                <ul className='list'>
                    {/* <li className='plus'>Salary <span>+10000000</span></li>
                    <li className='minus'>Movie Ticket <span>-100</span></li> */}

                    {
                        Object.keys(this.state.transactions).map((id) => (
                            <Transaction key={id}
                            type={this.state.transactions[id].type}
                            name={this.state.transactions[id].name}
                            price={this.state.transactions[id].price}
                            />
                        ))
                    }
                </ul>
            </div>

            <h4>Add new transaction</h4>
            <hr />
            <div className="newTransaction">
                
                <div className="transaction-text">
                    <h5>Text</h5>
                    <input type='text' placeholer="Enter Text...." name='transactionName'
                    value={this.state.transactionName}
                    onChange={this.handleTransactionName('transactionName')} />
                </div>
                <div className="displayflex">
                    <div className="inputGroup">
                        <select name="transactionType"
                        value={this.state.transactionType}
                        onChange={this.handleTransactionName('transactionType')}>
                            <option value="0">Type</option>
                            <option value="deposit" >Deposit</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className="textinput">
                        <input type="text" placeholder="Price" name="price"
                        value={this.state.price}
                        onChange={this.handleTransactionName('price')} />
                    </div>
                </div>
                <button onClick={() => this.addnewTransaction()} 
                className="addTransaction">+ Add Transaction</button>
            </div>
            
            
        </div>
    )
    }
}

export default Tracker
