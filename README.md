## Rocket.Chat Message Scheduler

docker-compose.yml

```version: "1.0"
services:
  bot:
    build: .
    volumes:
      - "/etc/timezone:/etc/timezone:ro"
      - "/etc/localtime:/etc/localtime:ro"
```

Added ``/etc/timezone`` & ``/etc/localtime`` to have the container use the timezone of the host.

``docker-compose up -d``

config.js

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
