import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { LoginFormModel } from "../model/LoginForm";
import { connectToDatabase } from "../db/ds";
import { findByUsernameAndPassword } from "../services/UserService";

import { getData, removeIteam, storeData } from "../services/AsyncStorageService";
import { useState } from "react";
import { showAlert } from "../component/AlertBox";
interface IState {
    credential: LoginFormModel;
}

const LoginScreen: React.FC = ({ navigation }) => {
    const [state, setState] = useState<IState>({
        credential: {
            username: "",
            password: ""
        }
    })

    const handleInputChange = (key: keyof LoginFormModel, value: string) => {
        setState(prevState => ({
            ...prevState,
            credential: {
                ...prevState.credential,
                [key]: value
            }
        }));
    };



    const login = async () => {
        console.log(state.credential)
        try {
            const db = await connectToDatabase();
            const user = await findByUsernameAndPassword(db, state.credential.username, state.credential.password);
            if (user == null) {
                console.log("credential is wrong")
                showAlert("Login Failed!", "Login Credential is Wrong !!!");
            }
            else {
                console.log("login successfully");
                if (user.role === 'ROLE_ADMIN') {
                    navigation.navigate('AdminScreen');
                }
                else {
                    navigation.navigate('UserScreen');
                }

                // const data = getData();
                // if (data == null) {

                // }
                // else {
                //     removeIteam();
                // }

                console.log(state.credential.username + " for debug")

                await storeData(state.credential.username);


            }

            setState({
                credential: {
                    username: '',
                    password: ''
                }
            })
        }
        catch (error) {
            console.log(error);
        }

    };



    return (

        <View style={styles.container}>
            <View>
                <Text style={styles.textManage}>
                    Login Hear !!
                </Text>
            </View>
            <View style={styles.formContainer}>


                <View>
                    <View style={styles.formControl}>
                        <TextInput style={styles.input}
                            placeholder='Enter UserName'
                            underlineColorAndroid="transparent"
                            placeholderTextColor="black"
                            autoCapitalize="none"
                            value={state.credential.username}
                            onChangeText={(text) => handleInputChange('username', text)}
                        />
                    </View>


                    <View style={styles.formControl}>
                        <TextInput style={styles.input}
                            placeholder='Enter Password'
                            underlineColorAndroid="transparent"
                            placeholderTextColor="black"
                            autoCapitalize="none"
                            value={state.credential.password}
                            onChangeText={(text) => handleInputChange('password', text)}
                        />
                    </View>

                    <View style={styles.formControl}>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={
                                login
                            }>
                            <Text style={styles.submitButtonText}> Submit </Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </View>

        </View>
    );
}


export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 5,
    },
    textManage: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: 'center'
    },
    formContainer: {
        marginTop: 150
    },
    formControl: {
        padding: 5,
        margin: 5,
    },
    input: {
        padding: 20,
        borderRadius: 50,
        height: 60,
        borderColor: '#546E7A',
        borderWidth: 2,
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold'

    },
    submitButton: {
        backgroundColor: '#B0BEC5',
        borderRadius: 50,
        padding: 20,
        height: 70,
        borderColor: '#546E7A',
        borderWidth: 2,
    },
    submitButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',

    }
})