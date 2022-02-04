const fs = require("fs");
const configData = fs.readFileSync("./config.dev.json", "utf8");
const config = JSON.parse(configData);


let minutes = 0;
let token = null;
let userId = null;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
async function login() {
	return new Promise(async (resolve, _) => {
	let res = await http("POST",  "login", `user=${config.username}&password=${config.password}`);
	if(res.status == "success"){
		token = res.data.authToken
		userId = res.data.userId
		return resolve(true);
	}
	}).catch((err) => {
		return JSON.stringify({ error: err });
	});
}

login();
async function main() {
  Object.entries(config.schedules).forEach(([key, schedule]) => {
    if (
      schedule.every.type.toLowerCase() == "min" ||
      schedule.every.type.toLowerCase() == "minute"
    ) {
      if (minutes > 0 && minutes % schedule.every.value == 0) {
        let msg = Math.floor(Math.random() * schedule.messages.length);
        handleMessage(schedule.channel, schedule.messages[msg]);
      }
    } else if (schedule.every.type.toLowerCase() == "day") {
      let date = new Date();
      if (date.getDay() == schedule.every.value.day) {
        let dateTime =  (date.getHours().toString().length == 1 ? "0" : "") + date.getHours() + ":" + (date.getMinutes().toString().length == 1 ? "0" : "") + date.getMinutes();
        if (dateTime == schedule.every.value.at) {
          let msg = Math.floor(Math.random() * schedule.messages.length);
          handleMessage(schedule.channel,schedule.messages[msg]);
        }
      } else if (schedule.every.value.day == "daily") {
        let dateTime =  (date.getHours().toString().length == 1 ? "0" : "") + date.getHours() + ":" + (date.getMinutes().toString().length == 1 ? "0" : "") + date.getMinutes();
        if (dateTime == schedule.every.value.at) {
          let msg = Math.floor(Math.random() * schedule.messages.length);
          handleMessage(schedule.channel, schedule.messages[msg]);
        }
      }
    }
  });

  minutes++;
}

async function handleMessage(channel,msg) {
	
  let res = await http("POST", "chat.postMessage", `{ "channel": "${channel}", "text": "${msg}" }`);
  if(res.success){
	console.log(res.message.msg)
  }
}

async function http(method,endpoint, reqData) {
  return new Promise(async (resolve, _) => {
    var url = config.url + "/api/v1/" + endpoint;

    var xhr = new XMLHttpRequest();
    xhr.open(method, url);

    endpoint == "login" ? xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded") : xhr.setRequestHeader("Content-Type", "application/json");
	token != "" && token != null ? xhr.setRequestHeader("X-Auth-Token", token) : "";
	userId != "" && userId != null ? xhr.setRequestHeader("X-User-Id", userId) : "";

    xhr.onreadystatechange = async function () {
      if (xhr.readyState === 4) {
		if(xhr.status == 401){
			let loggedin = await login();
			if(loggedin){
				http(method,endpoint,reqData);
			}
		}
		return resolve(JSON.parse(xhr.responseText));
      }
    };

    var data = reqData;
    xhr.send(data);

  }).catch((err) => {
    return JSON.stringify({ error: err });
  });
}

main();
setInterval(function () { main();}, 60000);
console.log("Scheduler Started");
