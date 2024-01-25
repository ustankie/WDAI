const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'users.json');

function getUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data).users;
  } catch (error) {
    console.error('Error reading users file:', error.message);
    return [];
  }
}

function findUserByUsername(username) {
  const users = getUsers();
  return users.find(user => user.username === username);
}

function validateUserCredentials(username, password) {
  const user = findUserByUsername(username);

  if (user && user.password === password) {
    // Return user information excluding the password
    const { password, ...userInfo } = user;
    return userInfo;
  }

  return null;
}

module.exports = {
  getUsers,
  findUserByUsername,
  validateUserCredentials,
};

export default validateUserCredentials;