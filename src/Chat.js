import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({socket, user,room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async() => {
       const  messageData = {
        room: room,
        author:user,
        message: currentMessage,
        time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
       }
       await socket.emit("send_message",messageData);
       setMessageList((list) => [...list,messageData]);
       setCurrentMessage("");
    }

    useEffect(() => {
        socket.on("receive_message",(data) => {
            setMessageList((list) => [...list,data]);
        })
    },[socket])
  return (
    <div className='chat-window'>
        <div className="chat-header"></div>
        <p>Live Chat</p>
        <div className="chat-body">
            <ScrollToBottom className='message-container'>
            {messageList.map((messageContent) => {
                return <div className='message' id={user === messageContent.author ? "you" : "other"}>
                    <div className='message-content'>
                        <p>{messageContent.message}</p>
                    </div>
                    <div className='message-meta'>
                        <p id='time'>{messageContent.time}</p>
                        <p id='author'>{messageContent.author}</p>
                    </div>
                </div>
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text" value={currentMessage} placeholder='hey...' onChange={(event) => setCurrentMessage(event.target.value)} 
            onKeyPress={(event) => (event.key === "Enter" && sendMessage())}
            />
            <button onClick={sendMessage}>=+</button>
        </div>
    </div>
  )
}

export default Chat;
