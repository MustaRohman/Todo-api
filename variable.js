// var person = {};

// function changeValue(obj) {
// 	obj = {
// 		name: 'musta'
// 	};

// 	console.log(obj);
// }

// changeValue(person);
// console.log(person);

// var grades = [15, 37];

// function addGrade(grades) {
// 	// grades.push(23);
// 	grades = [15, 37, 23];
// 	console.log(grades);
// }

// addGrade(grades);
// console.log(grades);

var num = 33;

function addNum(num) {
	//Essentially, it creates a COPY of the argument, that's why the original var
	//is not updated
	//We use return to solve this
	num += 10;
	debugger;
	console.log(num);
}

addNum(num);
console.log(num);