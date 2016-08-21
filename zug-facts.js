/***********************************************************
************************************************************
*****************Zug Facts Module***************************
************************************************************
***********************************************************/

var fs = require('fs');

var filepath = "/home/dream/RPGX-Bot/zugfacts.txt";

exports.addZugFacts = (isStaff, name, fact)=> {
	if(isStaff || name === "Grozug gro-Zug" || name === "DreaM"){
		try{	
			var output = "\r\n";
			output += fact.trim();
			fs.appendFile(filepath, output, function(err){
			//bot.sendMessage(message, messages);
			});
			return "Zug fact approved.";
		}catch(e){
			return e + " Please contact DreaM.";
		}
	}else{
		return "You don't have permission to do that.";
	}
}

exports.getZugFact = () => {
	try{
		var contents = fs.readFileSync(filepath, 'utf8');
		var facts = contents.split('\n');
	
		var numZugFacts = facts.length;
	
		var ran = Math.floor(Math.random() * numZugFacts);
		return facts[ran];
	}catch(e){
		return e + " Please contact DreaM.";
	}
}
