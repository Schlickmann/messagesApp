import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modifyEmailNewContact, addContact } from '../actions/AppActions';

const screenW = Dimensions.get('screen').width;
const screenH = Dimensions.get('screen').height;

function screen() {
    if (screenW < screenH) {
        return screenW;
    } 
        return screenH;
}

class AddContact extends Component {
    static navigationOptions = {
        headerTintColor: '#ADD8E6',
        headerTitle: 'Add Contact',
        headerTitleStyle: { fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy', },
    }

    _addContact() {
        const { navigate } = this.props.navigation;
        //destruct in assignment
        const { emailNewContact } = this.props;

        this.props.addContact({ emailNewContact, navigate });
    }

    renderAddContact() {
        if (!this.props.registerIncluded) {
            return (
                <View style={styles.registerIncluded}>
                    <View style={styles.inputView}>
                        <Text style={styles.txtInput}>Email:</Text>
                        <TextInput
                            keyboardType='email-address' 
                            onChangeText={text => { this.props.modifyEmailNewContact(text); }} 
                            value={this.props.emailNewContact} 
                            style={styles.input} 
                            placeholder='Insert the email...'
                            autoCorrect={false}
                            autoCapitalize='none'
                            underlineColorAndroid='transparent' 
                        />

                        <Text style={styles.errorAddContact}>{this.props.errorAddContact}</Text>
                    </View>
                    <View style={styles.footerView}>
                        {this.renderButton()}
                    </View>
                </View>
            );
        } 
        
        return (
            <View style={styles.registerIncluded}>
                <Text style={{ fontFamily: 'Noteworthy', fontSize: 25, color: 'green' }}> 
                    User included successfully!
                </Text>
            </View>
        );   
    }

    renderButton() {
        if (this.props.loading) {
            return (
                <ActivityIndicator size='large' />
            );
        }

        return (
            <View>
                <TouchableOpacity
                    onPress={() => this._addContact()}
                    disabled={this.props.disabledButton}
                >
                    <View style={styles.btnLogin}>
                        <Text style={styles.txtLogin}>Add</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderAddContact()}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    inputView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtInput: {
        fontSize: 20,
        fontFamily: 'Noteworthy',
        color: '#4682B4',
        alignSelf: 'flex-start',
        padding: 10,
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
    errorAddContact: {
        color: '#ff0000',
        fontSize: 18,
        fontFamily: 'Verdana',
        alignSelf: 'center',
        padding: 10,
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
    },
    footerView: {
        flex: 1,
        alignItems: 'center'
    },
    registerIncluded: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
};

const mapStateToProps = state => (
    {
        emailNewContact: state.ReducerApp.emailNewContact,
        errorAddContact: state.ReducerApp.errorAddContact,
        loading: state.ReducerApp.loading,
        registerIncluded: state.ReducerApp.registerIncluded,
        disabledButton: state.ReducerApp.disabledButton
    }
);

export default connect(mapStateToProps, { modifyEmailNewContact, addContact })(AddContact);
