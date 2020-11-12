
CREATE TABLE users(
	uid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username TEXT UNIQUE,
	passwordHash TEXT CHECK (LENGTH(passwordHash) >= 3),
	email TEXT,
	avatarPath TEXT
);

CREATE TABLE user_profiles(
	uid INT PRIMARY KEY,
	status TEXT,
	birthdate DATE CHECK (birthdate > '1900-01-01'),
	gender TEXT,
	dateRegistered DATE CHECK (dateRegistered > '2010-01-01'),
	city TEXT,
	country TEXT,
	CONSTRAINT uid_user_profiles_fk  FOREIGN KEY(uid) REFERENCES users(uid)
);

CREATE TABLE chats(
	chatId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);

CREATE TABLE user_chats(
	chatId INT,
	uid INT,
	CONSTRAINT uid_chats_fk  FOREIGN KEY(uid) REFERENCES users(uid),
	CONSTRAINT chatId_chats_fk  FOREIGN KEY(chatId) REFERENCES chats(chatId)
);

CREATE TABLE messages(
	messageId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	chatId INT,
	ownerId INT,
	text TEXT,
	imagePath TEXT,
	date TIMESTAMP,
	CONSTRAINT chatId_messages_fk  FOREIGN KEY(chatId) REFERENCES chats(chatId),
	CONSTRAINT ownerId_messages_fk  FOREIGN KEY(ownerId) REFERENCES users(uid)
);

CREATE TABLE blocked_users(
	blockedUsersId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	uid INT,
	targetId INT,
	CONSTRAINT uid_blocked_users_fk  FOREIGN KEY(uid) REFERENCES users(uid),
	CONSTRAINT targetId_blocked_users_fk  FOREIGN KEY(targetId) REFERENCES users(uid)
);

CREATE TABLE friends(
	friendshipId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	uid1 INT,
	uid2 INT,
	CONSTRAINT uid1_blocked_users_fk  FOREIGN KEY(uid1) REFERENCES users(uid),
	CONSTRAINT uid2_blocked_users_fk  FOREIGN KEY(uid2) REFERENCES users(uid)
);

CREATE TABLE friend_requests(
	friendRequestId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	fromId INT,
	toId INT,
	CONSTRAINT uid_blocked_users_fk  FOREIGN KEY(fromId) REFERENCES users(uid),
	CONSTRAINT targetId_blocked_users_fk  FOREIGN KEY(toId) REFERENCES users(uid)
);
