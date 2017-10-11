import * as firebase from 'firebase';
import _ from 'lodash';
import moment from 'moment';

const loggerRef = firebase.database().ref('/logs/');

/**
 *
 * @param {String} username - the current users email address
 * @param {String} action - the general action they have taken
 * @param {String} notes - special notes about the action
 */
export function createLog(username, action, notes){
  var logObj = {};
  logObj.username = username;
  logObj.action = defineAction(action);
  logObj.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
  logObj.notes = notes;

  var newLogKey = firebase.database().ref().child('/logs/').push().key;
  logObj.id = newLogKey;
    firebase.database().ref('/logs/' + newLogKey).set({
      id: logObj.id,
      username: username,
      action: logObj.action,
      timestamp: logObj.timestamp,
      notes: logObj.notes
    });

}

function defineAction(action) {
  var actionType;
  console.log('action passed to action dictionary:', action);
  switch (action) {

    case 'revise':
    return 'Record Revision';

    case 'add':
    return 'Record Added';

    case 'delete':
    return 'Record Deleted';

    case 'update':
    return 'Profile Updated';

    case 'login':
    return 'User Login';

    case 'logout':
    return 'User Logout';

    default:
    return 'Not enough Info';
  }
}