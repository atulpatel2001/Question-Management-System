/**
 * Attempt Screen Component
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { connectToDatabase } from '../db/ds';
import { findAllQuestions } from '../services/QuestionService';
import { Question } from '../model/Question';
import { getData } from '../services/AsyncStorageService';
import { findByUsername } from '../services/UserService';
import { Attempt } from '../model/Attempt';
import { addAttempt, getAttemptsByUserId, getAttemptsByUserIdAndQuestionId } from '../services/AttemptService ';


const AttemptScreen: React.FC = ({ navigation }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number>(0);
    const [attempt, setAttempt] = useState<Attempt>(
        {
            attemptId: 0,
            answer: 0,
            createdAt: "",
            isCorrect: false,
            questionId: 0,
            updatedAt: "",
            userId: 0
        }
    )

    //load all qusetion from database
    useEffect(() => {
        const loadQuestion = async () => {
            const db = await connectToDatabase();
            const question2 = await findAllQuestions(db);
            setQuestions(question2);
        }
        loadQuestion();
    }, []);

    //get current qusetion
    const currentQuestion = questions[currentQuestionIndex];

    //handle select answer
    const handleOptionSelect = (option: number) => {
        setSelectedOption(option);
    };

    if (!currentQuestion) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    /**
     * Got next qusetion and attempt this question
     */
    const goToNextQuestion = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            const userName = await getData();
            const db = await connectToDatabase();
            const loginUser = await findByUsername(db, userName);

            if (!loginUser) {
                console.log("User not found");
            } else {

                const attemptsByUserIdAndQuestionId = await getAttemptsByUserIdAndQuestionId(db, loginUser.userId, currentQuestion.questionId)
                if (!attemptsByUserIdAndQuestionId) {
                    const newAttempt: Attempt = {
                        attemptId: 0,
                        answer: selectedOption,
                        createdAt: "",
                        isCorrect: currentQuestion.correctAnswer === selectedOption,
                        questionId: currentQuestion.questionId,
                        updatedAt: "",
                        userId: loginUser.userId
                    };

                    setAttempt(prevAttempt => ({
                        ...prevAttempt,
                        ...newAttempt
                    }));
                    await addAttempt(db, newAttempt);
                    setAttempt({
                        attemptId: 0,
                        answer: 0,
                        createdAt: "",
                        isCorrect: false,
                        questionId: 0,
                        updatedAt: "",
                        userId: 0
                    });
                }

                else {
                    Alert.alert('Already Attempt!!', 'Question Answer is Already given....');
                }

            }
            setSelectedOption(0);
        } else {
            setCurrentQuestionIndex(0);
        }
    };


    /**
     * Save Answer into database 
     * 
     */
    const saveAnswer = async () => {
        const userName = await getData();
        const db = await connectToDatabase();
        const loginUser = await findByUsername(db, userName);

        if (!loginUser) {
            console.log("User not found");
        } else {
            const attemptsByUserIdAndQuestionId = await getAttemptsByUserIdAndQuestionId(db, loginUser.userId, currentQuestion.questionId)

            if (!attemptsByUserIdAndQuestionId) {
                const newAttempt: Attempt = {
                    attemptId: 0,
                    answer: selectedOption,
                    createdAt: "",
                    isCorrect: currentQuestion.correctAnswer === selectedOption,
                    questionId: currentQuestion.questionId,
                    updatedAt: "",
                    userId: loginUser.userId
                };

                setAttempt(prevAttempt => ({
                    ...prevAttempt,
                    ...newAttempt
                }));
                await addAttempt(db, newAttempt);
                setAttempt({
                    attemptId: 0,
                    answer: 0,
                    createdAt: "",
                    isCorrect: false,
                    questionId: 0,
                    updatedAt: "",
                    userId: 0
                });
                navigation.navigate("UserReportScreen");
            }

            else {
                Alert.alert('Already Attempt!!', 'Question Answer is Already given....');
                navigation.navigate("UserReportScreen");
            }
        }
    };


    return (
        <View style={styles.container}>
            <QuestionDetails
                currentQuestionIndex={currentQuestionIndex + 1}
                totalQuestions={questions.length}
            />
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
            </View>
            <View style={styles.optionsContainer}>
                <OptionButton
                    option={currentQuestion.option1}
                    isSelected={1 === selectedOption}
                    onPress={() => handleOptionSelect(1)}
                />
                <OptionButton
                    option={currentQuestion.option2}
                    isSelected={2 === selectedOption}
                    onPress={() => handleOptionSelect(2)}
                />
                <OptionButton
                    option={currentQuestion.option3}
                    isSelected={3 === selectedOption}
                    onPress={() => handleOptionSelect(3)}
                />
                <OptionButton
                    option={currentQuestion.option4}
                    isSelected={4 === selectedOption}
                    onPress={() => handleOptionSelect(4)}
                />
            </View>
            <NavigationButtons
                hasNext={currentQuestionIndex < questions.length - 1}
                onNext={goToNextQuestion}
                onSave={saveAnswer}
            />
        </View>
    );
};

interface QuestionDetailsProps {
    currentQuestionIndex: number;
    totalQuestions: number;
}

const QuestionDetails: React.FC<QuestionDetailsProps> = ({
    currentQuestionIndex,
    totalQuestions,
}) => {
    return (
        <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>
                Question {currentQuestionIndex} of {totalQuestions}
            </Text>
        </View>
    );
};

interface OptionButtonProps {
    option: string;
    isSelected: boolean;
    onPress: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
    option,
    isSelected,
    onPress,
}) => {
    return (
        <View style={styles.optionButton}>
            <Button
                title={option}
                onPress={onPress}
                color={isSelected ? '#3498db' : '#ccc'}

            />

        </View>
    );
};

interface NavigationButtonsProps {
    hasNext: boolean;
    onNext: () => void;
    onSave: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    hasNext,
    onNext,
    onSave,
}) => {
    return (
        <View style={styles.navigationContainer}>
            {hasNext ? (
                <Button title="Next" onPress={onNext} />
            ) : (
                <Button title="Save" onPress={onSave} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    detailsContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    detailsText: {
        fontSize: 16,
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionsContainer: {
        marginBottom: 20,
    },
    optionButton: {
        marginBottom: 10,

    },
    navigationContainer: {
        alignSelf: 'flex-end',
    },
});
export default AttemptScreen