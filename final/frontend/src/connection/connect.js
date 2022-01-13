import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const client = new WebSocket("ws://localhost:5000", 'echo-protocol');

const useConnection = () => {
  const { login, setFriends, profile } = useUser();
  const navigate = useNavigate();

  client.onmessage = async (byteString) => {
    const { data } = byteString;
    const [task, payLoad] = JSON.parse(data);

    switch (task) {
      // Return [userData, friendsData]
      case "loginSuccess":
        login({ ...payLoad });
        navigate("/");
        break;

      case "createFail":
        console.log("The Username or the Email has been taken");
        break;

      case "loginFail":
        console.log("Wrong Email or Password");
        break;

      case "friendLists":
        let friends = payLoad.sort((x, y) => {
            return (x === y)? 0 : x? -1 : 1;
        })
        friends = friends.filter((user) => {
            if (user.name !== profile.name)
                return user
        })
        setFriends(friends)
        break;
    }
  };
  // Login Part
  const createAccount = (userDatas) => {
    sendData(["create", userDatas]);
  };

  const loginAccount = (userDatas) => {
    sendData(["login", userDatas]);
  };

  const loginWithGoogle = (userDatas) => {
      sendData(["googleLogin", {name: userDatas.givenName, email: userDatas.email, image: userDatas.imageUrl}])
  }
  // Require friends part
  const requireFriend = () => {
    sendData(["requireFriends", null])
  }
  // Rooms
  const createRoom = () => {
    sendData(["createRoom", profile.name])
  }
  const sendData = (data) => {
    client.send(JSON.stringify(data));
  };

  return {
    createAccount,
    loginAccount,
    requireFriend,
    loginWithGoogle
  };
};

export { useConnection };
