import React, {Component} from 'react';
import axios from 'axios';
import {Label, Button} from 'semantic-ui-react';
import {textStyle, clickStyle, listStyle} from './userMenu.module.scss';

class UserMenu extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: 'undefined',
        }
    }

    componentDidMount() {
        axios.get('api/auth/currentUser')
        .then(res => {
            if (res.data.message === 'success') {
                this.setState({
                    currentUser: res.data.data,
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.currentUser === undefined) {
            return (<p>LOADING...</p>)
        }
        if (this.state.currentUser === 'undefined') {
            let labelstyle = {
                'display': 'block',
                width: '250px',
                background: 'white',
                float: 'right',
                'margin-right': '145px',
                'padding-top': '45px',
            }
            let buttonstyle = {
                'display': 'block',
               'margin': '10px auto',
            }
            return( 
            <Label style = {labelstyle}>
                <span className = {textStyle}> When you log in, you can:</span>
                <ol> 
                    <li className = {listStyle}>Score bangumi and manga</li>
                    <li className = {listStyle}>Comments</li>
                    <li className = {listStyle}>Following others</li>
                    <li className = {listStyle}>Select avatar and background image</li>
                </ol>
                <Button style = {buttonstyle} onClick = {this.props.loginHandler}>Log In</Button>
                    <p className = {textStyle}>Does not have an account?</p>
                    <p className = {clickStyle} onClick = {this.props.signupHandler}>Click to sign up</p>
            </Label>)
        }
        let labelStyle = {
            'display': 'block',
            width: '250px',
            background: 'white',
            float: 'right',
            'margin-right': '45px',
            'padding-top': '45px',
        }
        let buttonStyle = {
            'display': 'block',
           'margin': '10px auto',
        }
        return(
            <div>
                <Label style = {labelStyle}>
                    <p className = {textStyle}>{this.state.currentUser.username}</p>
                    <p className = {textStyle}>{this.state.currentUser.email}</p>
                    <Button style = {buttonStyle} onClick = {this.props.logoutHandler}>Log Out</Button>
                </Label>
            </div>
        )
    }
}

export default UserMenu;