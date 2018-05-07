import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

const screenW = Dimensions.get('screen').width;
const screenH = Dimensions.get('screen').height;

function screen() {
    if (screenW < screenH) {
        return screenW;
    } 
        return screenH;    
}

export default class Welcome extends Component {
    
    static navigationOptions = {
        //headerTintColor: 'white',
        headerStyle: { backgroundColor: '#4682B4', 
                        height: 5,
                     },
        //headerTitleStyle: { color: 'white' }
        headerLeft: null,
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.txtWelcome}>Welcome to Messages App</Text>
                    <Image style={styles.imgWelcome} source={require('../images/messagesApp.png')} />
                </View>

                <View style={styles.footerView}>
                    <TouchableOpacity
                        onPress={() => navigate('login')}
                    >
                        <View style={styles.btnLogin}>
                            <Text style={styles.txtLogin}>To Login</Text>
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
        backgroundColor: '#F0F8FF', //AliceBlue
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    txtWelcome: {
        fontSize: 30,
        fontFamily: 'Noteworthy',
        color: '#4682B4',
        marginBottom: 20,
    },
    imgWelcome: {
        width: 150,
        height: 150,
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
    },
};
