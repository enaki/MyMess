/* POPULATE USER PROFILES TABLES */
INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='ionel'), 
			'i am happy', TO_DATE('1980-12-12','YYYY-MM-DD'), 'male', TO_DATE('2019-12-12','YYYY-MM-DD'), 'Vaslui', 'Romania');
			
INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='ana'), 
			'i am not happy', TO_DATE('1990-12-12','YYYY-MM-DD'), 'male', TO_DATE('2019-07-12','YYYY-MM-DD'), 'Iasi', 'Romania');
			
INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='naruto'), 
			'i am naruto', TO_DATE('2000-12-12','YYYY-MM-DD'), 'male', TO_DATE('2019-10-13','YYYY-MM-DD'), 'Bucharest', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='alfred'), 
			'i am alfred', TO_DATE('1990-12-12','YYYY-MM-DD'), 'male', TO_DATE('2017-10-31','YYYY-MM-DD'), 'Brasov', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='alehandro'), 
			'i am alehandro', TO_DATE('1999-08-12','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Bacau', 'Romania');


/* POPULATE CHATS TABLES */
INSERT INTO chats (chatId) VALUES (default);
INSERT INTO chats (chatId) VALUES (default);

INSERT INTO user_chats (chatId, uid) VALUES (1, (SELECT uid FROM users WHERE username='ana'));
INSERT INTO user_chats (chatId, uid) VALUES (1, (SELECT uid FROM users WHERE username='ionel'));
INSERT INTO user_chats (chatId, uid) VALUES (2, (SELECT uid FROM users WHERE username='ana'));
INSERT INTO user_chats (chatId, uid) VALUES (2, (SELECT uid FROM users WHERE username='naruto'));

/* POPULATE MESSAGES TABLES */
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (1, (SELECT uid FROM users WHERE username='ana'), null, 'salut. ce faci?', null, TO_DATE('2020-10-01', 'YYYY-MM-DD'));
	
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (1, (SELECT uid FROM users WHERE username='ionel'), null, 'salut. bine, tu?', null, TO_DATE('2020-10-01', 'YYYY-MM-DD'));
	
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date)
	VALUES (2, (SELECT uid FROM users WHERE username='ana'), null, 'hello', null, TO_DATE('2020-10-02', 'YYYY-MM-DD'));
	
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (2, (SELECT uid FROM users WHERE username='naruto'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));

/* POPULATE BLOCKED USERS TABLES */
INSERT INTO blocked_users (uid, targetid) VALUES (1, 5);
INSERT INTO blocked_users (uid, targetid) VALUES (2, 5);
INSERT INTO blocked_users (uid, targetid) VALUES (5, 2);

/* POPULATE FRIENDS TABLES */
INSERT INTO friends (uid1, uid2) VALUES (1, 2);
INSERT INTO friends (uid1, uid2) VALUES (2, 3);
INSERT INTO friends (uid1, uid2) VALUES (4, 3);


/* POPULATE FRIEND REQUESTS TABLES */
INSERT INTO friend_requests (fromid, toid) VALUES (3, 1);
INSERT INTO friend_requests (fromid, toid) VALUES (1, 4);
INSERT INTO friend_requests (fromid, toid) VALUES (5, 4);
