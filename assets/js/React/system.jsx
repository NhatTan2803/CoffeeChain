const React = require('react');
const ReactDOM = require('react-dom');
class System extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            system: [],
            submit: false,
        }
    }
    componentDidMount() {
        this.showSystem()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target)
        fetch('/system', {
            method: 'POST',
            body: form
        }).then(() => this.showSystem())
    }
    showSystem() {
        fetch('/system')
            .then((resp) => resp.json())
            .then(system => {
                this.setState({
                    system: system,
                })
            })
    }
    render() {
        const buttonStyle = {
            width: '53px'
        }
        const { system } = this.state
        const allSystem = system.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>
                        <button style={buttonStyle} className="btn btn-xs btn-danger">Delete</button>
                        <button className="btn btn-xs btn-info" data-toggle="modal" data-target="#systemModal">Chi Tiết</button>
                    </td>
                </tr>
            )
        })
        return (
            <div className="wrapper-md">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="panel panel-default">
                            <div className="panel-heading font-bold"> System</div>
                            <div className="panel-body">
                                <form onSubmit={this.handleSubmit} >
                                    <div className="form-group">
                                        <label>System name</label>
                                        <input id="system_name" type="text" name="name" className="form-control" placeholder="System name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input id="system_address" type="text" name="address" className="form-control" placeholder="Address" />
                                    </div>
                                    <button type="submit" className="btn btn-sm btn-primary"></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="panel panel-default">
                            <div className="panel-heading font-bold">List system</div>
                            <div className="panel-body">
                                <table className="table table-striped m-b-none">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>System</th>
                                            <th>Address</th>
                                            <th>Acction</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allSystem}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        )
    }

}
ReactDOM.render(<System />, document.querySelector('#system'));
