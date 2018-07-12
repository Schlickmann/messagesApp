import React, { Component } from 'react';
import { View, Text, Dimensions, ActivityIndicator,
        TouchableOpacity, Image, PixelRatio } from 'react-native';

import { connect } from 'react-redux';
import { userLogOut, selectPhotoTapped, fetchAvatar } from '../actions/AuthActions';

const screenW = Dimensions.get('screen').width;
const screenH = Dimensions.get('screen').height;

function screen() {
    if (screenW < screenH) {
        return screenW;
    } 
        return screenH;
}

class Profile extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.userName,
        headerTitleStyle: { fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' },
        headerStyle: { height: 60, },
        tabBarLabel: 'Profile',
        headerLeft: null
    });

    componentWillMount() {
        this.props.fetchAvatar();
    }

    async _updateUserData() {
        const picture = await this.props.selectPhotoTapped();
    }

    _userLogOut() {
        const { navigate } = this.props.navigation;

        this.props.userLogOut({ navigate });
    }

    renderButton() {
        if (this.props.loadingLogin) {
            return (
                <ActivityIndicator size='large' />
            );
        }

        return (
                <View>
                    <TouchableOpacity
                        onPress={() => { this._userLogOut(); }}
                    >
                        <View style={styles.btnLogin}>
                            <Text style={styles.txtLogin}>LogOut</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        );
    }

    render() {
        return (
            <View style={styles.container}> 
                <View style={styles.avatarView}>
                    <TouchableOpacity onPress={() => { this._updateUserData(); }}>
                    <View style={styles.ImageContainer}>
 
                        { this.props.avatarSource === null ? <Text>Select your Avatar</Text> :
                        <Image style={styles.ImageContainer} source={this.props.avatarSource} />
                        }   
        
                    </View>     
                    </TouchableOpacity>
                </View>
                <View style={styles.footerView}>
                    {this.renderButton()}
                    <Text style={styles.errorAuth}>{this.props.errorAuth}</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        justifyContent: 'center',
        backgroundColor: '#F0F8FF', 
        flex: 1
    },
    ImageContainer: {
        borderRadius: 100,
        width: 200,
        height: 200,
        borderColor: '#ADD8E6',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4682B4',
        
    },
    avatarView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    footerView: {
        flex: 1,
        alignItems: 'center'
    },
    btnLogin: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: screen() - 50,
        borderWidth: 2,
        borderColor: '#4682B4',
        borderRadius: 8,
    },
    txtLogin: {
        fontSize: 25,
        color: '#4682B4', 
        fontFamily: 'Noteworthy',
    },
    errorAuth: {
        color: '#ff0000',
        fontSize: 18,
        fontFamily: 'Verdana',
        alignSelf: 'center',
        marginTop: 30,
        padding: 10,
    },
};

const mapStateToProps = state => (
    {
        errorAuth: state.Auth.errorAuth,
        loadingLogin: state.Auth.loadingLogin,
        avatarSource: state.Auth.avatarSource
    }
);

export default connect(mapStateToProps, { userLogOut, selectPhotoTapped, fetchAvatar })(Profile);
