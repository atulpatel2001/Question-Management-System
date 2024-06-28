/**
 * List Out All Question
 */

import { connectToDatabase } from '../db/ds';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ListRenderItemInfo } from 'react-native';
import { useEffect, useState } from 'react';
import { Question } from '../model/Question';
import { findAllQuestions } from '../services/QuestionService';
const ListAllQuestion: React.FC = ({ navigation }) => {

    const [questions, setQuestion] = useState<Question[]>([]);

    //Fetched All Qusetion from database
    const fetchedQuestions = async () => {
        const db = await connectToDatabase()
        const fetchedQuestions: Question[] = await findAllQuestions(db);
        setQuestion(fetchedQuestions);
    };
    useEffect(() => {
        fetchedQuestions();
    }, [questions]);


    //OnEdit Function
    const onEdit = (questionId: number) => {

    }

    //delete qusetion
    const onDelete = (questionId: number) => {

    }
    const renderItem = ({ item, index }: ListRenderItemInfo<Question>) => {
        const question = item;

        return (
            <View key={question.questionId} style={styles.item}>
                <Text style={styles.text}><Text style={styles.optionsHeading}>Question {question.questionId}:</Text> {question.questionText}</Text>
                <View style={styles.optionsContainer}>
                    <Text style={styles.text}><Text style={styles.optionsHeading}>Option1:</Text> {question.option1}</Text>
                    <Text style={styles.text}><Text style={styles.optionsHeading}>Option2:</Text> {question.option2}</Text>
                    <Text style={styles.text}><Text style={styles.optionsHeading}>Option3:</Text> {question.option3}</Text>
                    <Text style={styles.text}><Text style={styles.optionsHeading}>Option4:</Text> {question.option4}</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => onEdit(question.questionId)}>
                        <Text style={styles.text}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => onDelete(question.questionId)}>
                        <Text style={styles.text}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>List of Questions</Text>
            <FlatList
                data={questions}
                renderItem={renderItem}
                keyExtractor={(question) => question.questionId.toString()}
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
        backgroundColor: '#607D8B',
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
    },
    optionsContainer: {
        marginTop: 8
    },
    optionsHeading:
    {
        color: '#81C784'
    }
});
export default ListAllQuestion