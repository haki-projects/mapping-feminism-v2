const EMAIL_NOT_VALID = 'auth/invalid-email';
const USER_DISABLED = 'auth/user-disabled';
const USER_DOES_NOT_EXIST = 'auth/user-not-found';
const WRONG_PASSWORD = 'auth/wrong-password';

const ACCOUNT_ALREADY_EXISTS = 'auth/email-already-in-use';
const INVALID_EMAIL = 'auth/invalid-email';
const EMAIL_AUTH_DISABLED = 'auth/operation-not-allowed';
const WEAK_PASSWORD = 'auth/weak-password';


export function getRegisterationError(error) {
  switch (error.code) {
    case ACCOUNT_ALREADY_EXISTS:
    return 'This email account already exists. Did you forget your password? Please contact the system administrator';

    case INVALID_EMAIL:
    return 'Please enter a valid email address ( make sure you include the @domain.com symbol! ) ';

    case EMAIL_AUTH_DISABLED:
    return 'Email authentication has been disabled. Please speak with your system administrator';

    case WEAK_PASSWORD:
    return 'The password entered was too weak. Please try a stronger password';

    default:
    return 'We could not create your account: ' + error.message;

  }
}

export function createTableRows(data){
const tableRows = {} ;

  return tableRows;
}

export function getLoginError(error) {
  switch (error.code) {
    case EMAIL_NOT_VALID:
    return 'The email Address is invalid. Please verify you typed a valid email address';

    case USER_DISABLED:
    return 'The user account is disabled. Please see your site administrator for more details';

    case USER_DOES_NOT_EXIST:
    return 'We have no record of this email account. Double-check the email address or Register as a new user';

    case WRONG_PASSWORD:
    return 'Wrong password. Please double-check the password you entered';

    default:
    return 'An error occured while logging you in: ' + error.message;
  };

}

