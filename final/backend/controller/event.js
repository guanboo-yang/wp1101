import { Player, Message, Room, Game } from '../models/schemas';
import userDatas from '../src/userDatas'
console.log(userDatas);
const userLogin = async ({ password, email }, connection) => {
    let user = await Player.find({email, password})
    if (!user.length){
        sendData(['loginFail', null], connection)
    }else{
        userDatas.push({name: user.name, online: true, connection: connection})
        sendData(['loginSuccess', [user]], connection)
    }
};

const createAccount = async ({ name, email, password }, connection) => {
    const user = new Player({ name, email, password });
    try {
        await user.save();
        userDatas.push({name: name, online: true, connection: connection})
        sendData(['loginSuccess', [user, []]], connection);
    } catch (err) {
        console.log(err);
        sendData(['createFail', null] , connection);
    }
};

const sendMessage = async (datas, connection) => {};

const sendData = (data, connection) => {
	connection.send(JSON.stringify(data))
}

export { userLogin, createAccount };
