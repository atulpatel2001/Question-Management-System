/**
 * Async Storage Service Perform All services.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Data store in async data storage
 * @param value 
 */
export async function storeData( value: string) {
    try {
      await AsyncStorage.setItem('username', JSON.stringify(value));
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }
  
  /**
   * Get Data From Async Storage
   * @returns 
   */
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


  /**
   * Remove Data from storage
   */
  export async function removeIteam(){
     try{

      AsyncStorage.removeItem("username");
     }
     catch(error){
      console.error('Error removing data:', error);
     }
  }