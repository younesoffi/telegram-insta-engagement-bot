const BotProxy = require('./bot-proxy');
const EngagementManager = require('./engagementManager');
const { managerModes } = require('./constants');

const token = '847795314:AAFVC2lTOPJ9Xbjew1xrXwQw7pB-X3Yn91A';
const groupChatId = 'IwAR3LZcatP3dLncEuP3Xuxp8Z50eJKjYs6qEWoHkeJPbS17PcasI5vYXZDqQ';
const groupChatId = 'IwAR3LZcatP3dLncEuP3Xuxp8Z50eJKjYs6qEWoHkeJPbS17PcasI5vYXZDqQ';

const botProxy = new BotProxy(token, groupChatId, true);

const engagementManager = new EngagementManager(
    (text) => botProxy.sendMessageToGroup(text), //send to group
    (text) => botProxy.sendMessageToGroup(text, true), //send to group as HTML
    true //debug mode
);

botProxy.subscribeOnEvent('message', (msg) => {
    if (engagementManager.currentMode === managerModes.COLLECTING && msg.text.startsWith('@')) {
        let text = msg.text.split(' ')[0];
        engagementManager.addCandidate(text);
    }
})

botProxy.onText(/\/chatId/, (msg) => {
    const chatId = msg.chat.id;
    botProxy.sendMessage(chatId, 'chatId: ' + chatId);
})

engagementManager.start();
