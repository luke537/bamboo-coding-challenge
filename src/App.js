import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Tab, Tabs } from '@mui/material'
import { TabPanel, TabContext } from '@mui/lab';
import Transactions from './components/Transactions';
import Balance from './components/Balance';
import SendMoney from './components/SendMoney';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [value, setValue] = useState("balance")
  const [currentUser, setCurrentUser] = useState({})
  const [users, setUsers] = useState(
    [
      {
        id: 777, firstName: "Bob", lastName: "Dylan", 
        password: "pass123", balance: 600.0, 
        transactions: [{transId: 54, userId: 2, type: "receive", amount: 500.0}]
      },
      {
        id: 888, firstName: "John", lastName: "Doe",
        password: "pass123", balance: 100.0, 
        transactions: [{transId: 325, userId: 1, type: "send", amount: 500.0}]
      }
    ]
  )

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchUser = (userId, password) => {
    let user = users.filter(user => user.id == userId && user.password == password)[0]
    setCurrentUser(user)
    return user
  }

  const addUser = (user) => {
    let id = Math.floor(Math.random() * 1000) + 1
    let newUser = { id, balance: 100, transactions: [], ...user }
    setUsers(prevUsers => [...prevUsers, newUser])
    setCurrentUser(newUser)
  }

  const sendMoney = (recipientUserId, amount) => {
    // Extract and update recipient user
    let recipientUser = users.filter(user => user.id === recipientUserId)[0]
    recipientUser.balance += amount
    let transId = Math.floor(Math.random() * 10000) + 1
    let newRecipientTransaction = {
      "transId": transId, "otherId": currentUser.id,
      "type": "receive", "amount": amount
  }
    recipientUser.transactions = [...recipientUser.transactions, newRecipientTransaction]

    // Extract and update sending user
    let sendingUser = users.filter(user => user.id === currentUser.id)[0]
    sendingUser.balance -= amount
    transId = Math.floor(Math.random() * 10000) + 1
    let newSenderTransaction = {
      "transId": transId, "otherId": recipientUserId, 
      "type": "send", "amount": amount
    }
    sendingUser.transactions = [...sendingUser.transactions, newSenderTransaction]

    // Create a new users array to include the updated users
    let newUsersArray = users.filter(user => user.id !== recipientUserId && user.id !== currentUser.id)
    newUsersArray = [...newUsersArray, recipientUser, sendingUser]

    setUsers(newUsersArray)
    setCurrentUser(sendingUser)
  }

  useEffect(() => {
    if (Object.keys(currentUser).length !== 0) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [currentUser])
  

  return (
    <Router>
      <>
      <Routes>
        <Route path="/" element={<SignUp onAddUser={addUser}/>} />
        <Route path="/signIn" element={<SignIn onFetchUser={fetchUser}/>} />

        <Route path="/signedIn" element={
          <>
          {isLoggedIn &&
          <TabContext value={value}>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="balance" label='Balance' />
                <Tab value="transactions" label="Transactions" />
                <Tab value="send-money" label="Send Money" />
              </Tabs>

              <TabPanel value="balance" index={0}><Balance user={currentUser} /></TabPanel>
              <TabPanel value="transactions" index={1}><Transactions user={currentUser}/></TabPanel>
              <TabPanel value="send-money" index={2}>
                <SendMoney onSendMoney={sendMoney}/>
              </TabPanel>
          </TabContext>
        }
          </>
        } />
      </Routes>
      </>
    </Router>
  );
}

export default App;
