import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modifyEmail, modifyPassword, authUser } from '../actions/AuthActions';

const screenW = Dimensions.get('screen').width;
const screenH = Dimensions.get('screen').height;

function screen() {
    if (screenW < screenH) {
        return screenW;
    } 
        return screenH;
}

class FormLogin extends Component {
    
    static navigationOptions = {
        headerStyle: { backgroundColor: '#4682B4', 
                        height: 5,
                     },
        headerLeft: null,
    };

    _authUser() {
        const { navigate } = this.props.navigation;
        //destruct in assignment
        const { email, password } = this.props;

        this.props.authUser({ email, password, navigate });
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
                        onPress={() => { this._authUser(); }}
                    >
                        <View style={styles.btnLogin}>
                            <Text style={styles.txtLogin}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        );
    }
    
    render() {
        const { navigate } = this.props.navigation;
        return (
                <View style={styles.container}>
                    <View style={styles.headerView}>
                        <Text style={styles.txtHeader}>Messages App</Text>      
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                            style={styles.input}
                            placeholder='Email...'
                            placeholderTextColor='#ADD8E6' 
                            underlineColorAndroid='transparent'
                            autoCorrect={false}
                            autoCapitalize='none'
                            value={this.props.email}
                            onChangeText={(text) => { this.props.modifyEmail(text); }}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder='Password...'
                            placeholderTextColor='#ADD8E6' 
                            underlineColorAndroid='transparent'
                            autoCorrect={false}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            value={this.props.password} 
                            onChangeText={text => { this.props.modifyPassword(text); }}
                        />
                        <TouchableOpacity
                            onPress={() => navigate('register')}
                        >
                            <Text style={styles.txtRegister}>
                                If you are not registered yet, register yourself here.
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.errorAuth}>{this.props.errorAuth}</Text>
                    </View>
                    <View style={styles.footerView}>
                        {this.renderButton()}
                    </View>
                </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    headerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtHeader: {
        fontSize: 40,
        color: '#4682B4', //SteelBlue
        fontFamily: 'Noteworthy',
        backgroundColor: 'transparent'
    },
    inputView: {
        flex: 2,
        alignItems: 'center',
    },
    input: {
        fontSize: 20,
        height: 50,
        width: screen() - 10,
        borderWidth: 2,
        borderColor: '#ADD8E6', //LightBlue
        borderRadius: 8,
        margin: 10,
        padding: 5, 
    },
    txtRegister: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4682B4',
        textDecorationLine: 'underline'
    },
    errorAuth: {
        color: '#ff0000',
        fontSize: 18,
        fontFamily: 'Verdana',
        alignSelf: 'center',
        marginTop: 30,
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
    }
};

const mapStateToProps = state => (
    {
        email: state.Auth.email,
        password: state.Auth.password,
        errorAuth: state.Auth.errorAuth,
        loadingLogin: state.Auth.loadingLogin
    }
);

export default connect(mapStateToProps, { modifyEmail, modifyPassword, authUser })(FormLogin);
