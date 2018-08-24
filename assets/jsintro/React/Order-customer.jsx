const React = require('react');
const ReactDOM = require('react-dom');
const TruffleContract = require('truffle-contract');
const smartcontract = require('../../contract/build/contracts/Payment.json');
class OrderCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drinks: [],
            order: false,
            shoppingCart: [],
            total: 0,
            users: 'Unknown',
        }
    }

    componentDidMount() {
        this.showDrink();
        let web3 = window.web3;
        let data = TruffleContract(smartcontract);
        data.setProvider(web3.currentProvider);
        this.setState({
            web3: web3,
            data : data
        })
    }
    showDrink = () => {
        fetch('/drinks/listDrinkForCus', { credentials: "same-origin" })
            .then((resp) => resp.json())
            .then(drink => {
                const shoppingCart = drink
                shoppingCart.map(item => {
                    item.quantity = 0
                    item.total = 0
                })
                this.setState({
                    drinks: drink,
                    shoppingCart: shoppingCart,
                })
            })
    }
    handleButtonAdd = (e) => {
        e.preventDefault();
        const { shoppingCart, cash } = this.state
        shoppingCart.map(item => {
            if (item.id == e.target.value) {
                item.quantity += 1
                item.total = item.quantity * item.price
            }
        })
        let total = shoppingCart.reduce((sum, item) => {
            return sum += item.total
        }, 0)
        total = total * 0.0036;
        let change = cash - total
        change < 0 ? change = 0 : change
        this.setState({
            shoppingCart: shoppingCart,
            total: total,
            change: change
        })
    }
    handleButtonDelete = (e) => {
        e.preventDefault();
        const { shoppingCart, cash } = this.state
        shoppingCart.map(item => {
            if (item.id == e.target.value) {
                item.quantity -= 1
                item.total = item.quantity * item.price
            }
        })
        let total = shoppingCart.reduce((sum, item) => {
            return sum += item.total
        }, 0)
        total = total * 0.0036;
        let change = cash - total
        change < 0 ? change = 0 : change
        this.setState({
            shoppingCart: shoppingCart,
            total: total,
            change: change
        })
    }
    handleButtonSubmit = (e) => {
        let number = 1;
        let discount = 2;
        const { total, cash, change, users, data, web3 } = this.state
        e.preventDefault();
        let address = "0x7f580be20ccc4609fc43f90d98ddaa0d271b63ef";
        let sender = web3.eth.accounts[0];
        data.at(address).then(function (instance) {
            console.log(instance);
            return instance.payBill.sendTransaction(number,discount, {
                from: sender,
                value: web3.toWei(total,"ether"),
                gas:30000
            }), function(err, res){
                
            };
            
        }).then(function (result) {
            console.log(result);
            // Do something with the result or continue with more transactions.
        });

        // const form = new FormData();
        // form.append('total', total)
        // form.append('cash', cash)
        // form.append('change', change)
        // form.append('users', users)
        // fetch('/shop/sell', {
        //     method: 'POST',
        //     body: form
        // }).then((resp) => resp.json())
        //     .then(mess => {
        //         if (mess.success === 'ok') {
        //             this.state.shoppingCart.map(item => {

        //                 const form = new FormData()
        //                 form.append('name', item.name)
        //                 form.append('quantity', item.quantity)
        //                 form.append('price', item.price)
        //                 form.append('drinkSubtotal', item.total)
        //                 form.append('bills', mess.billId)
        //                 form.append('drinks', item.id)
        //                 fetch('/shop/sell/billdetail', {
        //                     method: 'POST',
        //                     body: form
        //                 })
        //             })
        //             this.state.shoppingCart.map(item => {
        //                 item.quantity = 0
        //                 item.total = 0
        //             })
        //             this.setState({
        //                 cash: 0,
        //                 total: 0,
        //                 change: 0,
        //                 users: 'Unknown',
        //             })

        //         }
        //     })

    }
    render() {
        const { drinks, shoppingCart, change, cash, total } = this.state
        const buttonStyle = {
            width: '53px'
        }
        const drinkList = drinks.map(drink => {
            return (
                <tr key={drink.id} >
                    <td>{drink.id}</td>
                    <td>{drink.name}</td>
                    <td>{drink.price}</td>
                    <td>
                        <button style={buttonStyle} onClick={this.handleButtonAdd} className="btn btn-xs btn-info" value={drink.id}>chọn</button>
                    </td>
                </tr>
            )
        })
        const bill = shoppingCart.map(item => {
            if (item.quantity > 0) {
                return (
                    <tr key={item.id} >
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.total}</td>
                        <td>
                            <button style={buttonStyle} onClick={this.handleButtonDelete} className="btn btn-xs btn-danger" value={item.id} >Giảm</button>
                        </td>
                    </tr>
                )
            }
        })
        let output = (a) => { return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }
        const outputTotal = output(total)
        return (
            <div className="row">
                <div className="col-md-5 product-bottom">
                    <div className="categories animated wow fadeInUp animated" >
                        <div >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {drinkList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 animated wow fadeInRight" >
                    <div className="categories animated wow fadeInUp animated" >
                        <div >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Quality</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bill}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="container">
                        <div className="col-sm-3 social-ic">
                            <div >Total money : {outputTotal} Ether</div>
                        </div>
                        <div className="col-sm-3 social-ic">
                            <button type="submit" onClick={this.handleButtonSubmit} className="btn btn-sm btn-primary" > Order drink </button >
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<OrderCustomer />, document.querySelector('#Order-customer'));