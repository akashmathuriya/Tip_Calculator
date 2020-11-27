const bill = document.getElementById("bill");
const tip = document.getElementById("tip");
const numberOfPeople = document.getElementById("numberOfPeople");
const incTip = document.getElementById("incTip");
const decTip = document.getElementById("decTip");
const incPeople = document.getElementById("incPeople");
const decPeople = document.getElementById("decPeople");
const tipPerPerson = document.getElementById("tipPerPerson");
const totalPerPerson = document.getElementById("totalPerPerson");
const calculate = document.getElementById("calculate");
const remarks = document.querySelector(".remarks > p");


// Class to store the input attributes
class TipClass {
	constructor(bill, tip, numberOfPeople){
		this.bill = bill;
		this.tip = tip;
		this.numberOfPeople = numberOfPeople;
	}
	
	// method to validate the input values
	validate(){
		let isValid = true;
		var regexInt = /^[0-9]+$/; // regex for int
		var regexFloat = /^\d*\.?\d+$/; //regex for float
		
		// checking if bill and tip are float values, and numberOfPeople is int
		if ( !regexFloat.test(this.bill) || !regexFloat.test(this.tip) || !regexInt.test(this.numberOfPeople) ){
			isValid = false;
			return isValid;
		}
		
		// checking if values are negative
		if (this.bill<0 || this.tip<0 || this.numberOfPeople<1){
			isValid = false;
			return isValid;
		}
		
		return isValid;
	}
	
	// method to calculate tip
	calculateTip(){
		var billVal = parseFloat (this.bill); 
		var tipVal = parseFloat (this.tip);
		var peopleVal = parseInt (this.numberOfPeople);
		var tipAmount = (billVal * tipVal) / 100 ;      // computed tip value
		var totalAmount = (billVal + tipAmount);        // computed total amount
		var tipPerHead = (tipAmount / peopleVal);       // computed tip per person
		var totalPerHead = (totalAmount / peopleVal);   // computed total per person
		
		tipPerPerson.innerHTML = tipPerHead.toFixed(2);      // setting tip per person
		totalPerPerson.innerHTML = totalPerHead.toFixed(2);  // setting total per person
	}
}


// function to start the calculation process
function calculationProcess(){
	const tipObj = new TipClass(bill.value , tip.value , numberOfPeople.value );
	const isValid = tipObj.validate();    // checking if the input is valid or not
	
	if (!isValid){
		remarks.innerHTML = "Invalid Input";
		tipPerPerson.innerHTML = 0;
		totalPerPerson.innerHTML = 0;
	}
	
	else{
		remarks.innerHTML = ""
		tipObj.calculateTip();     //calculating tip
	}
}


// function for the '+' buttons
function incrementVal(toChange){
	
	var regexInt = /^[0-9]+$/;        
	var regexFloat = /^\d*\.?\d+$/;
	
	// if '+' corresponds to number of people
	if (toChange === "numberOfPeople"){
		var curVal = numberOfPeople.value;   // extracting current value from numberOfPeople
		if (!regexInt.test(curVal)){         // if the current value is not int, then do nothing
			return;
		}
		curVal++;                            // increment current value 
		numberOfPeople.value = curVal;       // set the new value
	}
	// if '+' corresponds to tip
	else{
		var curVal = tip.value;              // extracting current value from tip
		if (regexInt.test(curVal)){			 // if current value is int
			curVal++;
			tip.value = curVal;
		}
		else if (regexFloat.test(curVal)){   // if current value is float
			curVal++;
			curVal = curVal.toFixed(2);
			tip.value = curVal;
		}
	}
			
}


// function for the '-' buttons
function decrementVal(toChange){
	
	var regexInt = /^[0-9]+$/;
	var regexFloat = /^\d*\.?\d+$/;
	
	// if '-' corresponds to number of people
	if (toChange === "numberOfPeople"){     
		var curVal = numberOfPeople.value;    // extracting current value from numberOfPeople
		if (!regexInt.test(curVal)){		  // if the current value is not int, then do nothing
			return;
		}
		if(curVal>1){						  // decrement only when current number of people > 1
			curVal--;
			numberOfPeople.value = curVal;
		}
	}
	//if '-' corresponds to tip
	else{
		var curVal = tip.value;				  // extracting current value from tip
		if (regexInt.test(curVal)){			  // if the current value is int
			if(curVal>=1){					  // decrement only when current value is >= 1
				curVal--;
				tip.value = curVal;
			}
		}
		else if (regexFloat.test(curVal)){    // if the current value is float
			if (curVal>=1){					  // decrement only when current value >= 1
				curVal--;
				curVal = curVal.toFixed(2);
				tip.value = curVal;
			}
		}		
	}
	
}


// main function
function main(){
	
	// when calculate button is clicked
	calculate.addEventListener('click',function(){
		calculationProcess();		
	})
	
	// when '+' tip button is clicked
	incTip.addEventListener('click',function(){
		incrementVal("tip");
	})
	
	// when '+' number of people button is clicked
	incPeople.addEventListener('click',function(){
		incrementVal("numberOfPeople");
	})
	
	// when '-' tip button is clicked
	decTip.addEventListener('click',function(){
		decrementVal("tip");
	})
	
	// when '-' number of people button is clicked
	decPeople.addEventListener('click',function(){
		decrementVal("numberOfPeople");
	})
	
}


// calling the main function
main();
