/* POPULATE USER PROFILES TABLES */
INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='ionel'), 
			'i am happy', TO_DATE('1980-12-12','YYYY-MM-DD'), 'male', TO_DATE('2019-12-12','YYYY-MM-DD'), 'Vaslui', 'Romania');
			
INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='mikasa'), 
			'i am not mikasa', TO_DATE('1990-12-12','YYYY-MM-DD'), 'male', TO_DATE('2019-07-12','YYYY-MM-DD'), 'Iasi', 'Romania');
			
INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='naruto'), 
			'i am naruto', TO_DATE('2000-12-12','YYYY-MM-DD'), 'male', TO_DATE('2019-10-13','YYYY-MM-DD'), 'Bucharest', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='alfred'), 
			'i am alfred', TO_DATE('1990-12-12','YYYY-MM-DD'), 'male', TO_DATE('2017-10-31','YYYY-MM-DD'), 'Brasov', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='alehandro'), 
			'i am alehandro', TO_DATE('1999-08-12','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Bacau', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='ancuta'), 
			'i am ancuta', TO_DATE('1998-03-10','YYYY-MM-DD'), 'female', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Vaslui', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='ezio'), 
			'i am ezio', TO_DATE('2005-04-17','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Florence', 'Italy');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='andrei'), 
			'i am andrei', TO_DATE('1999-07-27','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Iasi', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='doge'), 
			'i am doge', TO_DATE('2017-01-01','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Constanta', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='dumbledore'), 
			'i am dumbledore', TO_DATE('1930-09-20','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Vaslui', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='edward'), 
			'i am edward', TO_DATE('2001-06-29','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Timisoara', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='frodo'), 
			'i am frodo', TO_DATE('1980-02-17','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Botosani', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='gabi'), 
			'i am gabi', TO_DATE('1998-07-14','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Iasi', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='jerry'), 
			'i am jerry', TO_DATE('1970-01-30','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Bacau', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='l'), 
			'i am l', TO_DATE('1995-03-28','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Bucuresti', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='lelouch'), 
			'i am lelouch', TO_DATE('1990-08-05','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Vaslui', 'Romania');

INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='mihai'), 
			'i am mihai', TO_DATE('1994-07-02','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Cluj', 'Romania');
			
INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='taiga'), 
			'i am taiga', TO_DATE('1990-04-25','YYYY-MM-DD'), 'female', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Vaslui', 'Romania');
			
INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='tom'), 
			'i am tom', TO_DATE('1970-01-30','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Bacau', 'Romania');
			
INSERT INTO user_profiles (uid, status, birthdate, gender, dateRegistered, city, country) 
	VALUES ((SELECT uid FROM users WHERE username='vasile'), 
			'i am vasile', TO_DATE('1998-05-26','YYYY-MM-DD'), 'male', TO_DATE('2018-10-13','YYYY-MM-DD'), 'Ungheni', 'Romania');

/* POPULATE CHATS TABLES */
INSERT INTO chats (chatId) VALUES (default);
INSERT INTO chats (chatId) VALUES (default);

INSERT INTO user_chats (chatId, uid) VALUES (1, (SELECT uid FROM users WHERE username='mikasa'));
INSERT INTO user_chats (chatId, uid) VALUES (1, (SELECT uid FROM users WHERE username='naruto'));
INSERT INTO user_chats (chatId, uid) VALUES (2, (SELECT uid FROM users WHERE username='mikasa'));
INSERT INTO user_chats (chatId, uid) VALUES (2, (SELECT uid FROM users WHERE username='ancuta'));
INSERT INTO user_chats (chatId, uid) VALUES (3, (SELECT uid FROM users WHERE username='mikasa'));
INSERT INTO user_chats (chatId, uid) VALUES (3, (SELECT uid FROM users WHERE username='ezio'));
INSERT INTO user_chats (chatId, uid) VALUES (4, (SELECT uid FROM users WHERE username='mikasa'));
INSERT INTO user_chats (chatId, uid) VALUES (4, (SELECT uid FROM users WHERE username='gabi'));
INSERT INTO user_chats (chatId, uid) VALUES (5, (SELECT uid FROM users WHERE username='mikasa'));
INSERT INTO user_chats (chatId, uid) VALUES (5, (SELECT uid FROM users WHERE username='lelouch'));
INSERT INTO user_chats (chatId, uid) VALUES (6, (SELECT uid FROM users WHERE username='mikasa'));
INSERT INTO user_chats (chatId, uid) VALUES (6, (SELECT uid FROM users WHERE username='mihai'));
INSERT INTO user_chats (chatId, uid) VALUES (7, (SELECT uid FROM users WHERE username='naruto'));
INSERT INTO user_chats (chatId, uid) VALUES (7, (SELECT uid FROM users WHERE username='andrei'));
INSERT INTO user_chats (chatId, uid) VALUES (8, (SELECT uid FROM users WHERE username='naruto'));
INSERT INTO user_chats (chatId, uid) VALUES (8, (SELECT uid FROM users WHERE username='doge'));
INSERT INTO user_chats (chatId, uid) VALUES (9, (SELECT uid FROM users WHERE username='naruto'));
INSERT INTO user_chats (chatId, uid) VALUES (9, (SELECT uid FROM users WHERE username='dumbledore'));
INSERT INTO user_chats (chatId, uid) VALUES (10, (SELECT uid FROM users WHERE username='naruto'));
INSERT INTO user_chats (chatId, uid) VALUES (10, (SELECT uid FROM users WHERE username='edward'));
INSERT INTO user_chats (chatId, uid) VALUES (11, (SELECT uid FROM users WHERE username='naruto'));
INSERT INTO user_chats (chatId, uid) VALUES (11, (SELECT uid FROM users WHERE username='frodo'));
INSERT INTO user_chats (chatId, uid) VALUES (12, (SELECT uid FROM users WHERE username='naruto'));
INSERT INTO user_chats (chatId, uid) VALUES (12, (SELECT uid FROM users WHERE username='jerry'));
INSERT INTO user_chats (chatId, uid) VALUES (13, (SELECT uid FROM users WHERE username='naruto'));
INSERT INTO user_chats (chatId, uid) VALUES (13, (SELECT uid FROM users WHERE username='l'));
INSERT INTO user_chats (chatId, uid) VALUES (14, (SELECT uid FROM users WHERE username='alfred'));
INSERT INTO user_chats (chatId, uid) VALUES (14, (SELECT uid FROM users WHERE username='ancuta'));
INSERT INTO user_chats (chatId, uid) VALUES (15, (SELECT uid FROM users WHERE username='alfred'));
INSERT INTO user_chats (chatId, uid) VALUES (15, (SELECT uid FROM users WHERE username='edward'));
INSERT INTO user_chats (chatId, uid) VALUES (16, (SELECT uid FROM users WHERE username='alfred'));
INSERT INTO user_chats (chatId, uid) VALUES (16, (SELECT uid FROM users WHERE username='frodo'));
INSERT INTO user_chats (chatId, uid) VALUES (17, (SELECT uid FROM users WHERE username='alfred'));
INSERT INTO user_chats (chatId, uid) VALUES (17, (SELECT uid FROM users WHERE username='jerry'));
INSERT INTO user_chats (chatId, uid) VALUES (18, (SELECT uid FROM users WHERE username='alfred'));
INSERT INTO user_chats (chatId, uid) VALUES (18, (SELECT uid FROM users WHERE username='lelouch'));
INSERT INTO user_chats (chatId, uid) VALUES (19, (SELECT uid FROM users WHERE username='alfred'));
INSERT INTO user_chats (chatId, uid) VALUES (19, (SELECT uid FROM users WHERE username='taiga'));
INSERT INTO user_chats (chatId, uid) VALUES (20, (SELECT uid FROM users WHERE username='alehandro'));
INSERT INTO user_chats (chatId, uid) VALUES (20, (SELECT uid FROM users WHERE username='ancuta'));
INSERT INTO user_chats (chatId, uid) VALUES (21, (SELECT uid FROM users WHERE username='alehandro'));
INSERT INTO user_chats (chatId, uid) VALUES (21, (SELECT uid FROM users WHERE username='ezio'));
INSERT INTO user_chats (chatId, uid) VALUES (22, (SELECT uid FROM users WHERE username='alehandro'));
INSERT INTO user_chats (chatId, uid) VALUES (22, (SELECT uid FROM users WHERE username='frodo'));
INSERT INTO user_chats (chatId, uid) VALUES (23, (SELECT uid FROM users WHERE username='alehandro'));
INSERT INTO user_chats (chatId, uid) VALUES (23, (SELECT uid FROM users WHERE username='mihai'));
INSERT INTO user_chats (chatId, uid) VALUES (24, (SELECT uid FROM users WHERE username='ancuta'));
INSERT INTO user_chats (chatId, uid) VALUES (24, (SELECT uid FROM users WHERE username='ezio'));
INSERT INTO user_chats (chatId, uid) VALUES (25, (SELECT uid FROM users WHERE username='ancuta'));
INSERT INTO user_chats (chatId, uid) VALUES (25, (SELECT uid FROM users WHERE username='doge'));
INSERT INTO user_chats (chatId, uid) VALUES (26, (SELECT uid FROM users WHERE username='ancuta'));
INSERT INTO user_chats (chatId, uid) VALUES (26, (SELECT uid FROM users WHERE username='frodo'));
INSERT INTO user_chats (chatId, uid) VALUES (27, (SELECT uid FROM users WHERE username='ezio'));
INSERT INTO user_chats (chatId, uid) VALUES (27, (SELECT uid FROM users WHERE username='dumbledore'));
INSERT INTO user_chats (chatId, uid) VALUES (28, (SELECT uid FROM users WHERE username='ezio'));
INSERT INTO user_chats (chatId, uid) VALUES (28, (SELECT uid FROM users WHERE username='frodo'));
INSERT INTO user_chats (chatId, uid) VALUES (29, (SELECT uid FROM users WHERE username='ezio'));
INSERT INTO user_chats (chatId, uid) VALUES (29, (SELECT uid FROM users WHERE username='jerry'));
INSERT INTO user_chats (chatId, uid) VALUES (30, (SELECT uid FROM users WHERE username='ezio'));
INSERT INTO user_chats (chatId, uid) VALUES (30, (SELECT uid FROM users WHERE username='l'));
INSERT INTO user_chats (chatId, uid) VALUES (31, (SELECT uid FROM users WHERE username='ezio'));
INSERT INTO user_chats (chatId, uid) VALUES (31, (SELECT uid FROM users WHERE username='lelouch'));
INSERT INTO user_chats (chatId, uid) VALUES (32, (SELECT uid FROM users WHERE username='ezio'));
INSERT INTO user_chats (chatId, uid) VALUES (32, (SELECT uid FROM users WHERE username='taiga'));
INSERT INTO user_chats (chatId, uid) VALUES (33, (SELECT uid FROM users WHERE username='andrei'));
INSERT INTO user_chats (chatId, uid) VALUES (33, (SELECT uid FROM users WHERE username='doge'));
INSERT INTO user_chats (chatId, uid) VALUES (34, (SELECT uid FROM users WHERE username='andrei'));
INSERT INTO user_chats (chatId, uid) VALUES (34, (SELECT uid FROM users WHERE username='gabi'));
INSERT INTO user_chats (chatId, uid) VALUES (35, (SELECT uid FROM users WHERE username='andrei'));
INSERT INTO user_chats (chatId, uid) VALUES (35, (SELECT uid FROM users WHERE username='lelouch'));
INSERT INTO user_chats (chatId, uid) VALUES (36, (SELECT uid FROM users WHERE username='dumbledore'));
INSERT INTO user_chats (chatId, uid) VALUES (36, (SELECT uid FROM users WHERE username='gabi'));
INSERT INTO user_chats (chatId, uid) VALUES (37, (SELECT uid FROM users WHERE username='dumbledore'));
INSERT INTO user_chats (chatId, uid) VALUES (37, (SELECT uid FROM users WHERE username='lelouch'));
INSERT INTO user_chats (chatId, uid) VALUES (38, (SELECT uid FROM users WHERE username='dumbledore'));
INSERT INTO user_chats (chatId, uid) VALUES (38, (SELECT uid FROM users WHERE username='mihai'));
INSERT INTO user_chats (chatId, uid) VALUES (39, (SELECT uid FROM users WHERE username='edward'));
INSERT INTO user_chats (chatId, uid) VALUES (39, (SELECT uid FROM users WHERE username='frodo'));
INSERT INTO user_chats (chatId, uid) VALUES (40, (SELECT uid FROM users WHERE username='edward'));
INSERT INTO user_chats (chatId, uid) VALUES (40, (SELECT uid FROM users WHERE username='l'));
INSERT INTO user_chats (chatId, uid) VALUES (41, (SELECT uid FROM users WHERE username='edward'));
INSERT INTO user_chats (chatId, uid) VALUES (41, (SELECT uid FROM users WHERE username='lelouch'));
INSERT INTO user_chats (chatId, uid) VALUES (42, (SELECT uid FROM users WHERE username='frodo'));
INSERT INTO user_chats (chatId, uid) VALUES (42, (SELECT uid FROM users WHERE username='l'));
INSERT INTO user_chats (chatId, uid) VALUES (43, (SELECT uid FROM users WHERE username='gabi'));
INSERT INTO user_chats (chatId, uid) VALUES (43, (SELECT uid FROM users WHERE username='jerry'));

/* POPULATE MESSAGES TABLES */

INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date)
	VALUES (1, (SELECT uid FROM users WHERE username='mikasa'), null, 'hello', null, TO_DATE('2020-10-02', 'YYYY-MM-DD'));
	
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (1, (SELECT uid FROM users WHERE username='naruto'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));

INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (2, (SELECT uid FROM users WHERE username='mikasa'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (2, (SELECT uid FROM users WHERE username='ancuta'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (3, (SELECT uid FROM users WHERE username='mikasa'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (3, (SELECT uid FROM users WHERE username='ezio'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (4, (SELECT uid FROM users WHERE username='mikasa'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (4, (SELECT uid FROM users WHERE username='gabi'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (5, (SELECT uid FROM users WHERE username='mikasa'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (5, (SELECT uid FROM users WHERE username='lelouch'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (6, (SELECT uid FROM users WHERE username='mikasa'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (6, (SELECT uid FROM users WHERE username='mihai'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (7, (SELECT uid FROM users WHERE username='naruto'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (7, (SELECT uid FROM users WHERE username='andrei'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (8, (SELECT uid FROM users WHERE username='naruto'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (8, (SELECT uid FROM users WHERE username='doge'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (9, (SELECT uid FROM users WHERE username='naruto'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (9, (SELECT uid FROM users WHERE username='dumbledore'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (10, (SELECT uid FROM users WHERE username='naruto'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));
INSERT INTO messages (chatId, ownerId, replyToMessageId, text, imagePath, date) 
	VALUES (10, (SELECT uid FROM users WHERE username='edward'), null, 'hi', null, TO_DATE('2020-10-03', 'YYYY-MM-DD'));

/* POPULATE BLOCKED USERS TABLES */
INSERT INTO blocked_users (uid, targetid) VALUES (1, 5);
INSERT INTO blocked_users (uid, targetid) VALUES (2, 5);
INSERT INTO blocked_users (uid, targetid) VALUES (5, 2);

/* POPULATE FRIENDS TABLES */
INSERT INTO friends (uid1, uid2) VALUES (2,3);
INSERT INTO friends (uid1, uid2) VALUES (2,6);
INSERT INTO friends (uid1, uid2) VALUES (2,7);
INSERT INTO friends (uid1, uid2) VALUES (2,13);
INSERT INTO friends (uid1, uid2) VALUES (2,16);
INSERT INTO friends (uid1, uid2) VALUES (2,17);
INSERT INTO friends (uid1, uid2) VALUES (3,8);
INSERT INTO friends (uid1, uid2) VALUES (3,9);
INSERT INTO friends (uid1, uid2) VALUES (3,10);
INSERT INTO friends (uid1, uid2) VALUES (3,11);
INSERT INTO friends (uid1, uid2) VALUES (3,12);
INSERT INTO friends (uid1, uid2) VALUES (3,14);
INSERT INTO friends (uid1, uid2) VALUES (3,15);
INSERT INTO friends (uid1, uid2) VALUES (4,6);
INSERT INTO friends (uid1, uid2) VALUES (4,11);
INSERT INTO friends (uid1, uid2) VALUES (4,12);
INSERT INTO friends (uid1, uid2) VALUES (4,14);
INSERT INTO friends (uid1, uid2) VALUES (4,16);
INSERT INTO friends (uid1, uid2) VALUES (4,18);
INSERT INTO friends (uid1, uid2) VALUES (5,6);
INSERT INTO friends (uid1, uid2) VALUES (5,7);
INSERT INTO friends (uid1, uid2) VALUES (5,12);
INSERT INTO friends (uid1, uid2) VALUES (5,17);
INSERT INTO friends (uid1, uid2) VALUES (6,9);
INSERT INTO friends (uid1, uid2) VALUES (6,12);
INSERT INTO friends (uid1, uid2) VALUES (6,7);
INSERT INTO friends (uid1, uid2) VALUES (7,10);
INSERT INTO friends (uid1, uid2) VALUES (7,12);
INSERT INTO friends (uid1, uid2) VALUES (7,14);
INSERT INTO friends (uid1, uid2) VALUES (7,15);
INSERT INTO friends (uid1, uid2) VALUES (7,16);
INSERT INTO friends (uid1, uid2) VALUES (7,18);
INSERT INTO friends (uid1, uid2) VALUES (8,9);
INSERT INTO friends (uid1, uid2) VALUES (8,13);
INSERT INTO friends (uid1, uid2) VALUES (8,17);
INSERT INTO friends (uid1, uid2) VALUES (9,12);
INSERT INTO friends (uid1, uid2) VALUES (9,14);
INSERT INTO friends (uid1, uid2) VALUES (9,16);
INSERT INTO friends (uid1, uid2) VALUES (10,13);
INSERT INTO friends (uid1, uid2) VALUES (10,16);
INSERT INTO friends (uid1, uid2) VALUES (10,17);
INSERT INTO friends (uid1, uid2) VALUES (11,12);
INSERT INTO friends (uid1, uid2) VALUES (11,15);
INSERT INTO friends (uid1, uid2) VALUES (11,16);
INSERT INTO friends (uid1, uid2) VALUES (12,15);
INSERT INTO friends (uid1, uid2) VALUES (13,14);


/* POPULATE FRIEND REQUESTS TABLES */
INSERT INTO friend_requests (fromid, toid) VALUES (3, 1);
INSERT INTO friend_requests (fromid, toid) VALUES (1, 4);
INSERT INTO friend_requests (fromid, toid) VALUES (5, 4);
INSERT INTO friend_requests (fromid, toid) VALUES (16, 3);
INSERT INTO friend_requests (fromid, toid) VALUES (2, 8);
INSERT INTO friend_requests (fromid, toid) VALUES (10, 4);
INSERT INTO friend_requests (fromid, toid) VALUES (5, 10);
INSERT INTO friend_requests (fromid, toid) VALUES (2, 11);
