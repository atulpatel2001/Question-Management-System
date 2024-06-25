// import {StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { useState } from "react";
// import { LoginFormModel } from "../model/LoginForm";
// import { connectToDatabase } from "../db/ds";
// import { findByUsernameAndPassword } from "../services/UserService";
// import { showAlert } from "./AlertBox";
// import { getData, removeIteam, storeData } from "../services/AsyncStorageService";

// interface IState {
//     credential: LoginFormModel;
// }

// const LoginForm: React.FC = ({navigation}) => {

//     const [state, setState] = useState<IState>({
//         credential: {
//             username: "",
//             password: ""
//         }
//     })

//     const handleInputChange = (key: keyof LoginFormModel, value: string) => {
//         setState(prevState => ({
//             ...prevState,
//             credential: {
//                 ...prevState.credential,
//                 [key]: value
//             }
//         }));
//     };



//     const login = async () => {

//         console.log(state.credential)
//         try {
//             const db = await connectToDatabase();
//             const user = await findByUsernameAndPassword(db, state.credential.username, state.credential.password);
//             if (user == null) {
//                 console.log("credential is wrong")
//                 showAlert("Login Failed!", "Login Credential is Wrong !!!");
//             }
//             else {
//                 console.log("login successfully");
//                 if(user.role === 'ROLE_ADMIN'){
//                     navigation.navigate('AdminScreen');
//                 }
//                 else{
//                     navigation.navigate('UserScreen');
//                 }

//                 const data=getData();
//                 if(data == null){

//                 }
//                 else{
//                     removeIteam();
//                 }
              
              
//                 await storeData(state.credential.username);


//             }

//             setState({
//                 credential: {
//                     username: '',
//                     password: ''
//                 }
//             })
//         }
//         catch (error) {
//             console.log(error);
//         }

//     };



//     return (

       
//     );
// }
// export default LoginForm

// const styles = StyleSheet.create({
    

// });

