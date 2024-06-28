import React from 'react';
import { ScrollView, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Attempt } from '../model/Attempt';
import { Question } from '../model/Question';

/**
 * IProps For for get And Props
 */
interface Props {
  attempts: Attempt[];
  questions: Question[];
}

/**
 * Report Component
 * @param attempts 
 * @returns 
 */
const ReportComponent: React.FC<Props> = ({ attempts, questions }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {attempts.map((attempt, index) => {
          const question = questions.find(q => q.questionId === attempt.questionId);

          if (!question) {
            return null;
          }

          const isCorrect = attempt.answer == question.correctAnswer;
          const answerText = isCorrect ? "Correct" : "Incorrect";

          return (
            <View key={attempt.attemptId} style={styles.attemptContainer}>
              <Text style={styles.questionText}>Question {index + 1}: {question.questionText}</Text>
              <Text style={styles.option}>{`Option 1: ${question.option1}`}</Text>
              <Text style={styles.option}>{`Option 2: ${question.option2}`}</Text>
              <Text style={styles.option}>{`Option 3: ${question.option3}`}</Text>
              <Text style={styles.option}>{`Option 4: ${question.option4}`}</Text>
              <Text style={[styles.answer, isCorrect ? styles.correctAnswer : styles.incorrectAnswer]}>
                {`Your Answer: Option ${attempt.answer}`}
              </Text>
              <Text style={[styles.answer, styles.correctAnswer]}>
                {`Correct Answer: Option ${question.correctAnswer}`}
              </Text>
              <Text style={[styles.result, isCorrect ? styles.correctText : styles.incorrectText]}>
                {`Result: ${answerText}`}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 10,
  },
  attemptContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  questionText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  option: {
    marginBottom: 5,
  },
  answer: {
    marginBottom: 5,
  },
  correctAnswer: {
    color: 'green',
  },
  incorrectAnswer: {
    color: 'red',
  },
  result: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  correctText: {
    color: 'green',
  },
  incorrectText: {
    color: 'red',
  },
});

export default ReportComponent;
