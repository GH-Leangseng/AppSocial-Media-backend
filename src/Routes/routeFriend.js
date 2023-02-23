const express = require('express');
const friendRoute = express.Router();
const FriendController = require('../Controller/FriendController');

friendRoute.post('/add-un-friend',FriendController.addUnFriend);
friendRoute.get('/get-friend-not-friend/:id',FriendController.getAllFriendAndNotFriend);
module.exports = friendRoute;