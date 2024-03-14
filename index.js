const express = require('express');
const session = require("express-session")
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
require('dotenv').config()
app.use(express.json());
const server = http.createServer(app);
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: 'auto'
  }
}))
const io = socketIo(server, {
  cors: {
    origin: ['https://kata-app.netlify.app', 
             'http://kata-app.netlify.app', 
             'http://localhost:3000', ],
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

io.on('connection', (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on('send-message', ({ messageId, recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        messageId,
        sender: id,
        text,
      });

      socket.emit('message-sent', messageId);
    });
  });
});

app.get('/', (req, res) => {
  res.send('Hello World')
})

const PORT = process.env.PORT || 5000;

const usersController = require("./users/users.controller")
const contactController = require("./contact/contact.controller")
const authController = require("./auth/auth.controller")

app.use("/users", usersController)
app.use("/contact", contactController)
app.use(authController)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
