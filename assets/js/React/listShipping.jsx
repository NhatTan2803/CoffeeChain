const React = require('react');
const ReactDOM = require('react-dom');
import Modal from './modal';
const TimeAgo = require('javascript-time-ago');
import en from 'javascript-time-ago/locale/en';
TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

class Shipping extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }
    componentDidMount() {
        io.socket.get('/newOrder', function (resData) {
            console.log(resData);
        });
        io.socket.on('new', (msg) => {
            if (msg) {
                if (!this.state.orders) {
                    msg.cart = JSON.parse(msg.cart);
                    let orders = [msg];
                    this.setState({
                        orders: orders
                    })
                }
                else {
                    let orders = this.state.orders;
                    msg.cart = JSON.parse(msg.cart);
                    orders.push(msg);
                    this.setState({
                        orders: orders
                    })
                }
            }
        });
        io.socket.on('billId', (msg) => {
            const { orders } = this.state;
            let updatedOrder = orders.map(order => {
                if (order.id === msg.id) {
                    order.bills = msg.billId
                }
                return order;
            })  
            this.setState({
                orders: updatedOrder
            })
        });
    }

    handleConfirmButton = (e) => {
        e.preventDefault();
        const { orders } = this.state
        const form = new FormData();
        form.append('id', e.target.value)
        form.append('status', 'confirmed')
        fetch('/updateOrder', {
            method: 'PATCH',
            body: form
        })
    }

    handleCompleteButton = (e) => {
        e.preventDefault();
        const { orders } = this.state
        const form = new FormData();
        form.append('id', e.target.value)
        form.append('status', 'completed')
        fetch('/updateOrder', {
            method: 'PATCH',
            body: form
        }).then((resp) => resp.json())
            .then(msg => {
                if (orders.length > 1) {
                    for (let i = 0; i < orders.length; i++) {
                        if (orders[i].id === msg.id) {
                            let begin = orders.slice(0, i)
                            let end = orders.slice(i + 1, orders.length)
                            let newOrders = begin.concat(end)
                            this.setState({
                                orders: newOrders
                            })
                            break;
                        }
                    }
                }
                else {

                    this.setState({
                        orders: []
                    })
                }
            })

    }

    render() {
        const { orders } = this.state
        let view;
        if (orders.length > 0) {
            let allOrder = orders.map(order => {
                return (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.bills}</td>
                        <td>{order.shippingAddress}</td>
                        <td>{order.phone}</td>
                        <td>
                            <Modal drinks={order.cart} orderId={order.id} />
                        </td>
                        <td>
                            <button className="btn btn-xs btn-danger" value={order.id} onClick={this.handleConfirmButton}>Confirm</button>
                            <button className="btn btn-xs btn-info" value={order.id} onClick={this.handleCompleteButton} >Complete</button>
                        </td>
                        <td>
                            {timeAgo.format(Date.now() - (Date.now() - order.createdAt) * 1000)}
                        </td>
                    </tr >
                )
            })
            view = allOrder;
        }
        return (
            <div className="wrapper-md" >
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div>
                                <div className="panel-heading">
                                    <div className="panel-body">
                                        <table className="table table-striped b-light table-bordered table-hover table-text-center">
                                            <thead>
                                                <tr>
                                                    <th >STT</th>
                                                    <th >BillID</th>
                                                    <th>Address</th>
                                                    <th>Phone</th>
                                                    <th >Info</th>
                                                    <th >Status</th>
                                                    <th >Time</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {view}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

ReactDOM.render(<Shipping />, document.querySelector('#shipping'));