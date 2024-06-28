/**
 * Home Screen Component
 */
import React from 'react';
import { StyleSheet, View, Text, Button, } from 'react-native';
const HomeScreen: React.FC = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My App</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Login"
                    onPress={() => navigation.navigate('LoginScreen')}
                />

            </View>
        </View>
    )
}








const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
});

export default HomeScreen