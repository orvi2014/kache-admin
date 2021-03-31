import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDiscount } from "../../actions/discountActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class DiscountAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            title: "",
            imagePublicId: "",
            link: "",
            creator: "Kache",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        console.log(nextProps);
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined) {
            $('#add-discount-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onDiscountAdd = e => {
        e.preventDefault();
        const newDiscount = {
            title: this.state.title,
            imagePublicId: this.state.imagePublicId,
            link: this.state.link,
            creator: this.state.creator
        };
        this.props.addDiscount(newDiscount, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-discount-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Discounts</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onDiscountAdd} id="add-discount">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Title</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.title}
                                                id="title"
                                                type="text"
                                                error={errors.title}
                                                className={classnames("form-control", {
                                                    invalid: errors.title
                                                })}/>
                                            <span className="text-danger">{errors.title}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Image Public Id</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.imagePublicId}
                                                error={errors.imagePublicId}
                                                id="imagePublicId"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.imagePublicId
                                                })}
                                            />
                                            <span className="text-danger">{errors.imagePublicId}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="password">Link</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.link}
                                                error={errors.link}
                                                id="link"
                                                type="link"
                                                className={classnames("form-control", {
                                                    invalid: errors.link
                                                })}
                                            />
                                            <span className="text-danger">{errors.link}</span>
                                        </div>
                                    </div>
                                    {/* <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="password2">Confirm Password</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.password2}
                                                id="password2"
                                                type="password"
                                                className={classnames("form-control", {
                                                    invalid: errors.password2
                                                })}
                                            />
                                            <span className="text-danger">{errors.password2}</span>
                                        </div>
                                    </div> */}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-discount"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Discount
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DiscountAddModal.propTypes = {
    addDiscount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addDiscount }
)(withRouter(DiscountAddModal));
