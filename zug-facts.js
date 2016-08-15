/***********************************************************
************************************************************
*****************Zug Facts Module***************************
************************************************************
***********************************************************/

var fs = require('fs');

var filepath = "C:\\Users\\zjdre_000\\Documents\\RPGX Discord Bot\\zugfacts.txt";

exports.addZugFacts = (isStaff, name, fact)=> {
	if(isStaff || name === "Grozug gro-Zug" || name === "DreaM"){
		
		var output = "\n";
		output += fact.trim();
		fs.appendFile(filepath, output, function(err){
			//bot.sendMessage(message, messages);
		});
		return "Zug fact approved.";
	}else{
		return "You don't have permission to do that.";
	}
}

exports.getZugFact = () => {
	var messages = "Something broke because DreaM is a moron.";
	var filepath = "C:\\Users\\zjdre_000\\Documents\\RPGX Discord Bot\\zugfacts.txt";
	var contents = fs.readFileSync(filepath, 'utf8');
	var facts = contents.split('\n');
	var numZugFacts = 0;
	facts.forEach(function(line){
		numZugFacts += 1;
	});
	var ran = Math.floor(Math.random() * (numZugFacts-1) + 1);
	return facts[ran];
	
}