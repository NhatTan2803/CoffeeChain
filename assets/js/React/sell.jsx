const React = require('react');
const ReactDOM = require('react-dom');


class Sell extends React.Component {
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

        fetch('/shop/drinks', { credentials: "same-origin" })
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
        const form = new FormData()
        form.append('total', total)
        form.append('cash', cash)
        form.append('change', change)
        form.append('users', users)
        fetch('/shop/sell', {
            method: 'POST',
            body: form
        }).then((resp) => resp.json())
            .then(mess => {
                if (mess.success === 'ok') {
                    this.state.shoppingCart.map(item => {
                        console.log(item.name)
                        const form = new FormData()
                        form.append('name', item.name)
                        form.append('quantity', item.quantity)
                        form.append('price', item.price)
                        form.append('drinkSubtotal', item.total)
                        form.append('bills', mess.billId)
                        form.append('drinks', item.id)
                        fetch('/shop/sell/billdetail', {
                            method: 'POST',
                            body: form
                        })
                    })
                    this.state.shoppingCart.map(item => {
                        item.quantity = 0
                        item.total = 0
                    })
                    this.setState({
                        cash: 0,
                        total: 0,
                        change: 0,
                        users: 'Unknown',
                    })

                }
            })

    }
    inputCash = (e) => {
        let cash = e.target.value
        cash = cash.replace(/[\D\s\._\-]+/g, "");
        cash = cash ? parseInt(cash, 10) : 0;

        let change = cash - this.state.total
        change < 0 ? change = 0 : change
        this.setState({
            cash: cash,
            change: change,
        })
    }
    inputCustomerId = (e) => {
        this.setState({
            users: e.target.value
        })
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
        const outputCash = output(cash)
        const outputChange = output(change)
        return (
            <div className="wrapper-md">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="panel panel-default">
                            <div className="panel-heading font-bold">List Drink</div>
                            <div className="panel-body">
                                <form >
                                    <div className="form-group">
                                        <table className="table table-striped m-b-none">
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
                                    <button type="button" className="btn btn-sm btn-primary">Order</button>
                                </form>
                            </div >
                        </div >
                    </div >
                    <div className="col-sm-7">
                        <div className="panel panel-default">
                            <div className="panel-heading font-bold">Detail bill</div>
                            <div className="panel-body">
                                <table className="table table-striped m-b-none">
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
                        <div className="payView">
                            <div >Total money : {outputTotal} VNĐ</div>
                            <div >
                                <span>Customer ID</span><input className="inputStyle" type="text" name="users" onChange={this.inputCustomerId} />
                            </div>
                            <div >
                                <span>Receive:</span><input className="inputStyle" type="text" name="cash" onChange={this.inputCash} value={outputCash} />
                            </div>
                            <div >
                                <span>Return:</span><input className="inputStyle" type="text" disabled value={outputChange} />
                            </div>
                            <div >
                                <button type="submit" onClick={this.handleButtonSubmit} className="btn btn-sm btn-primary" > Order drink </button >
                            </div>
                        </div>

                    </div >
                </div >
            </div >
        )
    }
}

ReactDOM.render(<Sell />, document.querySelector('#sell'));