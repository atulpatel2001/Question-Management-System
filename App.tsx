/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';


import Route from './app/component/routes';
import { connectToDatabase } from './app/db/ds';
import { CreateTables } from './app/db/CreateTable';
import { User } from './app/model/User';
import { addUser, findByUsername } from './app/services/UserService';
import { deleteAllAttempts } from './app/services/AttemptService ';



function App(): React.JSX.Element {

  const createTable = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await CreateTables(db);
      // await deleteAllAttempts(db);

      let admin: User = {
        name: 'Patel Atul J',
        password: 'atul123',
        role: 'ROLE_ADMIN',
        userId: 0,
        username: 'atulpatel123',
        createdAt: "",
        updatedAt: ""
      };

      try {
        const result = await findByUsername(db, "atulpatel123");
        if (result == null) {
          await addUser(db, admin);
          console.log("Inserted Admin");
        } else {
          console.log("Admin Already Registered");
        }
      } catch (error) {
        console.error('Error in database operation:', error);
      }

    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    createTable();
  }, [createTable]);


  return (
    <Route></Route>
  );
}


export default App;
