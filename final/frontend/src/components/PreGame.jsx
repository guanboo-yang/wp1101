import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import '../css/PreGame.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const players = ['Tristan', 'Eric', null, null];
const friends = [
    { name: 'Mary', online: true },
    { name: 'Henry', online: true },
    { name: 'Mike', online: true },
    { name: 'Sandy', online: false },
    { name: 'Rachel', online: false }
];

const PreGame = () => {
    return (
        <div align="center" className="PreGame" style={{ padding: '10px' }}>
            <h1>invite your friend</h1>
            <Box
                sx={{
                    width: 750,
                    height: 450,
                    backgroundColor: 'primary.dark'
                }}
            >
                <div
                    className="container"
                    style={{ width: '100%', height: '100%' }}
                >
                    <div
                        className="players"
                        style={{
                            width: '610px',
                            height: '100%',
                            transform: 'translateY(-50px)'
                        }}
                    >
                        {players.map((name, i) => {
                            return <Player name={name} num={i} key={name} />;
                        })}
                        <div
                            className="buttons"
                            style={{
                                position: 'absolute',
                                width: '610px',
                                justifyContent: 'space-around',
                                transform: 'translateY(130px)'
                            }}
                        >
                            <Button
                                variant="outlined"
                                style={{
                                    marginRight: '15px',
                                    color: 'inherit',
                                    borderWidth: '3px'
                                }}
                            >
                                Leave
                            </Button>
                            <Button
                                variant="contained"
                                style={{ marginLeft: '15px' }}
                            >
                                Start
                            </Button>
                        </div>
                    </div>
                    <div
                        className="friends"
                        style={{
                            width: '140px',
                            borderLeft: '1px solid white',
                            padding: '5px'
                        }}
                    >
                        <h2>friends</h2>
                        {friends.map((friend) => {
                            return (
                                <Friend
                                    key={friend}
                                    name={friend.name}
                                    online={friend.online}
                                ></Friend>
                            );
                        })}
                    </div>
                </div>
            </Box>
        </div>
    );
};

export default PreGame;

const Player = ({ name, num }) => {
    return (
        <div className={`player player${num}`}>
            {name ? (
                <img src={`//joeschmoe.io/api/v1/${name}`} alt="" />
            ) : (
                <QuestionMarkIcon
                    style={{ height: '100%', fontSize: '40px', color: 'black' }}
                />
            )}
            <div className="name">{name}</div>
        </div>
    );
};

const Friend = ({ name, online }) => {
    return (
        <Paper
            elevation={3}
            style={{
                display: 'flex',
                marginBottom: '5px',
                alignItems: 'center',
                position: 'relative'
            }}
        >
            <div className="image" style={{ width: '30px', height: '30px' }}>
                <img src={`//joeschmoe.io/api/v1/${name}`} />
            </div>
            <div className="name" style={{ lineHeight: '30px' }}>
                {name}
            </div>
                <AddIcon 
                style={{
                    lineHeight: '30px',
                    fontSize: '15px',
                    position: 'absolute',
                    right: '5px',
                    cursor: 'pointer',
                    color: 'inherit'
                }}/>
        </Paper>
    );
};
