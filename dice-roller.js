/***********************************************************
************************************************************
*****************Dice Roller Module*************************
************************************************************
***********************************************************/

exports.roll = (args) => {
	
	var num = parseInt(args.substring(0,args.indexOf("d")));
	if(!(num > 0)){
		num = 1;
	}if (num > 1000){
		return "nothing, because you're just trying to break it. Ziether and GoPlayer7 ruined that for everyone.";
	}
	var rawVal = args.substring(0,args.indexOf("d"));
	var plus = 0;
	
	if(args.indexOf("+") > -1){
		
		var high = args.substring(args.indexOf("d")+1);
		high = parseInt(high.substring(0,high.indexOf("+")));
		plus = parseInt(args.substring(args.indexOf("+")));
		
	}else{
		
		var high = parseInt(args.substring(args.indexOf("d")+1));
		
	}
	
	low = 1;
	var result = 0;
	
	for(i = 0; i < num; i++){
		
		result += Math.floor(Math.random() * (high - low) + low);
		
	}
	result += plus;
	
	return result;
}

exports.choose = (args) => {
	
	var choices = args.split(",");
	
	if(choices.length > 0){
		var ran = Math.floor(Math.random() * choices.length);
	
		return choices[ran];
	}else{
		return "nothing, because you gave me nothing.";
	}
}