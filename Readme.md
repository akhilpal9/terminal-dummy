``To run``
npm install
node index.js

``Sample Output``
akhileshpal@AKHILESHPMAC atm % node index.js
Press Ctrl+C for exit
atm$ login alice
Hello, alice
Your balance is $0
atm$ deposit 100
Your balance is $100
atm$ logout
Goodbye, alice
atm$ login bob
Hello, bob
Your balance is $0
atm$ deposit 80
Your balance is $80
atm$ transfer alice 50
Transferred 50 to alice
Your balance is $30
atm$ transfer alice 100
Transferred 100 to alice
Your balance is $0
Owed $70 to alice
atm$ deposit 30
Transferred $30 to alice
Your balance is $0
Your balance is $0
Owed $40 to alice
atm$ logout
Goodbye, bob
atm$ login alice
Hello, alice
Your balance is $210
Owed $40 from bob
atm$ transfer bob 30
Transferred 30 to bob
Your balance is $210
Owed $10 from bob
atm$ logout
Goodbye, alice
atm$ login bob
Hello, bob
Your balance is $0
Owed $10 to alice
atm$ deposit 100
Transferred $10 to alice
Your balance is $90
Your balance is $90
atm$ logout
Goodbye, bob