
/**
 * Add Qusetion Component 
 * create form 
 */
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
import { Question } from "../model/Question"
import { useState } from "react"
import { Picker } from "@react-native-picker/picker"
import { connectToDatabase } from "../db/ds";
import { addQuestion } from "../services/QuestionService";
import AwesomeAlert from "react-native-awesome-alerts";

//IState For Statemanagemt
interface IState {
    question: Question,
    errors: { [key in keyof Question]: string | undefined };
}

//IntialQuestion State
const initialQuestionState: Question = {
    questionId: 0,
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: 1,
    createdAt: "",
    updatedAt: "",
};


//IntialError State
const initialErrorsState = {
    questionText: undefined,
    option1: undefined,
    option2: undefined,
    option3: undefined,
    option4: undefined,
    correctAnswer: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    questionId: undefined


};

/**
 * Add Qusetion Statement
 * @returns 
 */
const AddQuestion: React.FC = () => {
    const [state, setState] = useState<IState>({
        question: { ...initialQuestionState },
        errors: { ...initialErrorsState },
    });
    const [showAlert, setShowAlert] = useState(false);


/**
 * Validation Function get Field Data is valid
 * @returns 
 */
    const validate = (): boolean => {
        const errors = {} as { [key in keyof Question]: string | undefined };

        if (state.question.questionText.trim() === "") {
            errors.questionText = "Question text is required.";
        }

        if (state.question.option1.trim() === "") {
            errors.option1 = "Option 1 is required.";
        }

        if (state.question.option2.trim() === "") {
            errors.option2 = "Option 2 is required.";
        }

        if (state.question.option3.trim() === "") {
            errors.option3 = "Option 3 is required.";
        }
        if (state.question.correctAnswer === 0) {
            errors.option3 = "Must be required.";
        }

        if (state.question.option4.trim() === "") {
            errors.option4 = "Option 4 is required.";
        }

        setState((prevState) => ({ ...prevState, errors }));
        return Object.keys(errors).length === 0;
    };

    /**
     * Handle Change data from field
     * @param name 
     * @param value 
     */
    const handleChange = (name: keyof Question, value: string) => {
        setState((prevState) => ({
            ...prevState,
            question: {
                ...prevState.question,
                [name]: value,
            },
        }));
    };

    //Show Password And Hide Password
    const handleHideAlert = () => {
        setShowAlert(false);
    };

    /**
     * check currect qustion data
     * @param value number
     */
    const handleSelectChange = (value: number) => {
        setState((prevState) => ({
            ...prevState,
            question: {
                ...prevState.question,
                correctAnswer: value,
            },
        }));
    };

    /**
     * Submit Form Data And Store data in database
     */
    const handleSubmit = async () => {
        if (validate()) {

            setState({
                question: { ...initialQuestionState },
                errors: { ...initialErrorsState },
            });
            const db = await connectToDatabase();
            await addQuestion(db, state.question);
            setState({
                question: { ...initialQuestionState },
                errors: { ...initialErrorsState },
            })
            setShowAlert(true);
        } else {
            console.error("Validation errors:", state.errors);
            setShowAlert(false);
        }
    };

    return (

        <View style={styles.formContainer}>
            <Text style={styles.fieldLabel}>Question Text:</Text>
            <TextInput
                style={styles.textInput}
                multiline={true}
                numberOfLines={4}
                placeholder="Enter Question Text"
                onChangeText={(text) => handleChange("questionText", text)}
                value={state.question.questionText}
            />
            {state.errors.questionText && <Text style={styles.errorText}>{state.errors.questionText}</Text>}

            <Text style={styles.fieldLabel}>Option 1:</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Option 1"
                onChangeText={(text) => handleChange("option1", text)}
                value={state.question.option1}
            />
            {state.errors.option1 && <Text style={styles.errorText}>{state.errors.option1}</Text>}

            <Text style={styles.fieldLabel}>Option 2:</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Option 2"
                onChangeText={(text) => handleChange("option2", text)}
                value={state.question.option2}
            />
            {state.errors.option2 && <Text style={styles.errorText}>{state.errors.option2}</Text>}

            <Text style={styles.fieldLabel}>Option 3:</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Option 3"
                onChangeText={(text) => handleChange("option3", text)}
                value={state.question.option3}
            />
            {state.errors.option3 && <Text style={styles.errorText}>{state.errors.option3}</Text>}

            <Text style={styles.fieldLabel}>Option 4:</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Option 4"
                onChangeText={(text) => handleChange("option4", text)}
                value={state.question.option4}
            />
            {state.errors.option4 && <Text style={styles.errorText}>{state.errors.option4}</Text>}

            <Text style={styles.fieldLabel}>Correct Answer:</Text>
            <Picker
                selectedValue={state.question.correctAnswer}
                style={styles.pickerStyles}
                onValueChange={handleSelectChange}
            >
                <Picker.Item label="Option 1" value={1} />
                <Picker.Item label="Option 2" value={2} />
                <Picker.Item label="Option 3" value={3} />
                <Picker.Item label="Option 4" value={4} />
            </Picker>

            {state.errors.correctAnswer && <Text style={styles.errorText}>{state.errors.correctAnswer}</Text>}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>


            <AwesomeAlert
                show={showAlert}
                message="Successfully Add Qusetion !!"
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


}

const styles = StyleSheet.create({
    formContainer: {
        margin: 10,
        padding: 15,
        borderColor: "#B0BEC5",
        borderWidth: 2

    },
    fieldLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textInput: {
        padding: 10,
        borderRadius: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
        fontSize: 15,
        fontWeight: 'bold'
    },
    pickerStyles: {
        width: '100%',
        backgroundColor: '#CFD8DC',
        marginBottom: 15,
        borderWidth: 5,
        color: 'white',
        borderRadius: 50,
    },


    submitButton: {
        backgroundColor: "#0099ff",
        padding: 15,
        borderRadius: 5,
    },
    submitButtonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    errorText: {
        color: "red",
        fontSize: 15,
        marginBottom: 5,
        fontWeight: "bold",
    },
});

export default AddQuestion