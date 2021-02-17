# MyMess

MyMess is a social network application where users can make friends and communicate with each other.

A short demo can be found [here](https://www.youtube.com/watch?v=NI9f3F6KDYM&feature=youtu.be).

The application is built on 3 servers:
- **front-end service** (using [Angular](https://angular.io/)) (running on port 4200)
- **back-end service** (using [Kotlin Spring Boot](https://spring.io/projects/spring-boot) (running on port 2020)
- **notification socket service** (using [Node.js and socket.io](https://socket.io/docs/v3/index.html) (running on port 2021)


## Architecture

![Project Diagram](https://github.com/enaki/MyMess/blob/main/documentation/diagrams/images/architecture.png)



### Backend Service

The back-end server is built on multi-layer-architecture:
* __Presentation Layer__ (responsible for the controllers/user interface)
* __Bussiness Layer__ (responsible for the logic and functionality)
* __Persistence/Database Layer__ (responsible for CRUD operations)

Password are encrypted using SHA-256.

![Backend Service](https://github.com/enaki/MyMess/blob/main/documentation/diagrams/images/back-end-class-diagram-3-layer.png)



### Notification Service

The service is using 4 collections (can be scaled and integrated with a MongoDb database):
* __actives__ - contains uid - last time (unix) seen online (0 if the user is online)
* __allUsers__ - contains socket id, friendId, and username
* __socketsUidPair__ - contains socket id - uid 
* __unseenFrom__ - contains uid - list of unseen messages from user

`Note`: _actives_ is initialized with mock Data.


Events handled:
- __establish-connection__ - the user connects and gets back a list with unseen messages
- __notify-is-typing__ - the user's friend (if it is online) is notified that current user is typing
- __notify-stop-typing__ - the user's friend (if it is online) is notified that current user has stopped typing
- __friend-ids__ - the user request the list of friends ids and their last time seen online
- __send-chat-message__ - the user send a message to a friend and the message is redirected to backend service. If the user is online the message is sent to him to be updated live
- __send-message-notifications__ - the user send a message notification to a friend
- __message-notification-clear__ - the user notifies socket server to clear its message notification
- __logout__ - update socket server's collections


Events emited:
- __message-notifications__ - on _establish connection_ user receives notifications from received messages
- __receive-is-typing__ - on _notify-is-typing_ friend receives typing notification from his friend
- __receive-stop-typing__ - on _notify-stop-typing_ friend receives stop typing notification from his friend
- __take-friends-status__ - on _friend-ids_ user receives his friends' status
- __receive-chat-message__ - on _send-chat-message_ friend receives the incoming message
- __notify-inbox__ - on _send-chat-message_ friend receives the incoming message notification for the inbox
- __message-notifications__ - on _send-message-notifications_ friend receives the incoming message notification for a specific user in the inbox



### FrontEnd Service

#### Login Page

![Login Page](https://github.com/enaki/MyMess/blob/main/documentation/ss/login_page.png)


#### Register Page

![Register Page](https://github.com/enaki/MyMess/blob/main/documentation/ss/register_page.png)


#### Home Page

![Home Page](https://github.com/enaki/MyMess/blob/main/documentation/ss/home_page.png)


#### Update Profile Page

![Update Profile Page](https://github.com/enaki/MyMess/blob/main/documentation/ss/update_page.png)


#### Friends Page

![Friends Page](https://github.com/enaki/MyMess/blob/main/documentation/ss/friends_page.png)


#### Discover Page

![Discover Page](https://github.com/enaki/MyMess/blob/main/documentation/ss/discover_page.png)


#### Inbox Page

![Inbox Page](https://github.com/enaki/MyMess/blob/main/documentation/ss/inbox_page.png)

![Inbox Page](https://github.com/enaki/MyMess/blob/main/documentation/ss/inbox_page_2.png)



## How to run the project

1. Configure [PostgreSQL](https://www.postgresql.org/) 
   - Make a database
   - Change the [backend configuration](https://github.com/enaki/MyMess/blob/main/services/backend-api/src/main/resources/application.properties) with the created database's configuration
   - Change [python script](https://github.com/enaki/MyMess/blob/main/scripts/py/execute_sql_scripts.py) for creating the database's tables with the created database's configuration

2. Run python script for creating the tables and for inserting the initial data (users passwords can be found in [users.json](https://github.com/enaki/MyMess/blob/main/scripts/py/users.json))

3. Run the backend service

3. Run the notification service
   * ```npm install```
   * ```node App.js```
   
4. Run the frontend service
   * ```npm install```
   * ```ng serve```
   

`Note`: Reconnecting to socket on refreshing the frontend page from the browser when logged in was not implemented.