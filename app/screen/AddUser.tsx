import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { User } from "../model/User";
import { useState } from "react";
import { connectToDatabase } from "../db/ds";
import { addUser } from "../services/UserService";
import { showAlert } from "../component/AlertBox";
import AwesomeAlert from "react-native-awesome-alerts";

interface IState {
  user: User;
  errors: { [key in keyof User]: string | undefined };

}

const AddUser: React.FC = () => {
  const [state, setState] = useState<IState>({
    user: {
      username: "",
      password: "",
      userId: 0,
      name: "",
      createdAt: "",
      updatedAt: "",
      role: "ROLE_USER",
    },
    errors: {
      username: undefined,
      password: undefined,
      userId: undefined,
      name: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      role: undefined,
    },


  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (name: keyof User, value: string) => {
    setState((prevUser) => ({
      ...prevUser,
      user: { ...prevUser.user, [name]: value },
    }));
  };

  const validate = (): boolean => {
    const errors = {} as { [key in keyof User]: string }; // Typed error object
    const usernameRegex = /^[a-zA-Z0-9._]+$/; // Alphanumeric username with optional dots and underscores
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*])[^\s]{8,}$/; // Minimum 8 characters with various complexities

    if (!usernameRegex.test(state.user.username)) {
      errors.username = "Username must be alphanumeric and can contain dots or underscores.";
    }
    if (!passwordRegex.test(state.user.password)) {
      errors.password =
        "Password must be at least 8 characters with a digit, lowercase, uppercase, and special character.";
    }
    if (state.user.username.trim() === "") {
      errors.name = "Name cannot be empty.";
    }

    setState((prevUser) => ({ ...prevUser, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const db = await connectToDatabase();
      await addUser(db, state.user);
      setShowAlert(true);
      setState(
        {
          user: {
            username: "",
            password: "",
            userId: 0,
            name: "",
            createdAt: "",
            updatedAt: "",
            role: "ROLE_USER",
          },
          errors: {
            username: undefined,
            password: undefined,
            userId: undefined,
            name: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            role: undefined,
          },

        }
      )

    } else {
      console.error("Validation errors:", state.errors);
      setShowAlert(false);
    }
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
        value={state.user.username}
        autoCapitalize="none" // Prevent auto-capitalization
      />
      {state.errors.username && <Text style={styles.errorText}>{state.errors.username}</Text>}

      <Text style={styles.fieldLabel}>Password:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Password"
        secureTextEntry={true}
        onChangeText={(text) => handleChange("password", text)}
        value={state.user.password}
      />
      {state.errors.password && <Text style={styles.errorText}>{state.errors.password}</Text>}

      <Text style={styles.fieldLabel}>Name:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Name"
        onChangeText={(text) => handleChange("name", text)}
        value={state.user.name}
      />
      {state.errors.name && <Text style={styles.errorText}>{state.errors.name}</Text>}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <AwesomeAlert
        show={showAlert}
        message="Successfully Register User!!"
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
export default AddUser

const styles = StyleSheet.create({
  formContainer: {
    margin: 10,
    padding: 5
  },
  fieldLabel: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  textInput: {
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    fontWeight: 'bold'

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
    fontWeight: 'bold'
  },
});