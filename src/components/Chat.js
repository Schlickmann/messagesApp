import React, { Component } from 'react';
import { View, TextInput, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { modifyMessageChat, sendMessage } from '../actions/AppActions';

class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.contactName,
        headerTintColor: '#ADD8E6',
        headerTitleStyle: { fontSize: 20, color: '#ADD8E6', fontFamily: 'Noteworthy' },
        headerStyle: { height: 60, backgroundColor: '#4682B4', }
    });

    _sendMessage() {
        const { contactName, contactEmail } = this.props.navigation.state.params;
        
        this.props.sendMessage(this.props.message, contactName, contactEmail);
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.mainChat} />
                <View style={styles.mainText}>
                    <TextInput 
                        style={styles.textInput}
                        value={this.props.message}
                        onChangeText={message => this.props.modifyMessageChat(message)}
                    />
                    <View style={styles.mainBtn}>
                        <TouchableHighlight
                            onPress={this._sendMessage.bind(this)}
                            underlayColor="#fff"
                        >
                            <Image style={styles.btnSend} source={require('../images/send.png')} />
                        </TouchableHighlight>
                    </View>
                    
                </View>
            </View>
        );
    }
}

const styles = {
    mainView: {
        flex: 1,
        backgroundColor: '#F0F8FF',
        padding: 10
    },
    mainChat: {
        flex: 1,
        paddingBottom: 20,
    },
    mainText: {
        flexDirection: 'row',
        height: 60,
    },
    textInput: {
        flex: 4,
        backgroundColor: '#D3D3D3',
        fontSize: 18,
        padding: 5
    },
    mainBtn: {
        marginLeft: 5,
        justifyContent: 'center'
    },
    btnSend: {
        height: 30,
        width: 30,
    },
};

const mapStateToProps = state => ({
    message: state.ReducerApp.message,
});

export default connect(mapStateToProps, { modifyMessageChat, sendMessage })(Chat);
