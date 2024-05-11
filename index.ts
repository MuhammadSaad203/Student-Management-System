#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Student {
    static counter = 20200;
    name: string;
    id : number;
    courses : string[];
    balance : number;

    constructor(name: string){
        this.name = name;
        this.id = ++Student.counter;
        this.courses = [];
        this.balance = 10000;
    }

    view_balance(){
        console.log(`The Student ${this.name} balance is : ${this.balance}`);
    }
    fees_paid(amount : number){
        this.balance = this.balance - amount;
        console.log(`${this.name} balance is : ${this.balance}`);
    }
    enroll_course(course : string){
        this.courses.push(course);
        console.log(`You have enrolled in ${course}`);
    }
    show_status(){
        console.log(`Name : ${this.name}`);
        console.log(`ID : ${this.id}`);
        console.log(`Courses : ${this.courses}`);
        console.log(`Balance : ${this.balance}`);
    }
}

class student_manager {
    students : Student[];

    constructor(){
        this.students = [];
    }
    add_student(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student : ${name} added successfully with Student ID : ${student.id}`);
    }
    enroll_courses(course: string, student_ID: number) {
        let student_finding = this.students.find(std => std.id === student_ID);
        if (student_finding) {
            student_finding.enroll_course(course);
            console.log(`Student ${student_finding.name} enrolled in ${course}`);
        } else {
            console.log(`Student with ID ${student_ID} not found`);
        }
    }
    
    view_balance(student_ID: number) {
        let student_finding = this.students.find(std => std.id === student_ID);
        if (student_finding) {
            student_finding.view_balance();
        } else {
            console.log(`Student with ID ${student_ID} not found`);
        }
    }
    paying_Student_fees(student_ID : number ,amount: number){
        let student_finding = this.students.find(std => std.id === student_ID);
        if (student_finding) {
            student_finding.fees_paid(amount);
        } else {
            console.log(`Student with ID ${student_ID} not found`);
        }
    }

    show_student_status(student_ID : number){
        let student_finding = this.students.find(std => std.id === student_ID);
        if (student_finding) {
            student_finding.show_status();
        } else {
            console.log(`Student with ID ${student_ID} not found`);
        }
    }
}

async function main(){
    console.log(chalk.yellow.bold.italic(`\n WELCOME TO YOUR STUDENT MANAGEMENT SYSTEM\n`));
    let studentmanagers = new student_manager;

    while(true){
        let choices = await inquirer.prompt([
            {
                name : "choice",
                type : "list",
                message :chalk.green.bold.italic("\n What do you want to do? \n"),
                choices : [
                    "Add Student",
                    "Enroll Course",
                    "View Balance",
                    "Paying Student Fees",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);

        if(choices.choice == "Add Student"){

            let name = await inquirer.prompt([
                {
                    name : "name",
                    type : "input",
                    message : chalk.green.bold.italic("\nEnter Student Name : \n")
                }
            ]);
            
            studentmanagers.add_student(name.name);
        }else if(choices.choice == "Enroll Course"){
            let course = await inquirer.prompt([
                {
                    name : "course",
                    type : "input",
                    message : chalk.green.bold.italic("\nEnter Course Name : \n")
                }
            ]);
            let student_ID = await inquirer.prompt([
                {
                    name : "student_ID",
                    type : "input",
                    message : chalk.green.bold.italic("\n Enter Student ID : \n")
                }
            ]);
            studentmanagers.enroll_courses(course.course, parseInt(student_ID.student_ID));
        }else if(choices.choice == "View Balance"){
            let student_ID = await inquirer.prompt([
                {
                    name : "student_ID",
                    type : "input",
                    message : chalk.green.bold.italic("\n Enter Student ID : \n")
                }
            ]);
            studentmanagers.view_balance(parseInt(student_ID.student_ID));
        }else if(choices.choice == "Paying Student Fees"){
            let student_ID = await inquirer.prompt([
                {
                    name : "student_ID",
                    type : "input",
                    message : chalk.green.bold.italic("\nEnter Student ID : \n")
                }
            ]);
            let amount = await inquirer.prompt([
                {
                    name : "amount",
                    type : "input",
                    message : chalk.green.bold.italic("\n Enter Amount : \n")
                }
            ]);
            studentmanagers.paying_Student_fees(parseInt(student_ID.student_ID), amount.amount);
        }else if(choices.choice == "Show Student Status"){
            let student_ID = await inquirer.prompt([
                {
                    name : "student_ID",
                    type : "input",
                    message : chalk.green.bold.italic("\nEnter Student ID : \n")
                }
            ]);
            studentmanagers.show_student_status(parseInt(student_ID.student_ID));
        }else{
            console.log(chalk.yellow.bold.italic("\nThanks for experiencing our system\n"));
            process.exit(0);
        }
    }
}
main();
