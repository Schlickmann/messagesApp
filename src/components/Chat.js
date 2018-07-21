import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableHighlight, ListView, PixelRatio } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { connect } from 'react-redux';
import _ from 'lodash';
import { modifyMessageChat, sendMessage, fetchUserChat } from '../actions/AppActions';

class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
            <View style={{ height: 60, backgroundColor: '#4682B4', flexDirection: 'row', padding: 15 }} >
                <HeaderBackButton onPress={() => navigation.goBack(null)} />
                { navigation.state.params.profilePic === '' ? <Image style={styles.ImageContainer} source={require('../images/user.png')} /> :
                    <Image style={styles.ImageContainer} source={{ uri: navigation.state.params.profilePic }} />
                }  
              <Text style={{ fontSize: 20, color: '#ADD8E6', fontFamily: 'Noteworthy' }} >{navigation.state.params.contactName}</Text>
            </View>
          ),
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
    ImageContainer: { 
        marginRight: 10, 
        borderRadius: 20, 
        width: 40, 
        height: 40, 
        borderColor: '#4682B4', 
        borderWidth: 1 / PixelRatio.get(), 
        backgroundColor: '#4682B4', 
    }
};

const mapStateToProps = state => {
    const chat = _.map(state.ChatsReducer, (val, uid) => ({ ...val, uid }));

    return ({
        chat,
        message: state.ReducerApp.message,
    });
};

export default connect(mapStateToProps, { modifyMessageChat, sendMessage, fetchUserChat })(Chat);
