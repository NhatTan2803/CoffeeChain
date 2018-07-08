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
        const { shoppingCart } = this.state
        shoppingCart.map(item => {
            if (item.id == e.target.value) {
                item.quantity += 1
                item.total = item.quantity * item.price
            }
        })
        let total = this.state.shoppingCart.reduce((sum, item) => {
            return sum += item.total
        }, 0)
        let change = this.state.cash - this.state.total
        change < 0 ? change = 0 : change
        this.setState({
            shoppingCart: shoppingCart,
            total: total,
            change: change
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

        this.setState({
            shoppingCart: shoppingCart,
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
                    this.setState({
                        cash: 0,
                        total: 0,
                        change: 0,
                        users: 'Unknown',
                        shoppingCart: [],
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
        const { drinks,shoppingCart, change, cash, total } = this.state
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
                                                    <th>Tên</th>
                                                    <th>Giá</th>
                                                    <th>Tác vụ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {drinkList}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button type="button" className="btn btn-sm btn-primary">Thêm</button>
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
                                            <th>Tên</th>
                                            <th>Số Lượng</th>
                                            <th>Đơn Giá</th>
                                            <th>Thành Tiền</th>
                                            <th>Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bill}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="payView">
                            <div >Tổng tiền : {outputTotal} VNĐ</div>
                            <div >
                                <span>Mã khách hàng:</span><input className="inputStyle" type="text" name="users" onChange={this.inputCustomerId} />
                            </div>
                            <div >
                                <span>Tiền khách trả:</span><input className="inputStyle" type="text" name="cash" onChange={this.inputCash} value={outputCash} />
                            </div>
                            <div >
                                <span>Tiền trả khách:</span><input className="inputStyle" type="text" disabled value={outputChange} />
                            </div>
                            <div >
                                <button type="submit" onClick={this.handleButtonSubmit} className="btn btn-sm btn-primary" > Thanh Toán</button >
                            </div>
                        </div>

                    </div >
                </div >
            </div >
        )
    }
}
let output = (a) => { return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }
ReactDOM.render(<Sell />, document.querySelector('#sell'));