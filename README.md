# bamboo-coding-challenge

## To run:
cd into bamboo-coding-challenge and then npm start 

There are two users that are set-up already on the app. You can log in with either:
### User 1:
User ID: 777 
Password: pass123 

### User 2:
User ID: 888 
Password: pass123 

If you log in as user 1, you can send money to user 2 using their user ID, and vice-versa.  
The home screen is for signing up, but you can sign in as either of these two users if you follow the sign in link at the bottom of the screen.  

Transactions screen correctly logs any sending or receiving of money made in the app.

### Issues:
Unfortunately, as this was my first time using React in a long time, there are several issues with this software.  
I had trouble remembering on how to correctly ensure that useState() variables update their value by the time they are needed.

For example, after logging in, the heading should say "Welcome, " followed by the name of the logged in user. But because the logged in user variable had not rendered its new value yet, the name does not appear.
