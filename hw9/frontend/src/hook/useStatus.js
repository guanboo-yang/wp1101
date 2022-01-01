import { createContext, useContext, useState } from 'react';
import { message } from 'antd';

const StatusContext = createContext({
    userName: '',
    login: false,
    friends: [],
    chatID: [],
    currentID: [],
    currentFriend: '',
    messages: [],
    setUserName: () => {},
    setLogin: () => {},
    showStatus: () => {},
    setFriends: () => {},
    setChatID: () => {},
    setCurrentID: () => {},
    setCurrentFriend: () => {},
    setMessages: () => {}
});

const StatusProvider = (props) => {
    const [userName, setUserName] = useState('');
    const [login, setLogin] = useState(false);
    const [friends, setFriends] = useState([]);
    const [chatID, setChatID] = useState([]);
    const [currentID, setCurrentID] = useState('');
    const [currentFriend, setCurrentFriend] = useState('');
    const [messages, setMessages] = useState([]);

    const showStatus = (payLoad) => {
        if (payLoad.msg) {
            const { type, msg } = payLoad;
            const content = { content: msg, duration: 1 };
            switch (type) {
                case 'success':
                    message.success(content);
                    break;
                case 'error':
                    message.error(content);
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <StatusContext.Provider
            value={{
                userName,
                login,
                friends,
                chatID,
                currentID,
                currentFriend,
                messages,
                setFriends,
                setUserName,
                setLogin,
                showStatus,
                setChatID,
                setCurrentID,
                setCurrentFriend,
                setMessages
            }}
            {...props}
        />
    );
};

function useStatus() {
    return useContext(StatusContext);
}

export { StatusProvider, useStatus };
