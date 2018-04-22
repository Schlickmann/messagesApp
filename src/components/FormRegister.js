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

const FormRegister = props => (
    <View style={styles.container}>
        <View style={styles.inputView}>
            <TextInput 
                style={styles.input}
                placeholder='Name...'
                placeholderTextColor='#ADD8E6' 
                underlineColorAndroid='transparent'
                autoCorrect={false}
            />
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
    </View>
);

const styles = {
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputView: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
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
        alignItems: 'center'
    },
    btnRegister: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: screen() - 50,
        borderWidth: 2,
        borderColor: '#4682B4',
        borderRadius: 8,
    },
    txtRegister: {
        fontSize: 25,
        color: '#4682B4', 
    }
};

export { FormRegister };
