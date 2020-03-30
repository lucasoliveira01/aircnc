const express = require('express');
const routes = require('./routes');
const cors = require ('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const mongoose = require('mongoose');

const app = express();
const server = http.Server(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log('Usuario conectado', socket.id);
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-kbuv2.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// rqq.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edicao, delete)
// req.body = Acessar corpo da requisicao (para criação, edição)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);