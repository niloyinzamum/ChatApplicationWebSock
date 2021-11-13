//momentjs for getting and formattign current time
const moment = require('moment');

//taking the username and text from input and return username, text and time
function formatMessage(username, text)
{
    return{
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;