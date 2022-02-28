
// const io = require("socket.io")(8100, {
//     cors: {
//       origin: "http://localhost:3000",
//     },
//   });
  
//   let users = [];
  
//   const addUser = (userId, socketId) => {
//     !users.some((user) => user.userId === userId) &&
//       users.push({ userId, socketId });
//   };
  
//   const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId);
//   };
  
//   const getUser = (userId) => {
//     return users.find((user) => user.userId === userId);
//   };
  
//   io.on("connection", (socket) => {
//     //when ceonnect
//     console.log("a user connected.");
  
//     //take userId and socketId from user
//     socket.on("addUser", (userId) => {
//       addUser(userId, socket.id);
//       io.emit("getUsers", users);
//     console.log(users)
//     });
//     //send and get message
//     socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//         console.log(senderId, receiverId, text)
//         console.log(users)
//         const user2 = users.find((user) => user.userId === senderId);
//       const user = users.find((user) => user.userId === receiverId); 
      
//       if(!user) {
//         io.to(user2.socketId).emit("getMessage", {
//             senderId,
//             text,
//           });
//       } else if(!user2) { 
//         console.log(user) 
//         io.to(user.socketId).emit("getMessage", {
//           senderId,
//           text,
//         });
//       } else {
//         console.log(user) 
//         io.to(user.socketId).emit("getMessage", {
//           senderId,
//           text,
//         });
//         io.to(user2.socketId).emit("getMessage", {
//           senderId,
//           text,
//         });
//       }
    
      
//     });
  
//     //when disconnect
//     socket.on("disconnect", () => {
//       console.log("a user disconnected!"); 
//       removeUser(socket.id);
//       io.emit("getUsers", users);
//     });
//   });

// const http = require('http');
// const express = require('express');
// const cors = require('cors');
// const io = require("socket.io")
// (process.env.SOCKET || 8100, {
//     cors: {
//       origin: "http://localhost:3000",
//     },
//   }); 

// const app = express()

// const server = http.createServer(app)


const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// const io = socketio(server);
app.use(cors());
const io = require('socket.io') (server, {
        cors: {
          origin: "*",
        },
      }); 



app.get('/', (req, res) => {
    res.send('hello sockets')
}) 
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    console.log(users)
    });
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        console.log(senderId, receiverId, text)
        console.log(users)
        const user2 = users.find((user) => user.userId === senderId);
      const user = users.find((user) => user.userId === receiverId); 
      
      if(!user) {
        io.to(user2.socketId).emit("getMessage", {
            senderId,
            text,
          });
      } else if(!user2) { 
        console.log(user) 
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      } else {
        console.log(user) 
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
        io.to(user2.socketId).emit("getMessage", {
          senderId,
          text,
        });
      }
    
      
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!"); 
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

//   server.listen(process.env.PORT || 8000, () => console.log('ok'))

  server.listen(process.env.PORT || 8100, () => console.log(`Server has started.`));