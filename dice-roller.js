/***********************************************************
************************************************************
*****************Dice Roller Module*************************
************************************************************
***********************************************************/

exports.roll = (args) => {
	
	var num = parseInt(args.substring(0,args.indexOf("d")));
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