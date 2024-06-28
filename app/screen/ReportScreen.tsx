/**
 * ReportScreen Component For User
 */

import { SafeAreaView,StyleSheet ,View,StatusBar,ScrollView,Text} from 'react-native'
import { useEffect, useState } from "react"
import { Attempt } from "../model/Attempt"
import { connectToDatabase } from "../db/ds"
import { getAttemptsByUserId } from "../services/AttemptService "
import { Question } from '../model/Question'
import { findAllQuestions } from '../services/QuestionService'
import { getData } from '../services/AsyncStorageService'
import { findByUsername } from '../services/UserService'
import ReportComponent from '../component/ReportComponent'


const ReportScreen:React.FC = ({ navigation }) => {
    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);


    //Load all data from database
    useEffect(() => {
      const loadData = async () => {
        try {
          const db = await connectToDatabase();
          const userName = await getData();
          const loginUser = await findByUsername(db, userName);
          if (!loginUser) {
            console.log("User not found");
          } else {
            const attemptsData = await getAttemptsByUserId(db, loginUser.userId);
            setAttempts(attemptsData);
          }
  
          const questionsData = await findAllQuestions(db);
          setQuestions(questionsData);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };
  
      loadData();
    }, []);
  
    return <ReportComponent  attempts={attempts} questions={questions}></ReportComponent>
      
    
      
  };
  
  export default ReportScreen;
  
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
