import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableHighlight, ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { modifyMessageChat, sendMessage, fetchUserChat } from '../actions/AppActions';

class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.contactName,
        headerTintColor: '#ADD8E6',
        headerTitleStyle: { fontSize: 20, color: '#ADD8E6', fontFamily: 'Noteworthy' },
        headerStyle: { height: 60, backgroundColor: '#4682B4', }
    });

    componentWillMount() {
        this.props.fetchUserChat(this.props.navigation.state.params.contactEmail);
        this.createDataSource(this.props.chat);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.chat);
    }

    createDataSource(chat) {
        const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
        this.dataSource = ds.cloneWithRows(chat);
    }

    _renderRow(text) {
        if (text.type === 'sent') {
            return (
                <View style={styles.sender}>
                    <Text style={[{ backgroundColor: '#dbf5b4' }, styles.messages]}>{text.message}</Text>
                </View>
            );
        }
        return (
            <View style={styles.receiver}>
                <Text style={[styles.messages, { backgroundColor: '#D3D3D3' }]}>{text.message}</Text>
            </View>
        );
    }

    _sendMessage() {
        const { contactName, contactEmail } = this.props.navigation.state.params;
        
        this.props.sendMessage(this.props.message, contactName, contactEmail);
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.mainChat} >
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this._renderRow}
                    />
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
    sender: {
        alignItems: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40,
    },
    receiver: {
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 40,
    },
    messages: {
        fontSize: 16, 
        color: '#000',
        padding: 10,
        fontFamily: 'Verdana',
        elevation: 1,
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

const mapStateToProps = state => {
    const chat = _.map(state.ChatsReducer, (val, uid) => {
        return { ...val, uid };
    });

    return ({
        chat,
        message: state.ReducerApp.message,
    });
};

export default connect(mapStateToProps, { modifyMessageChat, sendMessage, fetchUserChat })(Chat);
