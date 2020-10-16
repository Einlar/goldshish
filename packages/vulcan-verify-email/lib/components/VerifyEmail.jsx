import { Components, withMutation, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { intlShape } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Link } from "react-router-dom";


class AccountsVerifyEmail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pending: true,
            error: null,
            verificationSent: false,
            verificationSending: false
        };
        this.resendVerification = this.resendVerification.bind(this)
    }

    async componentDidMount() {
        const token = this.props.match.params.token;

        var result = await this.props.verifyUserEmail({ token }).catch(e => {
            this.setState({
                pending: false,
                error: e.message
            });
        })

        if (result) {
            console.log(result)
            this.setState({
                pending: false,
                error: null
            });
        }

    }

    async resendVerification() {

        if (this.state.verificationSending) {
            return false
        }
        if (this.state.verificationSent) {
            return false
        }

        this.setState({
            verificationSending: true,
            verificationSent: false
        })

        var result = await this.props.resendVerification().catch(e => {
            this.setState({
                pending: false,
                error: e.message,
                verificationSending: false,
                verificationSent: false
            });
        })

        if (result) {

            if (result.data.resendVerification == 2) {
                //user is already verified
                this.setState({
                    pending: false,
                    error: null,
                    verificationSending: false,
                    verificationSent: false
                });

            } else if (result.data.resendVerification == true) {
                this.setState({
                    pending: false,
                    // error: null,
                    verificationSending: false,
                    verificationSent: true
                });
            }
        }
    }

    render() {

        return (

            <div className="bg-offwhite default-screen">
                { /* <Components.HeaderNav /> */ }

                <div className="flex content-center h-full w-full pt-20 mb-16">

                    {/* main container */}
                    <div className="pt-3 pb-10 w-full max-w-full-xl mx-auto">
                        <div className="py-6 w-full px-3">
                            <div className="mb-2">
                                {/* <div className="px-6"><h1 className="text-2xl text-gray-800 font-bold ">Home</h1></div> */}
                                <h1 className="text-3xl text-gray-900 font-bold ">
                                    Verify your email
                                    {/* {this.props.currentUser ? "Hi, " + toTitleCase(this.props.currentUser.username) : "Welcome, guest"} */}
                                </h1>
                            </div>
                        </div>

                        <div className="w-full px-3">

                            <div className="block relative text-gray-800 font-normal text-base mb-1">
                                <div className="">
                                    <div className="p-6 rounded-lg bg-gray-100">

                                        {/* if the user is verified already (in the user group)*/}
                                        {Users.isMemberOf(this.props.currentUser, 'verifiedEmail') ?
                                            <div className='password-reset-form'>
                                                <h1 className="text-xl text-gray-800">You're already verified 🎉</h1>
                                                <h2 className="text-m text-gray-700 mt-3">
                                                    {this.context.intl.formatMessage({ id: 'accounts.email_verified' })}
                                                </h2>
                                                <Link to="/">
                                                    <button
                                                        onClick={this.resendVerification}
                                                        type="submit"
                                                    >
                                                        Continue
                                                    </button>
                                                </Link>
                                            </div>
                                            :
                                            /* if email has been sent */
                                            this.state.verificationSent ?

                                                <div className='password-reset-form'>
                                                    <h2>Please check your email</h2>
                                                    <p>
                                                        A confirmation email has been sent to <span className="font-semibold">{this.props.currentUser.email}</span>.<br />Please click the confirmation link in the email to activate your account. 
                                                    </p>
                                                    <p>
                                                        It won't arrive instantly, but it should take less than 10 minutes.
                                                        Please check also your <strong>spam</strong> folder.
                                                    </p>
                                                </div>

                                                : this.state.error ?
                                                    //    if there was an error
                                                    <div className="">
                                                        <p>An e-mail has been sent to the address indicated during registration. It won't arrive instantly, but it should take less than 10 minutes.
                                                            Please check also your <strong>spam</strong> folder.</p>
                                                        <p>If, even after waiting 10 minutes, you did not receive anything, you can try resending the verification with the button below.</p>
                                                        { /* <h2 className="text-m text-gray-700 mt-3">{this.state.error.replace('GraphQL error:', '')}.</h2> */ }

                                                        {/* if user is logged in, resend the email */}
                                                        {this.props.currentUser ?
                                                            (<button
                                                                onClick={this.resendVerification}
                                                                type="submit"
                                                            >
                                                                {this.state.verificationSending ?
                                                                    'Sending...' :
                                                                    this.state.verificationSent ?
                                                                        'Sent' : 'Resend Verification'}
                                                            </button>) : 'Please log-in before trying to resend the verification e-mail.'
                                                        }
                                                        <p>If the problem persist, please inform the administrator by writing a mail at francesco.manzali@studenti.unipd.it</p>
                                                        <p>(Sorry for the problem, programming ain't easy)</p>

                                                        {/* </Link> */}
                                                    </div> :
                                                    this.state.pending ? <p>Loading...</p> :
                                                        <div className='password-reset-form'>
                                                            <h1 className="text-xl text-gray-800">Verification Successful 🎉</h1>
                                                            <h2 className="text-m text-gray-700 mt-3">
                                                                {this.context.intl.formatMessage({ id: 'accounts.email_verified' })}
                                                            </h2>
                                                            <Link to="/">
                                                                <button
                                                                    onClick={this.resendVerification}
                                                                    type="submit"
                                                                    className="button"
                                                                >
                                                                    Continue
                                                        </button>
                                                            </Link>
                                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}

            </div>)
    }
}

AccountsVerifyEmail.contextTypes = {
    intl: intlShape
};

AccountsVerifyEmail.propsTypes = {
    currentUser: PropTypes.object,
    match: PropTypes.object.isRequired,
};

AccountsVerifyEmail.displayName = 'AccountsEnrollAccount';

const verifyUserEmail = {
    name: 'verifyUserEmail',
    args: { token: 'String' }
};
const resendVerification = {
    name: 'resendVerification',
    args: { userId: 'String' }
};

registerComponent('AccountsVerifyEmail',
    AccountsVerifyEmail, withCurrentUser,
    [withMutation, verifyUserEmail],
    [withMutation, resendVerification],
    withRouter);