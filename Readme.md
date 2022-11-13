``To run``
npm install<br />
node index.js<br />

``Sample Output``
akhileshpal@AKHILESHPMAC atm % node index.js<br />
Press Ctrl+C for exit<br />
atm$ login alice<br />
Hello, alice<br />
Your balance is $0<br />
atm$ deposit 100<br />
Your balance is $100<br />
atm$ logout<br />
Goodbye, alice<br />
atm$ login bob<br />
Hello, bob<br />
Your balance is $0<br />
atm$ deposit 80<br />
Your balance is $80<br />
atm$ transfer alice 50<br />
Transferred 50 to alice<br />
Your balance is $30<br />
atm$ transfer alice 100<br />
Transferred 100 to alice<br />
Your balance is $0<br />
Owed $70 to alice<br />
atm$ deposit 30<br />
Transferred $30 to alice<br />
Your balance is $0<br />
Your balance is $0<br />
Owed $40 to alice<br />
atm$ logout<br />
Goodbye, bob<br />
atm$ login alice<br />
Hello, alice<br />
Your balance is $210<br />
Owed $40 from bob<br />
atm$ transfer bob 30<br />
Transferred 30 to bob<br />
Your balance is $210<br />
Owed $10 from bob<br />
atm$ logout<br />
Goodbye, alice<br />
atm$ login bob<br />
Hello, bob<br />
Your balance is $0<br />
Owed $10 to alice<br />
atm$ deposit 100<br />
Transferred $10 to alice<br />
Your balance is $90<br />
Your balance is $90<br />
atm$ logout<br />
Goodbye, bob<br />
