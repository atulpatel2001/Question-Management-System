/**
 * List Out All User Component
 */
import { connectToDatabase } from '../db/ds';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ListRenderItemInfo } from 'react-native';
import { User } from '../model/User';
import { useEffect, useState } from 'react';
import { deleteUser, findAllUsers, findById } from '../services/UserService';
const ListAllUser: React.FC = ({ navigation }) => {

    const [users, setUsers] = useState<User[]>([]);

    //Fetch Users from database
    const fetchUsers = async () => {
        const db = await connectToDatabase()
        const fetchedUsers: User[] = await findAllUsers(db);
        setUsers(fetchedUsers);
    };
    useEffect(() => {
        fetchUsers();
    }, [users]);



    //edit user in database
    const onEdit = async (userId: number) => {
        const db = await connectToDatabase();
        const oldUser = await findById(db, userId);
        navigation.navigate('UpdateUser', { oldUser: oldUser });
    }

    //delete user in database
    const onDelete = async (userId: number) => {
        const db = await connectToDatabase();
        await deleteUser(db, userId);
        fetchUsers();

    }

    //navigate to report screen
    const onReport = (userId: number) => {
        navigation.navigate('AdminReportScreen', { userId: userId });
    }

    const renderItem = ({ item, index }: ListRenderItemInfo<User>) => {
        const user = item;

        return (
            <View key={user.userId.toString()} style={styles.item}>
                <Text style={styles.text}>Name: {user.name}</Text>
                <Text style={styles.text}>Username: {user.username}</Text>
                <Text style={styles.text}>Role: {user.role}</Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => onEdit(user.userId)}>
                        <Text style={styles.text}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => onDelete(user.userId)}>
                        <Text style={styles.text}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => onReport(user.userId)}>
                        <Text style={styles.text}>Report</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>List of Users</Text>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(user) => user.userId.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        backgroundColor: '#90A4AE',
        color: '#ECEFF1',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    }, buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#B0BEC5',
        color: '#ECEFF1',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        color: '#ECEFF1',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
export default ListAllUser