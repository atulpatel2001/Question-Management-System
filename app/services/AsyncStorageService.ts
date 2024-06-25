import AsyncStorage from '@react-native-async-storage/async-storage';


export async function storeData( value: string) {
    try {
      await AsyncStorage.setItem('username', JSON.stringify(value));
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }
  
 export async function getData(): Promise<string> {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        const jsonData = JSON.parse(value);
        return jsonData;  
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      return '';
    }
    return '';
  }

  export async function removeIteam(){
     try{

      AsyncStorage.removeItem("username");
     }
     catch(error){
      console.error('Error removing data:', error);
     }
  }