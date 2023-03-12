import React, { useState } from 'react';

const Chat = ({ activeChat, setActiveChat }) => {
	const chats = [
		{
			_id: '0',
			users: [
				{
					username: 'PineappleWoe'
				},
				{
					username: 'Rhynestone'
				}
			],
			messages: [
				{
					id: '12341',
					body: 'Hey!',
					sender: 'PineappleWoe'
				},
				{
					id: '12342',
					body: 'Hi, how\'s it going?',
					sender: 'Rhynestone'
				}
			]
		},
		{
			_id: '1',
			users: [
				{
					username: 'PizzaCrazy'
				},
				{
					username: 'DrJazzHands'
				}
			],
			messages: [
				{
					id: '23451',
					body: 'You in the meeting tomorrow!?',
					sender: 'PizzaCrazy'
				},
				{
					id: '23452',
					body: 'Yes.',
					sender: 'DrJazzHands'
				},
				{
					id: '23453',
					body: 'Cool, see you there.',
					sender: 'PizzaCrazy'
				}
			]
		}
	];

	return (
		chats.map(chat => (
			<div key={chat._id} onClick={() => setActiveChat({ ...activeChat, _id: chat._id })}>
				<h2>
					Chat with {chat.users[0].username}
				</h2>
				<ul>
					{chat.messages.map(message => (
						<li key={message.id}>{message.body} - {message.sender}</li>
					))}
				</ul>
			</div>
		))
	);
};

function App() {
	const [activeChat, setActiveChat] = useState({
		_id: null
	});

	const chatProps = { activeChat, setActiveChat };

	return (
		<div className="App">
			<Chat { ...chatProps } />
			{activeChat?._id && <p>Active Chat: { activeChat._id } </p>}
		</div>
	);
}

export default App;
