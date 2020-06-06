import express from 'express';

const routes = express.Router();

const users =  [
    'Arthur',//0
    'Letícia',//1
    'Marcia'//2
];
//Rota

function getUserList(request, response) {
    console.log('list users');
    const search = String(request.query.search);
    console.log('search:'+search);

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    response.json(filteredUsers);
}
function gerUser(request, response) {
console.log('get user');
response.send(users[Number(request.params.id)]);
}
function setUser(request, response) {
const data = request.body;
const user = {
    name: data.name,
    email: data.email
};
console.log("set user: "+data);
return response.json(user);
}

function home(request, response){
console.log('home');
response.send('hello word');
}

routes.get(['/', ''], home);
routes.get('/users', getUserList);
routes.get('/users/:id', gerUser);
routes.post('/users', setUser);

export default routes;