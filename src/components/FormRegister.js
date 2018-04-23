import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { modifyEmail, modifyPassword, modifyName } from '../actions/AuthActions';

const screenW = Dimensions.get('screen').width;
const screenH = Dimensions.get('screen').height;

function screen() {
    if (screenW < screenH) {
        return screenW;
    } 
        return screenH;    
}

class FormRegister extends Component {

    static navigationOptions = {
        headerTitle: 'Register',
        headerTitleStyle: { fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' },
        headerStyle: { backgroundColor: '#4682B4', 
                        height: 60,
                     }
    };

    render() {
        return (
            <ScrollView style={styles.container}>
            <View style={styles.inputView}>
                <Text style={styles.txtInput}>Name:</Text>
                <TextInput 
                    value={this.props.name}
                    onChangeText={(text) => { this.props.modifyName(text); }} 
                    style={styles.input}
                    placeholder='Name...'
                    placeholderTextColor='#ADD8E6' 
                    underlineColorAndroid='transparent'
                    autoCorrect={false}
                />
                <Text style={styles.txtInput}>Email:</Text>
                <TextInput
                    value={this.props.email}
                    onChangeText={(text) => { this.props.modifyEmail(text); }} 
                    style={styles.input}
                    placeholder='Email...'
                    placeholderTextColor='#ADD8E6' 
                    underlineColorAndroid='transparent'
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <Text style={styles.txtInput}>Password:</Text>
                <TextInput 
                    value={this.props.password}
                    onChangeText={(text) => { this.props.modifyPassword(text); }} 
                    style={styles.input}
                    placeholder='Password...'
                    placeholderTextColor='#ADD8E6' 
                    underlineColorAndroid='transparent'
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.footerView}>
            <TouchableOpacity
                onPress={(ret) => { console.log(ret); }}
            >
                <View style={styles.btnRegister}>
                    <Text style={styles.txtRegister}>Register</Text>
                </View>
            </TouchableOpacity>
        </View>
        </ScrollView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        padding: 10,
    },
    inputView: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtInput: {
        fontSize: 20,
        fontFamily: 'Noteworthy',
        color: '#4682B4',
        alignSelf: 'flex-start',
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
    footerView: {
        flex: 1,
        alignItems: 'center',
    },
    btnRegister: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: screen() - 50,
        borderWidth: 2,
        borderColor: '#4682B4',
        borderRadius: 8,
        marginTop: 20,
    },
    txtRegister: {
        fontSize: 25,
        color: '#4682B4', 
    }
};

const mapStateToProps = state => (
    {
        name: state.Auth.name,
        email: state.Auth.email,
        password: state.Auth.password
    }
);

export default connect(mapStateToProps, { modifyEmail, modifyPassword, modifyName })(FormRegister);
