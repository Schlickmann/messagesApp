import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, Dimensions } from 'react-native';

const screenW = Dimensions.get('screen').width;
const screenH = Dimensions.get('screen').height;

function screen() {
    if (screenW < screenH) {
        return screenW;
    } 
        return screenH;
}

export default class AddContact extends Component {
    static navigationOptions = {
        headerTintColor: '#ADD8E6',
        headerTitle: 'Add Contact',
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <Text style={styles.txtInput}>Email:</Text>
                    <TextInput style={styles.input} placeholder='Insert the email...' />
                </View>
                <View style={styles.footerView}>
                    <TouchableOpacity
                        onPress={() => false}
                    >
                        <View style={styles.btnLogin}>
                            <Text style={styles.txtLogin}>Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
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
        padding: 5,
    },
    input: {
        fontSize: 20,
        height: 50,
        width: screen() - 10,
        borderWidth: 2,
        borderColor: '#ADD8E6', //LightBlue
        borderRadius: 8,
        margin: 10,
        //padding: 5, 
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
};
