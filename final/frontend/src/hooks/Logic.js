import client from '../connection/connect';

const Logic = () => {
    client.onmessage = async (byteString) => {
        const { data } = byteString;
        console.log(JSON.parse(data));
        // console.log(task);
    };

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    return {
        sendData
    };
};

export default Logic;
