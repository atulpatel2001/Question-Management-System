import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet, Button } from "react-native"

const UserScreen: React.FC = ({ navigation }) => {
    const handleLogout = async () => {
        try {
        
          await AsyncStorage.removeItem('username');
          navigation.replace('LoginScreen');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Screen</Text>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button
                        title="Start Test"
                        onPress={() => navigation.navigate('Attempt')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Report"
                        onPress={() =>navigation.navigate("UserReportScreen")
                        }
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


export default UserScreen


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