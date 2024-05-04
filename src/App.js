import io from 'socket.io-client'
import './App.css';
import {useState} from 'react';
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

function App() {

const [user, setUser] = useState("");
const [room,setRoom] = useState("");
const [showchat, setShowchat] = useState(false);

const joinRoom = () =>{
  if(user !== "" && room !== ""){
    socket.emit("join_room",room);
    setShowchat(true);
  }
}
  return (
    
    <div className="App">
     {!showchat ? ( 
      <div className="joinChatContainer">
         <h3>Join A Chat</h3>
     <input type="text" placeholder="john..." onChange={(event) => {setUser(event.target.value)}}/>
     <input type="text" placeholder="Room ID..." onChange={(event) => {setRoom(event.target.value)}} />
     <button onClick={joinRoom}>Join the Room</button>
     </div>
     ) : ( 
    <Chat socket={socket} user={user} room={room} />
   )}
    </div>
    
  );
}

export default App;
