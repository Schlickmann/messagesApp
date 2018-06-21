import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { modifyMessageChat } from '../actions/AppActions';

class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.title) === 'undefined' ? 'find' : navigation.state.params.title,
        headerTintColor: '#ADD8E6',
        headerTitleStyle: { fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' },
        headerStyle: { height: 60, backgroundColor: '#4682B4', }
    });

    componentWillMount() {
        this.props.navigation.setParams({ title: 'your content' });
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.mainChat}></View>
                <View style={styles.mainText}>
                    <TextInput 
                        style={styles.textInput}
                        value={this.props.message}
                        onChangeText={message => this.props.modifyMessageChat(message)}
                    />
                    <View style={styles.mainBtn}>
                        <TouchableHighlight
                            onPress={() => { false; }}
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

const mapStateToProps = state => {
    return ({
        message: state.ReducerApp.message,
    });
};

export default connect(mapStateToProps, {modifyMessageChat})(Chat);
