const React = require('react');
const ReactDOM = require('react-dom');

class OrderCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drinks: [],
            cash: 0,
            shoppingCart: [],
            total: 0,
            change: 0,
            users: 'Unknown',
        }
    }

    componentDidMount() {
        this.showDrink()
    }
    showDrink = () => {
        fetch('/drinks/listDrinkForCus', { credentials: "same-origin" })
            .then((resp) => resp.json())
            .then(drink => {
                const shoppingCart = drink
                console.log(shoppingCart);
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
        let change = cash - total
        change < 0 ? change = 0 : change
        this.setState({
            shoppingCart: shoppingCart,
            total: total,
            change: change
        })
    }
    handleButtonSubmit = (e) => {
        const { total, cash, change, users } = this.state
        e.preventDefault();
        // const form = new FormData()
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
        //                 console.log(item.name)
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
                            <div >Total money : {outputTotal} VNĐ</div>
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