var fs = require('fs');
var readlineSync = require('readline-sync');

var library =[
	{id: 0,
	 shelf: '1A',	
	 nameBook: ['Into the wild', 'IT']},
	{id: 1,
	 shelf: '2A',
	 nameBook: ['The Catcher in the Rye', 'White Fang']},
	{id: 2,
	 shelf: '3A',
	 nameBook: ['Treasure Island', 'Sans Famile']}
];


var books = [];
var membership = [];

function showMenu(){
	console.log('1. Show membership list');
	console.log('2. Show bookslist');
	console.log('3. Member registration');
	console.log('4. Register to borrow book');
	console.log('5. Check expire borrowed date');
	console.log('6. Exit');
	var task = readlineSync.question('>');
	switch(task){
		case'1':
			showListMember();
			showMenu();
			break;
		case'2':
			showBooks();
			showMenu();
			break;
		case'3':
			registerMember();
			showMenu();
			break;
		case'4':
			borrowBook();
			showMenu();
			break;
		case'5':
			checkExpiration();
			showMenu();
			break;
		case'6':
			break;
		default:
			console.log('Wrong option');
			break;
	};
};

function loadData(){
	var book = fs.readFileSync('./books.json',{encoding: 'utf8'});
	books = JSON.parse(book);
	var member = fs.readFileSync('./members.json',{encoding: 'utf8'});
	members = JSON.parse(member);
}

function showListMember(){
	for(var member of members){
		console.log(member.name,member.grade);
	}
};

function showBooks(){
	for(var book of books){
		console.log(book.name,book.code);
	}
}

function registerMember(){
	var name = readlineSync.question('Input your name: ');
	var grade = readlineSync.question('Input your grade: ');
	var member = {
		name: name,
		grade: parseInt(grade)
	};
	members.push(member);
	setId();
	fs.writeFileSync('./members.json',JSON.stringify(members));

}

function setId(){
	for(i=0; i<members.length; i++){
		members[i]['id'] = i;
	}
	fs.writeFileSync('./members.json',JSON.stringify(members));
}

function trackBook(){
	var task = readlineSync.question('Which book do you want? ');
}

function borrowBook(){
	var task = readlineSync.question('Have you been a member ? Y or N:');
	switch(task){
		case 'N':
			registerMember();
	}
}



function main(){
	loadData();
	showMenu();
};


main();
