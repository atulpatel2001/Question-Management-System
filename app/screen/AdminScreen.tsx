import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet, Button } from "react-native"

const AdminScreen: React.FC = ({ navigation }) => {


    /**
     * Handle Logout and remove token
     */
    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('username');
          console.log("logout")
          navigation.navigate('LoginScreen');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Screen</Text>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button
                        title="Add User"
                        onPress={() => navigation.navigate('AddUser')}
                    />
                </View>


                <View style={styles.button}>
                    <Button
                        title="All Users"
                        onPress={() => navigation.navigate('ListUsers')}
                    />
                </View>


                <View style={styles.button}>
                    <Button
                        title="Add Question"
                        onPress={() => navigation.navigate('AddQuestion')}
                    />
                </View>

                <View style={styles.button}>
                    <Button
                        title="All Question"
                        onPress={() => navigation.navigate('ListQuestions')}
                    />
                </View>

                <View style={styles.button}>
                    <Button
                        title="Logout"
                        onPress={handleLogout}
                    />
                </View>




            </View>
        </View>
    )
}


export default AdminScreen


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
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        marginBottom: 10,
    },
});
