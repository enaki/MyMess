/* POPULATE USERS TABLES */
INSERT INTO users (username, passwordHash, email, avatarPath) VALUES ('ionel', 'ionel', 'ionel@gmail.com', 'null');
INSERT INTO users (username, passwordHash, email, avatarPath) VALUES ('ana', 'ana', 'ana@gmail.com', 'null');
INSERT INTO users (username, passwordHash, email, avatarPath) VALUES ('naruto', 'naruto', 'naruto@gmail.com', 'null');

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


/* POPULATE CHATS TABLES */
INSERT INTO chats (chatId) VALUES (default);
INSERT INTO chats (chatId) VALUES (default);

INSERT INTO user_chats (chatId, uid) VALUES (1, (SELECT uid FROM users WHERE username='ana'));
INSERT INTO user_chats (chatId, uid) VALUES (1, (SELECT uid FROM users WHERE username='ionel'));
INSERT INTO user_chats (chatId, uid) VALUES (2, (SELECT uid FROM users WHERE username='ana'));
INSERT INTO user_chats (chatId, uid) VALUES (2, (SELECT uid FROM users WHERE username='naruto'));

/* POPULATE MESSAGES TABLES */
INSERT INTO messages (chatId, ownerId, text, imagePath, date) 
	VALUES (1, (SELECT uid FROM users WHERE username='ana'), 'salut. ce faci?', 'null', TO_DATE('2020-10-01', 'YYYY-MM-DD'));
	
INSERT INTO messages (chatId, ownerId, text, imagePath, date) 
	VALUES (1, (SELECT uid FROM users WHERE username='ionel'), 'salut. bine, tu?', 'null', TO_DATE('2020-10-01', 'YYYY-MM-DD'));
	
INSERT INTO messages (chatId, ownerId, text, imagePath, date)
	VALUES (2, (SELECT uid FROM users WHERE username='ana'), 'hello', 'null', TO_DATE('2020-10-02', 'YYYY-MM-DD'));
	
INSERT INTO messages (chatId, ownerId, text, imagePath, date) 
	VALUES (2, (SELECT uid FROM users WHERE username='naruto'), 'hi', 'null', TO_DATE('2020-10-03', 'YYYY-MM-DD'));

/* POPULATE BLOCKED USERS TABLES */

/* POPULATE FRIENDS TABLES */

/* POPULATE FRIEND REQUESTS TABLES */
