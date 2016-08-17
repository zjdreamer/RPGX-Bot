/***********************************************************
************************************************************
******************Main Bot Listener*************************
************************************************************
***********************************************************/



var Discord = require("discord.js");
var fs = require('fs');
const googleImages = require('google-images');
const zf = require('./zug-facts');
const dr = require('./dice-roller');
'use strict'

var bot = new Discord.Client();
let client = googleImages('005434864978808280474:acekhmfof1i', 'AIzaSyA93IcNZ0tNbL5GML2JoFmz105izKQNf74');

//var roleList = ["Pretty in Pink", "RPGX Member", "Community Supporter"];

var roleList = ["Staff", "Chat Mod", "Master Chef"];

bot.on("message", function(message) {
	
		var input = message.content.toLowerCase();
	
		if(input === "hi rpgxbot"){
			
			bot.reply(message, "Nobody loves DreaM.");
			
		}else if(input === "!kedkilljoy"){
			
			bot.sendFile(message, "http://s1.thingpic.com/images/nb/PUSCYKU1mfpJYiZG6B9WDF1R.jpeg");
			
		}else if (input.indexOf("!roll ") === 0){
			
			var args = input.substring(5);
			args = args.trim();
			
			var result = dr.roll(args);
			
			var response = "You asked me to roll " + args + " and I got " + result;
			
			bot.reply(message, response);
		}else if (input.indexOf("!choose ") === 0){
			
			var args = input.substring(7);
			args = args.trim();
			
			var result = dr.choose(args);
			
			var response = "You asked me to choose between " + args + " and I choose " + result.trim();
			
			bot.reply(message, response);
		}else if (input.indexOf("!imgme ") === 0){
			
			//bot.reply(message, "Pre-search");
			
			client.search(input.substr(5), {
					page: 1,
					safe: 'medium',
					gl: 'US',
					googlehost: 'google.com',
					fileType: 'jpg',
					num: 20
				}
				).then(function (images){
				var ran = Math.floor(Math.random() * 20);
				var url = images[ran]['url'];
				url = url.substring(0, url.indexOf(".jpg")+4);
				bot.sendFile(message, url);
			});
			
		}else if (input === "!cocktail"){
			
			bot.sendFile(message, "https://media.giphy.com/media/HV9kRik6zvzwY/giphy.gif");
			
		}else if (input === "!martini"){
			
			bot.sendFile(message, "https://66.media.tumblr.com/2d5f8f3d8d9bbd21139bb0661c1127f5/tumblr_inline_o5zoz6Qzxu1tlzqyy_500.gif");
			
		}else if (input === "!picard"){
			
			bot.sendFile(message, "http://media1.giphy.com/media/6OWIl75ibpuFO/giphy.gif");
			
		}else if (input === "!zug"){
			
			bot.sendFile(message, "http://i1.kym-cdn.com/photos/images/newsfeed/000/385/009/23e.gif");
			
		}else if (input === "!zugfacts"){
			
			messages = zf.getZugFact();
			bot.reply(message, messages);
			
		}else if (input === "!smokebomb"){
			
			bot.sendFile(message, "http://www.reactiongifs.us/wp-content/uploads/2015/07/smoke_bomb_archer.gif");

		}else if (input.indexOf("!addzugfacts ") === 0){
			
			var output = zf.addZugFacts(bot.memberHasRole(message.author, message.server.roles.get("name", "Staff")), message.author.name, message.content.substring(12));
			bot.sendMessage(message, output);
			
		}else if (input.indexOf("!roleme ") === 0){
			
			role = message.content.substring(7).trim();
			
			
			//bot.sendMessage(message, role);
			if(!(roleList.indexOf(role) > -1)){
				
				

				try{	
					bot.addUserToRole(message.author, message.server.roles.get("name", role), function(err){
						
						if(err){
							
							bot.reply(message, err);
							
						}else{
							
							bot.reply(message, "Role added!");
							
						}
					});
				}catch(e){
					
					bot.reply(message, "I cannot do that here, please ask me in a public channel, in the server you wish me to add the role.");
				}
	
			}
		}else if (input.indexOf("!unroleme ") === 0){
			
			role = message.content.substring(9).trim();
			
			//bot.reply(message, "Attempting to unrole you.");
			
			if(!(roleList.indexOf(role) > -1)){

				try{

					bot.removeUserFromRole(message.author, message.server.roles.get("name", role), function(err){
						if(err){
						
							bot.reply(message, err);
						
						}else{
							
							bot.reply(message, "Role removed!");
							
						}
					});
				}catch(e){
					
					bot.reply(message, "I cannot do that here, please ask me in a public channel, in the server you wish me to add the role.");
					
				}
			}		
		}else if (input === "!help"){
			var commands = "```!kedkilljoy\n!roll - Usage '!roll xdy+z'\n!cocktail\n!martini\n!picard - Use in case of Zug\n!zug\n!choose <choice 1>, <choice 2>, ..., <choice N>\n!zugfacts - $100% true facts about Grozug gro-Zug\n!addzugfacts <fact> - May only be used by staff, my owner, and Gro-Zug himself.\n!roleme <role name> - Gives yourself the specified non-mod role\n!unroleme <role name> removes the specified non-mod role from you\n!imgme <search criteria> - BETA FEATURE: Preforms a google image search and returns a random result.\n!bugfinders - People who helped improve the bot by breaking it```";
			bot.sendMessage(message, commands);
		}else if (input === "!bugfinders"){
			var bugfinders = "```Goplayer7 and Ziether - Broke the dice roller.";
			bugfinders += "\nAethera - Discovered an edgecase in the dice roller.";
			bugfinders += "\nGrozug gro-Zug - Broke everything";
			bugfinders += "```";
			bot.sendMessage(message, commands);
		}
});

bot.loginWithToken("MjE0MTk1NTEzNjYxMDYzMTc4.CpFcog.efWBCbD0PuwQ9Y1bIQCBCzUneUg");


/*

TODO:

Implement role assigmnent


var messages = "Something broke because DreaM is a moron.";
			var filepath = "C:\\Users\\zjdre_000\\Documents\\RPGX Discord Bot\\zugfacts.txt";
			if(bot.memberHasRole(message.author, message.server.roles.get("name", "Staff")) || message.author.name === "Grozug gro-Zug" || message.author.name === "DreaM"){
				bot.reply(message, "Zug fact approved.");
				var output = message.content.substring(12).trim();
				output += "\n";
				fs.appendFile(filepath, output, function(err){
					//bot.sendMessage(message, messages);
				});


*/