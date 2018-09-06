const React = require('react');

const Modal = (props) => {

    let detail = (props.drinks).map(drink => {
        if (drink.quantity > 0) {
            return (
                <tr key={drink.id} >
                    <td>{drink.id}</td>
                    <td>{drink.name}</td>
                    <td>{drink.price}</td>
                    <td>{drink.quantity}</td>
                </tr>
            )
        }
    })
    let index = props.orderId
    let target = "#"
    let modalid = target.concat(index);
    return (
        <div>
            <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target={modalid} >Info</button>
            <div className="modal fade" id={props.orderId} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Total : {props.total}</h4>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th >ID</th>
                                        <th >Drink</th>
                                        <th >Price</th>
                                        <th >Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detail}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
