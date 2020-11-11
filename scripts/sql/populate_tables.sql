/* POPULATE USERS TABLES */
INSERT INTO users (username, passwordHash, email, avatarPath) VALUES ('ionel', 'ionel', 'ionel@gmail.com', 'null');
INSERT INTO users (username, passwordHash, email, avatarPath) VALUES ('ana', 'ana', 'ana@gmail.com', 'null');
INSERT INTO users (username, passwordHash, email, avatarPath) VALUES ('naruto', 'naruto', 'naruto@gmail.com', 'null');
INSERT INTO users (username, passwordHash, email, avatarPath) VALUES ('alfred', 'alfred', 'alfred@gmail.com', 'null');
INSERT INTO users (username, passwordHash, email, avatarPath) VALUES ('alehandro', 'alehandro', 'alehandro@gmail.com', 'null');

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

/* POPULATE MESSAGES TABLES */

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
