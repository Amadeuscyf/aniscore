import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setCurrentUser, setUser} from '../../../store/action.js';
import {Image, Button, Input} from  'semantic-ui-react';
import Navibar from '../../Home/MainMenu/Navibar/navibar.jsx';
import {pageStyle, bodyStyle, footerStyle} from './editAvatar.module.scss';
import {pageContainer, imageStyle, textStyle} 
from '../../Home/SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../searchloading.gif';

class EditAvatar extends Component {
    constructor() {
        super();
        this.state = {
            user: 'undefined',
            avatar: '',
            previewUrl: '',
            disabled: true,
        }
        this.selectImage = this.selectImage.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
        this.cancel = this.cancel.bind(this);
    } 

    componentDidMount() {
        if (this.props.currentUser.avatar) {
            this.setState({
                avatar: this.props.currentUser.avatar,
                previewUrl: this.props.currentUser.avatar,
            })
        } else {
            this.setState({
                avatar: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
                previewUrl: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
            })
        }
    }

    selectImage(event) {
        let reader = new FileReader();
        let files = event.target.files;
        reader.onloadend = () => {
            this.setState({
                avatar: files[0],
                previewUrl: reader.result,
                disabled: false,
            });
        }
        reader.readAsDataURL(files[0])
    }

    updateAvatar() {
        const formData = new FormData();
        formData.append('avatar', this.state.avatar);
        axios.put('api/avatar/' + this.props.currentUser._id, formData)
        .then(res => {
            this.props.setCurrentUser(res.data.data.user)
            this.props.setUser(this.props.currentUser._id, this.props.history, '/user/userProfile/' + this.props.currentUser._id)
        }).catch(err => {
            alert(err);
        })
    }

    cancel() {
        this.props.history.push('/user/userProfile/' + this.props.currentUser._id);
    }

    render() {
        if (!this.state.avatar) {
            return (
                <div>
                    <Navibar/>
                    <div className = {pageContainer}>
                        <div>
                            <Image className = {imageStyle} src={loadingGif} alt = 'loading'/>
                        </div>
                        <p className = {textStyle}>
                            Loading ... 
                        </p>
                    </div>
                </div>
            )
        }
        let avatarStyle = {
            width: '300px',
            height: '300px',
        }
        return (
            <div className = {pageStyle}>  
                <Navibar/>
                <div className = {bodyStyle}>
                    <Image style = {avatarStyle} avatar
                    src = {this.state.previewUrl}
                    />
                    <Input type="file" accept = "image/*" hidden 
                    onChange={this.selectImage} name = 'avatar'
                    />
                    <div>
                        <Button size = 'huge' color = 'blue' 
                        onClick= {this.updateAvatar} 
                        disabled = {this.state.disabled}>Update</Button>
                        <Button size = 'huge' color = 'blue'
                        onClick = {this.cancel}>Cancel</Button>
                    </div>
                </div>
                <div className = {footerStyle}>
                    <h2>AniScore</h2>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {setCurrentUser, setUser})(EditAvatar);