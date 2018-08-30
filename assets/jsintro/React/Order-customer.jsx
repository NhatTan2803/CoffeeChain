const React = require('react');
const ReactDOM = require('react-dom');
const smartcontract = require('../../contract/build/contracts/Payment.json');
const Cookies = require('js-cookie');
// const Web3 = require('web3');

class OrderCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drinks: [],
            shoppingCart: [],
            total: 0,
            users: 'Unknown',
            hideOrderButton: false,
            hideAddressForm: 'none',
            address: '',
            billId: 0,
        }
    }

    componentDidMount() {
        this.showDrink();
        let web3 = window.web3;
        let contract = web3.eth.contract(smartcontract.abi);
        let contractInstance = contract.at("0x0c6973faa571d67e6e813827b4dcb638090f719f");
        let sender = web3.eth.accounts[0];
        let discount;
        contractInstance.getDiscount.call(sender, (err, result) => {
            if (err) {
                return 0;
            }
            else {
                discount = result.toNumber();
                this.setState({
                    discount: discount,
                    web3: web3,
                    contractInstance: contractInstance
                });
            }
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
        const { shoppingCart } = this.state
        shoppingCart.map(item => {
            if (item.id == e.target.value) {
                item.quantity += 1
                item.total = item.quantity * item.price
            }
        })
        let total = shoppingCart.reduce((sum, item) => {
            return sum += item.total
        }, 0)
        this.setState({
            shoppingCart: shoppingCart,
            total: total,
        })
    }

    handleButtonDelete = (e) => {
        e.preventDefault();
        const { shoppingCart } = this.state
        shoppingCart.map(item => {
            if (item.id == e.target.value) {
                item.quantity -= 1
                item.total = item.quantity * item.price
            }
        })
        let total = shoppingCart.reduce((sum, item) => {
            return sum += item.total
        }, 0)
        this.setState({
            shoppingCart: shoppingCart,
            total: total,
        })
    }

    handleButtonSubmit = (e) => {
        let number = 1;
        let discount = 1;
        const { total, users, contractInstance, web3 } = this.state
        e.preventDefault();
        let sender = web3.eth.accounts[0];
        let totalInEther = total * 0.0036;
        contractInstance.payBill.sendTransaction(number, discount, {
            from: sender,
            value: web3.toWei(totalInEther, "ether"),
            gas: 300000
        }, (err, result) => {
            if (err) {
                console.log('Reject');
            }
            else {
                console.log('Waiting for transaction to be authenticated');
            }
        });
        contractInstance.transferEther().watch((err, event) => {
            if (err) {
                console.log('Error', err);
            }

            if ((event.args._value.toNumber()).toString() === web3.toWei(totalInEther, "ether")) {
                const form = new FormData();
                form.append('total', total)
                form.append('users', users)
                fetch('/shop/sell', {
                    method: 'POST',
                    body: form
                }).then((resp) => resp.json())
                    .then(msg => {
                        if (msg.success === 'ok') {
                            this.state.shoppingCart.map(item => {
                                if (item.quantity !== 0) {
                                    const form = new FormData()
                                    form.append('name', item.name)
                                    form.append('quantity', item.quantity)
                                    form.append('price', item.price)
                                    form.append('drinkSubtotal', item.total)
                                    form.append('bills', msg.billId)
                                    form.append('drinks', item.id)
                                    fetch('/shop/sell/billdetail', {
                                        method: 'POST',
                                        body: form
                                    });
                                }
                            })
                            this.state.shoppingCart.map(item => {
                                item.quantity = 0
                                item.total = 0
                            })

                        }
                        this.setState({
                            total: 0,
                            hideOrderButton: true,
                            hideAddressForm: 'inline',
                            billId: msg.billId,
                        })

                    })
            }

        })
    }
    updateAddress = (e) => {
        this.setState({
            address: e.target.value
        });
    }

    handleButtonOrder = (e) => {
        const { address, billId } = this.state
        e.preventDefault();
        const form = new FormData();
        form.append('shippingAddress', address)
        form.append('billId', billId)
        fetch('http://localhost:1337/shop/shipping', {
            method: 'POST',
            body: form
        }).then((resp) => resp.json())
            .then(msg => {
                console.log(msg.order)
            });
        this.setState({
            hideOrderButton: false,
            hideAddressForm: 'none',
        })

    }
    render() {
        const { drinks, discount, shoppingCart, hideOrderButton, total, hideAddressForm, address } = this.state
        const buttonStyle = {
            width: '53px'
        }
        const shipingStyle = {
            display: hideAddressForm
        }
        const drinkList = drinks.map(drink => {
            return (
                <tr key={drink.id} >
                    <td>{drink.id}</td>
                    <td>{drink.name}</td>
                    <td>{drink.price}</td>
                    <td>
                        <button style={buttonStyle} onClick={this.handleButtonAdd} className="btn btn-xs btn-info" value={drink.id}>+</button>
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
                            <button style={buttonStyle} onClick={this.handleButtonDelete} className="btn btn-xs btn-danger" value={item.id} >-</button>
                        </td>
                    </tr>
                )
            }
        })
        let output = (a) => { return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }
        const outputTotal = output(total * 0.0036)
        return (
            <div className="row">
                <div className="col-md-5 product-bottom"  >
                    <div className="categories animated wow fadeInUp animated" >
                        <div >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Drinks</th>
                                        <th>$</th>
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
                    <div className="row categories animated wow fadeInUp animated" >
                        <div >
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Drinks</th>
                                        <th>Quality</th>
                                        <th>$</th>
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
                    <div className="row text-center padding-top-bot">
                        <h3>Current Discount: <span className="label label-info">{discount} % </span></h3>
                    </div>
                    <div className="row text-center padding-top-bot">
                        <h3>Total money : <span className="label label-info">{outputTotal} Ether</span></h3>
                    </div>
                    <div className="row padding-top-bot">
                        <div className="col-md-8 "><label className="text-danger" htmlFor="lucky">Choose a lucky number for a chance to get an eternal 1% voucher </label></div>
                        <div className="col-md-4">
                            <select name="luckyNumber" id="lucky" className="input-sm font16" size="1">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12 text-center">
                        <button type="submit" onClick={this.handleButtonSubmit} className="btn btn-lg btn-success" disabled={hideOrderButton}> Pay Bill </button >
                    </div>
                </div>
                <div className="row" style={shipingStyle}>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Your address for shipping . . ." value={address} onChange={this.updateAddress} />
                        <span className="input-group-btn"><button className="btn btn-success" type="button" onClick={this.handleButtonOrder} > Order </button></span>
                    </div>
                </div>
            </div >
        )
    }
}


ReactDOM.render(<OrderCustomer />, document.querySelector('#Order-customer'));