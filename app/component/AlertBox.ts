
import React from 'react';
import { Alert} from 'react-native';
export const showAlert = (title:string,subTitle:string) =>
    Alert.alert(
      title,
      subTitle,
     );