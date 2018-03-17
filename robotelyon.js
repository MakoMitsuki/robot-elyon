/**************************************
  [ROBOTELYON.js]
  Main executable file
  written in NodeJS
  (c) Mika C. 2017
**************************************/

 // where your node app starts
var express = require('express');
var app = express();

const http = require('http');
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
// ==========================

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const moment = require('moment-timezone');

//======== CUSTOMIZABLE USER VARIABLES ============================/
const discordkey = process.env.MEMELORDS_DISCORD_KEY; // your discord key here
//const discordjson = "./siriyon_currency.json";
let welcome_message = "Welcome home, ${member}! Would you like dinner, or a bath, or maybe even me~? :heart:";
/* initialize json file*/
// need to be able to create a new json file for each server
//let jsonfile = JSON.parse(fs.readFileSync("./siriyon_currency.json", "utf8"));

//============= DO NOT ALTER ANYTHING BELOW =========================/

client.on("ready", () => {
  console.log("Robot Elyon initialized in server.");
});

client.on("message", (message) => {
	if (message.author.bot) return; //ignores bots

  // ====================== IN CLIENT CUSTOMIZATION ====================== //

   if (message.content.startsWith("=welcome_message"))
  {
    welcome_message = message.content.susbtring(17, message.length);
    message.channel.send({embed: {
          color: 0x808000,
          description: "*Your server welcome message is now: " . welcome_message
        }});
  }

  // ======================================================================

  if (message.content.startsWith("=heyryan"))
  {
    message.channel.send({embed: {
          color: 0x808000,
          description: "**Fuck you @Ryan !** :middle_finger:"
        }});
  }
    // ====================== HELP ===================================
  if (message.content.startsWith("=help")) {
    message.channel.send({embed: {
	    color: 0xff8080,
	    author: {
	      name: client.user.username,
	      icon_url: client.user.avatarURL
	    },
	    title: "ROBOT ELYON COMMANDS",
	    url: "http://google.com",
	    description: "List of commands for Robot Elyon. All future commands are a work in progress.",
	    fields: [{
	        name: "=help",
	        value: "See all available commands."
	      },
	      {
	        name: "=dice [*<n>* d *<t>*]",
	        value: "Roll a 6-sided die. Optionally, you can set custom dice by specifying how many and which die. e.g. *=dice 1 d 20* (note that if given improper dice command, default die will be rolled)."
	      },
        {
          name: "=coin [h/head or t/tail]",
          value: "Do a cointoss. You can also test your luck and take a guess!"
        },
        {
          name: "=8ball [yes or no question]",
          value: "Have Robot Elyon make a decision for you."
        },
	      {
	        name: "=nyanpasu",
	        value: "Get cute spunky loli to say good meowning to you."
	      },
        {
          name: "=inmytime [HH:MM] [destination continent]/[city] [local continent]/[city]",
          value: "*In progress.* Converts a time to your local timezone. E.g *10:00 America/Los_Angeles Europe/Paris*"
        },
        {
          name: "=welcome_message",
          value: "Create a new welcome message."
        },
	    ],
	    timestamp: new Date(),
	    footer: {
	      icon_url: client.user.avatarURL,
	      text: "Robot Elyon © Yoona Lee 2017"
	    }
	  }
	});
  }
  // =================== NYANPASU ===============================
  if (message.content.startsWith("=nyanpasu")) {
  	message.channel.send("", {file: "http://i.imgur.com/uQPKFn0.jpg"});
  }
  // ==================== DICE ====================================
  if (message.content.startsWith("=dice")) {
    // note: add test where numbers need to error out when improper input
  	let darr = message.content.split(/\s+/g).slice(1);
  	let dice_a = darr[0];
  	let dice_b = darr[2];

    if (dice_a.indexOf('d') > -1)
    {
      console.log("d found in dice_a. parse needs to be modified.");
      darr = dice_a.split("d");
      console.log("new dice_a: " + darr[0] + " new dice_b: " + darr[1]);
      dice_a = darr[0];
      dice_b = darr[1];
    }
  	else if (!dice_a | !dice_b)
  	{
  		dice_a = 1;
  		dice_b = 6;
  	}

	   var num = Math.floor((Math.random() * dice_b) + 1);
  	if (dice_a <= 1)
  	{
  		var num = Math.floor((Math.random() * dice_b) + 1);
  		//message.channel.send("Let's test your luck " + message.author.username + "! **You rolled " + num + "!**");
      message.channel.send({embed: {
        color: 0x808000,
        description: ":game_die: Let's test your luck " + message.author.username + "! **You rolled " + num + "!**"
      }});
    }
  	else
  	{
  		var count = 1;
  		var nums = "";
  		while (count <= dice_a)
  		{
  			var r = Math.floor((Math.random() * dice_b) + 1).toString();
  			if (count == dice_a)
  				nums = nums.concat(" and ");
  			else if (count != 1)
  				nums = nums.concat(", ");
  			nums = nums.concat(r);
  			count++;
  		}
  		//channel.send("Let's test your luck " + message.author.username + "! **Your rolls are " + nums + "!**");
      message.channel.send({embed: {
        color: 0x808000,
        description: ":game_die: Let's test your luck " + message.author.username + "! **Your rolls are " + nums + "!**"
      }});
  	}
  }
  // ================= TIMEZONE CONVERTER ========================
  if (message.content.startsWith("=inmytime"))
  {
    // input: "1:45 EDT America/Chicago"
    let darr = message.content.split(/\s+/g).slice(1);
    let isValid = true;
    let imtoutput = "";

    // validation
    for(var i = 0; i <= 2; i++)
    {
      if(!darr[i])
        isValid = false;
    }

    if (isValid)
    {
      let tzarr1 = darr[0].split(":"); // time
      let tzarr2 = darr[1];
      let tzarr3 = darr[2];
      //var gtz = moment.tz.guess();
      //var gtz = moment.tz(tzarr4).zoneName();

      //get timezones then offset
      var dest = moment.tz.zone(tzarr3);
      var loctz = moment.tz.zone(tzarr2);

      var timestamp = Math.floor(Date.now());
      console.log(timestamp + "|" + loctz.offset(timestamp) + "|" + dest.offset(timestamp))
      var tz_diff = (loctz.offset(timestamp) - dest.offset(timestamp)) / 60;
      
      //get hour of time
      let dest_hour = parseInt(tzarr1[0]);
      let dest_min = tzarr1[1].split(/[ ,]+/);

      // overflow handling for 12-hr clock
      var lt = dest_hour + tz_diff;
      if (lt == 0 || lt == -12)
        lt = 12;
      else if(lt < 0 && lt > -12)
        lt += 12;
      else if(lt > 0 && lt > 12)
        lt -= 12;

      var output = ":clock: The time will be **" + lt + ":" + dest_min + " " + dest.abbr(timestamp) + "**"
    }
    else
      var output = ":clock: **We can't get that timezone!** Follow format *HH:MM America/Los_Angeles Europe/Paris*";

    message.channel.send({embed: {
        color: 0x8080c0,
        description: output
      }});
  }
  // ================= COIN TOSS ================================
  if (message.content.startsWith("=coin")) {
    const garr = message.content.split(/\s+/g).slice();
    let coinface = Math.floor((Math.random() * 2) + 1);
    let coinguess = garr[1];
    let coinguess_int = 0;
    let coindesc = "";

    switch(coinguess)
    {
      case "h":
      case "H":
      case "head":
        coinguess_int = 1;
        break;
      case "t":
      case "T":
      case "tail":
        coinguess_int = 2;
        break;
      case "":
      case null:
      case undefined:
        break; // do nothing
      default:
        coinguess_int = -1;
        coinface = 3;
    }

    switch(coinface)
    {
      case 1:
        coindesc = ":speaking_head: **You got a head!**"
        break;
      case 2:
        coindesc = ":cocktail: **You got a tail!**"
        break;
      case 3:
        coindesc = ":frowning: That's not a coin face, silly."
        break;
    }

    if (coinguess_int == coinface)
      coindesc += " Super lucky!";
    else if (coinguess_int != coinface && coinguess_int > 0)
      coindesc += " Super unlucky.";

    message.channel.send({embed: {
          color: 0x808000,
          description: coindesc
        }});
  }
  // ================= 8-BALL ================================
  if (message.content.startsWith("=8ball")) {
    var rn = Math.floor((Math.random() * 20) + 1);
    let rr = "";
    // generate a json file for this instead! this is annoying to look at ( ;-;)
    switch (rn)
    {
      case 1:
        rr = "Hecking yeah!";
        break;
      case 2:
         rr = "Yeah buddy!";
        break;
      case 3:
         rr = "I don't get it! Ask again please.";
        break;
      case 4:
         rr = "No doubt about it, nope!";
        break;
      case 5:
         rr = "I can definitely tell you it's a no!";
        break;
      case 6:
         rr = "Eh, you can bet on it I guess.";
        break;
      case 7:
         rr = "Concentrate and ask again maybe!";
        break;
      case 8:
         rr = "Uh-oh! Outlook not so good!";
        break;
      case 9:
         rr = "I decided that it's a yes!";
        break;
      case 10:
         rr = "Better not tell you now!";
        break;
      case 11:
         rr = "Yes, most definitely!";
        break;
      case 12:
         rr = "Very doubtful.";
        break;
      case 13:
         rr = "Nope! Just nope!";
        break;
      case 14:
         rr = "Cannot predict now."
        break;
      case 15:
         rr = "It's looking good!";
        break;
      case 16:
         rr = "I'm gonna say no.";
        break;
      case 17:
         rr = "Sure I guess!";
        break;
      case 18:
         rr = "Are you kidding me?";
        break;
      case 19:
         rr = "Don't bet on it.";
        break;
      case 20:
         rr = "Forget about it!";
        break;
    }
    message.channel.send({embed: {
        color: 0x8080c0,
        description: ":8ball: **" + rr + "**"
      }});
  }
});

// ===================== WELCOME ========================================

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // If you want to send the message to a designated channel on a server instead
  // you can do the following:
  const channel = member.guild.channels.find('name', 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
 channel.send(welcome_message);
});

client.login(discordkey);