const React = require('react');
const ReactDOM = require('react-dom');
const smartcontract = require('../../contract/build/contracts/Payment.json');
// const Web3 = require('web3');

class OrderCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drinks: [],
            shoppingCart: [],
            total: 0,
            users: 'Unknown',
            hideOrderButton: 'none',
            hideAddressForm: 'inline',
            address: '',
            billId: 0,
            lucky: 0,
            phone: 0,
        }
    }

    componentDidMount() {
        this.showDrink();
        this.socket();
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
                discount = result.toNumber() / 100;
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
    socket = () => {
        io.socket.get('/newOrder', function (resData) {
            console.log(resData);
        });
        io.socket.on('confirm', (msg) => {
            if (msg.status === 'confirmed') {
                this.handleButtonSubmit()
            }
        })
    }

    handleButtonAdd = (e) => {
        e.preventDefault();
        const { shoppingCart, discount } = this.state
        shoppingCart.map(item => {
            if (item.id == e.target.value) {
                item.quantity += 1
                item.total = item.quantity * item.price
            }
        })
        let total = shoppingCart.reduce((sum, item) => {
            return sum += item.total
        }, 0)
        total = total * discount
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
        total = total * discount
        this.setState({
            shoppingCart: shoppingCart,
            total: total,
        })
    }
    handleButtonCreateShopCart = (e) => {
        this.setState({
            hideOrderButton: 'flex',
            hideAddressForm: 'none'
        })
    }
    handleButtonSubmit = () => {
        let discount = 1;
        const { total, users, contractInstance, web3, lucky, orderId } = this.state
        let sender = web3.eth.accounts[0];
        let totalInEther = total * 0.036
        contractInstance.payBill.sendTransaction(lucky, discount, {
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
                            const form = new FormData();
                            form.append('id', orderId)
                            form.append('bills', msg.billId)
                            fetch('/updateOrderBill', {
                                method: 'PATCH',
                                body: form
                            });
                            this.state.shoppingCart.map(item => {
                                item.quantity = 0
                                item.total = 0
                            })

                        }
                        this.setState({
                            total: 0,
                            billId: msg.billId,
                            hideAddressForm: 'inline'
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

    updatePhone = (e) => {
        console.log(e.target.value)
        this.setState({
            phone: e.target.value
        });
    }

    updateLuckyNumber = (e) => {
        this.setState({
            lucky: e.target.value
        });
    }


    handleButtonOrder = (e) => {
        const { address, billId, shoppingCart, phone } = this.state
        e.preventDefault();
        let shippingcart = JSON.stringify(shoppingCart)
        const form = new FormData();
        form.append('cart', shippingcart)
        form.append('shippingAddress', address)
        form.append('phone', phone)
        fetch('http://localhost:1337/shop/shipping', {
            method: 'POST',
            body: form
        }).then((resp) => resp.json())
            .then(msg => {
                this.setState({
                    hideOrderButton: 'none',
                    orderId: msg.orderId
                })
            });
        alert("Please wait for the call from our Shop");
    }
    render() {
        const { drinks, discount, shoppingCart, hideOrderButton, total, hideAddressForm, address, phone } = this.state
        const buttonStyle = {
            width: '53px'
        }

        const orderstyle = {
            display: hideAddressForm,
        }

        const shipingStyle = {
            display: hideOrderButton
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
        let output = (a) => { return (a.toFixed(4)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }
        const outputTotal = output(total * 0.0036)
        let currentdiscount = discount * 100
        return (
            <div className="row">
                <div className="row" style={orderstyle}>
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
                                            <th>Quatity</th>
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
                            <h3>Current Discount: <span className="label label-info">{currentdiscount} % </span></h3>
                        </div>
                        <div className="row text-center padding-top-bot">
                            <h3>Total money : <span className="label label-info">{outputTotal} Ether</span></h3>
                        </div>
                        <div className="row padding-top-bot">
                            <div className="col-md-8 "><label className="text-danger" htmlFor="lucky">Choose a lucky number for a chance to get an eternal 1% voucher </label></div>
                            <div className="col-md-4">
                                <select name="luckyNumber" id="lucky" className="input-sm font16" size="1" onChange={this.updateLuckyNumber}>
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
                            <button type="submit" onClick={this.handleButtonCreateShopCart} className="btn btn-lg btn-success" > Create Cart</button >
                        </div>
                    </div>
                </div>
                <div className="row infoShipping" style={shipingStyle} >
                    <div className="form-group row">
                        <label htmlFor="address" className="col-md-2 col-form-label">Address</label>
                        <div className="col-md-8">
                            <input className="form-control" placeholder='Address...' id="address" type="text" value={address} onChange={this.updateAddress} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phone" className="col-md-2 col-form-label">Phone</label>
                        <div className="col-md-5">
                            <input type="tel" placeholder='Phone...' className="form-control" id="phone" value={phone} onChange={this.updatePhone} />
                        </div>
                        <div className="col-md-3 text-center">
                            <button className="btn btn-success" type="button" onClick={this.handleButtonOrder} > Order </button>
                        </div>
                    </div>

                </div>

            </div >
        )
    }
}


ReactDOM.render(<OrderCustomer />, document.querySelector('#Order-customer'));