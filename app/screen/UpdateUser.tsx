import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../model/User';
import { connectToDatabase } from '../db/ds';
import { addUser, updateUser } from '../services/UserService';
import AwesomeAlert from 'react-native-awesome-alerts';
import { } from '@react-navigation/native-stack';
const UpdateUser: React.FC = ({ navigation, route }) => {
    const oldUser = route.params.oldUser;

    const [state, setState] = useState<User>({
        username: oldUser ? oldUser.username : "",
        password: oldUser ? oldUser.password : "",
        userId: oldUser ? oldUser.userId : 0,
        name: oldUser ? oldUser.name : "",
        createdAt: oldUser ? oldUser.createdAt : "",
        updatedAt: oldUser ? oldUser.updatedAt : "",
        role: "ROLE_USER",
    });

    useEffect(() => {

        setState({
            username: oldUser ? oldUser.username : "",
            password: oldUser ? oldUser.password : "",
            userId: oldUser ? oldUser.userId : 0,
            name: oldUser ? oldUser.name : "",
            createdAt: oldUser ? oldUser.createdAt : "",
            updatedAt: oldUser ? oldUser.updatedAt : "",
            role: "ROLE_USER",
        });
        console.log(state)
    }, [oldUser]);

    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (name: keyof User, value: string) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value, // Correctly update the state
        }));
    };

    const handleSubmit = async () => {

        const db = await connectToDatabase();
        await updateUser(db, state);
        setShowAlert(true);
        setState({
            username: "",
            password: "",
            userId: 0,
            name: "",
            createdAt: "",
            updatedAt: "",
            role: "ROLE_USER",
        });
        navigation.navigate("ListUsers");

    };

    const handleHideAlert = () => {
        setShowAlert(false);
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.fieldLabel}>Username:</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Username"
                onChangeText={(text) => handleChange("username", text)}
                value={state.username}
                autoCapitalize="none"
            />

            <Text style={styles.fieldLabel}>Password:</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Password"
                secureTextEntry={true}
                onChangeText={(text) => handleChange("password", text)}
                value={state.password}
            />

            <Text style={styles.fieldLabel}>Name:</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Name"
                onChangeText={(text) => handleChange("name", text)}
                value={state.name}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <AwesomeAlert
                show={showAlert}
                message="Successfully Update User!!"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                onCancelPressed={handleHideAlert}
                showConfirmButton={true}
                confirmText="OK"
                onConfirmPressed={handleHideAlert}
            />
        </View>
    );
};

export default UpdateUser;

const styles = StyleSheet.create({
    formContainer: {
        margin: 10,
        padding: 5,
    },
    fieldLabel: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    textInput: {
        padding: 10,
        borderRadius: 5,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: "#0099ff",
        borderRadius: 5,
    },
    submitButtonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    errorText: {
        color: "red",
        fontSize: 13,
        marginBottom: 5,
        fontWeight: 'bold',
    },
});
