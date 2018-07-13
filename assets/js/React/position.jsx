const React = require('react');
const ReactDOM = require('react-dom');

class Position extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: [],
            submit: false,
        }
    }
    componentDidMount() {
        this.showPosition()
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target)
        form.append('shops', this.state.shop[0].id)
        fetch('/shop/position', {
            method: 'POST',
            body: form
        }).then(() => this.showPosition())
    }
    showPosition() {
        fetch('/shop/position', { credentials: "same-origin" })
            .then((resp) => resp.json())
            .then(shop => {
                this.setState({
                    shop: shop,
                    position: shop[0].positions,
                })
            })
    }
    render() {
        const { position } = this.state
        const role = position.map(item => {
            return (
                <tr key={item.id} >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                        <button className="btn btn-xs btn-danger">Xoá</button>
                    </td>
                </tr>
            )
        })
        return (
            <div className="wrapper-md">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="panel panel-default">
                            <div className="panel-heading font-bold">Thêm vị trí</div>
                            <div className="panel-body">
                                <form onSubmit={e => this.handleSubmit(e)} >
                                    <div className="form-group">
                                        <label>Tên vị trí</label>
                                        <input id="position-name" type="text" name="name" className="form-control" placeholder="Tên vị trí" />
                                    </div>
                                    <button type="submit" className="btn btn-sm btn-primary">Thêm</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="panel panel-default">
                            <div className="panel-heading font-bold">Danh sách vị trí</div>
                            <div className="panel-body">
                                <table className="table table-striped m-b-none">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Vị trí</th>
                                            <th>Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {role}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

ReactDOM.render(<Position />, document.querySelector('#position'));
