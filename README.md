# malon_chat

For the documentation, visit: [https://documenter.getpostman.com/view/15668662/VUjSGPQ3]
The env file contains a mongodb url link (MONGO_URI) and the jwt secret (JWT_SECRET)

---
Simply run: npm run dev to start the app

- Upon starting the app, the join socket must be emitted in order to save the user's detail and socket to the db for future targeting. Sample data is: 

    - {
    "name": "62f74a7347368fbf64a8190d",
    "type": "Users"
}

- The creat-group socket is emitted by the person who wants to create a group chat. The groupId is then saved to the db. There is an endpoint to get all group chats for other users who wish to join a particular group. Once they join a group, the socket 'join-group' should be emitted and everyone on the group get notified someone has joined. Sample data for create and join group is:

    - {
    "name": "62f74a7347368fbf64a8190d",
    "type": "Users",
    "groupId": "8c746991-420b-4328-a1f4-3ed6717eb017"
}

- To send group messages, the socket 'group-message' is emitted and everyone currently listening to the group will receive the message. Sample data for group message is:

    - {
    "sender": "62f74a7347368fbf64a8190d",
    "groupId": "8c746991-420b-4328-a1f4-3ed6717eb017",
    "message": "Hello everybody"
}

- Lastly, private-message is emitted for user to user messaging. Sample data is: 

    - {
    "sender": "62f74a7347368fbf64a8190d",
    "recipient": "8c746991-420b-4328-a1f4-3ed6717eb017",
    "message": "Hello everybody"
}
