## Rocket.Chat Message Scheduler

``docker build . -t <username>/rocket-chat-scheduler``

``docker run -d <username>/rocket-chat-scheduler``

```js	
"scheduleName": {
	"channel": "#GENERAL", //#channel, @user
		"messages": ["Nachricht1","Nachricht2"], // Nachricht wird zufällig ausgewählt
		"every": { 
			"value":  { // Bei min nur Zahl
				"day": 5, // Montag: 1, Dienstag: 2, Mittwoch: 3, Donnerstag: 4, Freitag: 5, Samstag: 6, Sonntag: 0, Täglich: daily
				"at": "08:38" // HH:mm	
			},
			"type": "day" // day, minute
		}
	}

```