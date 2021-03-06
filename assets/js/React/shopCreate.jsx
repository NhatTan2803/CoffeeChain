const React = require('react');
const ReactDOM = require('react-dom');
class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: '', imagePreviewUrl: '' };
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        const styles = {
            textAlign: "center",
            height: "100%",
            width: "100%",
            border: "1px solid gray",
        }
        const imgstyle = {
            width: "100%",
            height: "100%"
        }
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style={imgstyle} />);
        } else {
            $imagePreview = (<div style={styles} ></div>);
        }

        return (
            <div className="wrapper-md">
                <div className="row">
                    <div className="col-sm-3 col-xs-12 col-md-2 staff-avatar-wapper">
                        <div className="panel panel-default">
                            <div className="panel-heading font-bold">Image</div>
                            <div className="panel-body" >
                                <div >
                                    {$imagePreview}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9 col-xs-12 col-md-10">
                        <div className="panel panel-default">
                            <div className="panel-heading font-bold">Thêm</div>
                            <div className="panel-body">
                                <form id="addShop" method="POST" action="/admin/newshop" encType="multipart/form-data">
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label>Shop name</label>
                                            <input id="shop-name" type="text" name="name" className="form-control" placeholder=" Shop name" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label>Address email</label>
                                            <input id="shop-email" type="email" name="email" className="form-control" placeholder=" email" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input id="shop-phone" type="text" name="phone" className="form-control" placeholder=" Phone" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label>From</label>
                                            <input id="dayFrom" type="date" name="dayFrom" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label>To</label>
                                            <input id="dayTo" type="date" name="dayTo" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input id="shop-address" type="text" name="address" className="form-control" placeholder=" Address" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label>Choose Image</label>
                                            <input className="form-control" onChange={(e) => this._handleImageChange(e)} name="photo" type="file" accept=".jpg, .jpeg, .png" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="panel-footer">
                                <button type="submit" className="btn btn-primary btn-block" form='addShop'>Add shop</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<ImageUpload />, document.getElementById("bossCreate"));