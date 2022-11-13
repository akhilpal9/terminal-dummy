``To run``
npm install__
node index.js__

``Sample Output``
akhileshpal@AKHILESHPMAC atm % node index.js__
Press Ctrl+C for exit__
atm$ login alice__
Hello, alice__
Your balance is $0__
atm$ deposit 100__
Your balance is $100__
atm$ logout__
Goodbye, alice__
atm$ login bob__
Hello, bob__
Your balance is $0__
atm$ deposit 80__
Your balance is $80__
atm$ transfer alice 50__
Transferred 50 to alice__
Your balance is $30__
atm$ transfer alice 100__
Transferred 100 to alice__
Your balance is $0__
Owed $70 to alice__
atm$ deposit 30__
Transferred $30 to alice__
Your balance is $0__
Your balance is $0__
Owed $40 to alice__
atm$ logout__
Goodbye, bob__
atm$ login alice__
Hello, alice__
Your balance is $210__
Owed $40 from bob__
atm$ transfer bob 30__
Transferred 30 to bob__
Your balance is $210__
Owed $10 from bob__
atm$ logout__
Goodbye, alice__
atm$ login bob__
Hello, bob__
Your balance is $0__
Owed $10 to alice__
atm$ deposit 100__
Transferred $10 to alice__
Your balance is $90__
Your balance is $90__
atm$ logout__
Goodbye, bob__
