const React = require('react');
const ReactDOM = require('react-dom');
import Modal from './modal';
const TimeAgo = require('javascript-time-ago');

// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en';

// Add locale-specific relative date/time formatting rules.
TimeAgo.locale(en);

// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US');

class Shipping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        io.socket.get('/newOrder', function (resData) {
            console.log(resData);
        });
        io.socket.on('new', (msg) => {
            if (msg) {
                // console.log();
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
    }


    render() {
        const { orders } = this.state
        const tableStyle = {
            width: '120px'
        }
        let view;
        if (typeof orders !== 'undefined') {
            let allOrder = orders.map(order => {
                return (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.shippingAddress}</td>
                        <td>{order.phone}</td>
                        <td>
                            <Modal drinks={order.cart} orderId={order.id} />
                        </td>
                        <td>
                            <button className="btn btn-xs btn-danger">Confirm</button>
                            <button className="btn btn-xs btn-info">Complete</button>
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