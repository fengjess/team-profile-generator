const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
// Manager questions
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your manaager's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager's id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your manager's email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?"
    },
];

// Creates a manager
function createManager() {
    inquirer.prompt(managerQuestions).then(function (answers) {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        teamMembers.push(manager);
        newEmployee();
    });
}

// Creates an employee
function newEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ]
        }
    ]).then(function (answers) {
        switch (answers.type) {
            // Engineer questions
            case "Engineer":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is your engineer's name?"
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What is your engineer's id?"
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is your engineer's email?"
                    },
                    {
                        type: "input",
                        name: "github",
                        message: "What is your engineer's GitHub username?"
                    }
                ]).then(answers => {
                    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
                    teamMembers.push(engineer);
                    newEmployee()
                })
                break;
            // Intern questions 
            case "Intern":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is your intern's name?"
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What is your intern's id?"
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is your intern's email?"
                    },
                    {
                        type: "input",
                        name: "school",
                        message: "What is your intern's school?"
                    }
                ]).then(answers => {
                    const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
                    teamMembers.push(intern);
                    newEmployee()
                })
                break;
            default:
                writeToFile("output/team.html", render(teamMembers))
        };
    })
};

// Writes team.html file
function writeToFile(fileName, data) {
    console.log("Team profile generated!")
    fs.writeFile(fileName, data, function (err, response) {
        process.exit()
    })
}

function init() {
    createManager()
}

init();

