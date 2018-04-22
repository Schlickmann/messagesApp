import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';

const screenW = Dimensions.get('screen').width;
const screenH = Dimensions.get('screen').height;

function screen() {
    if (screenW < screenH) {
        return screenW;
    } 
        return screenH;
}

const FormLogin = props => (

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
            />
            <TextInput 
                style={styles.input}
                placeholder='Password...'
                placeholderTextColor='#ADD8E6' 
                underlineColorAndroid='transparent'
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry={true} 
            />
            <Text style={styles.txtRegister}>
                If you are not registered yet, register yourself here.
            </Text>
        </View>
        <View style={styles.footerView}>
            <TouchableOpacity
                onPress={(ret) => { console.log(ret); }}
            >
                <View style={styles.btnLogin}>
                    <Text style={styles.txtLogin}>Login</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
);

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

export { FormLogin };
