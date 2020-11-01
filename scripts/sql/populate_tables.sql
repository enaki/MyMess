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

/* POPULATE MESSAGES TABLES */

/* POPULATE BLOCKED USERS TABLES */
INSERT INTO blocked_users (uid, targetid) VALUES (2, 3);

/* POPULATE FRIENDS TABLES */
INSERT INTO friends (uid1, uid2) VALUES (1, 2);
INSERT INTO friends (uid1, uid2) VALUES (2, 3);

/* POPULATE FRIEND REQUESTS TABLES */
INSERT INTO friend_requests (fromid, toid) VALUES (1, 3);
