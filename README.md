## Rocket.Chat Message Scheduler

``docker build . -t <username>/rocket-chat-scheduler``

``docker run -d <username>/rocket-chat-scheduler``

```json	
"scheduleName": {
	"channel": "#GENERAL", //#channel, @user
		"messages": ["Nachricht1","Nachricht2"],
		"every": { 
			"value":  {
				"day": 5, // Montag: 1, Dienstag: 2, Mittwoch: 3, Donnerstag: 4, Freitag: 5, Samstag: 6, Sonntag: 0, Täglich: daily
				"at": "8:38" // HH:mm / H:mm	
			},
			"type": "day" // day, minute,
		}
	}

```