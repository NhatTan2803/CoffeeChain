class System extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systems: [],
            submit: false,
        }
    }
    componentDidMount() {
        this.showSystems()
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target)
        fetch('/system', {
            method: 'POST',
            body: form
        }).then(() => this.showSystems())
    }
    showSystems() {
        fetch('/system', { credentials: "same-origin" })
            .then((resp) => resp.json())
            .then(systems => {
                this.setState({
                    systems: systems,
                })
            })
    }
    render() {
        const { systems } = this.state
        const results = systems.map(item => {
            return (
                <tr key={item.id} >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>
                        <button className="btn btn-xs btn-danger">Xoá</button>
                        <button class="btn btn-xs btn-info">Chi Tiết</button>
                    </td>
                </tr>
            )
        });
        return (
            <div class="wrapper-md">
                <div class="row">
                    <div class="col-sm-5">
                        <div class="panel panel-default">
                            <div class="panel-heading font-bold">Thêm hệ thống quán</div>
                            <div class="panel-body">
                                <form onSubmit={e => this.handleSubmit(e)} >
                                    <div class="form-group">
                                        <label>Tên hệ thống</label>

                                        <input id="system-name" type="text" name="name" class="form-control" placeholder="Tên hệ thống" />
                                    </div>
                                    <div class="form-group">
                                        <label>Địa chỉ của hệ thống chung</label>

                                        <input id="system-address" type="text" name="address" class="form-control" placeholder="Địa chỉ" />
                                    </div>
                                    <button type="submit" class="btn btn-sm btn-primary">Thêm</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-7">
                        <div class="panel panel-default">
                            <div class="panel-heading font-bold">Danh sách hệ thống</div>
                            <div class="panel-body">
                                <table class="table table-striped m-b-none">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Hệ thống</th>
                                            <th>Địa chỉ</th>
                                            <th>Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<System />, document.querySelector('#system'));