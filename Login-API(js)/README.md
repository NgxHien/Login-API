--- Data sending ---
- Register:
   fullName,
   email,
   password,
   phone
- Login: 
   email,
   password 
- Response: 
   Error ( if it is any ),
   Token (encrypted)
   
- DELETE: email - response: result message
- UPDATE: email, fullName, password, phone - response: result message
