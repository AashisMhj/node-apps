const users = [];
const rooms = new Set();
rooms.add('Home Room');
// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  rooms.add(room);
  users.push(user);
  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    let user = getCurrentUser(id);
    users.splice(index, 1)[0];
    let no = getRoomUsers(user.room);
    if(no.length == 0){
      rooms.delete(user.room);
    }
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

// get no of users
function getNoUsers(){
  return users.length;
}
// get all rooms
function getRooms(){
  return [...rooms];
}

function addRoom(room_name){
  rooms.add(room_name);
}
module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getRooms,
  addRoom
};
