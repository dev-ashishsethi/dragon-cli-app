const inquirer = require('inquirer')
const quiz = require('./dragon-game-story.json')
const chalk = require('chalk')

let startingPoint = 'start'

function dragonRPG() {
	inquirer
		.prompt([
			{
				type: 'checkbox',
				message: chalk.blue.bold(quiz.scenes[startingPoint].description),
				name: 'start',
				choices: quiz.scenes[startingPoint].choices.map((choice) => ({
					name: choice.option,
				})),
			},
		])
		.then((answers) => {
			const ansSelected = answers.start

			startingPoint = quiz.scenes[startingPoint].choices.find(
				(obj) => obj.option === ansSelected[0],
			).nextScene
			if (quiz.scenes[startingPoint].choices.length > 0) {
				dragonRPG()
			} else {
				console.log(chalk.red.bold(quiz.scenes[startingPoint].description))
				return true
			}
		})
}

dragonRPG()
