/* jshint esversion: 10 */

class ToDoList {
	constructor() {
		try {
			this.tasks = JSON.parse(localStorage.tasks);
		} catch {
			this.tasks = [
				{ description: "Go to Dentist", isComplete: false },
				{ description: "Do Gardening", isComplete: true },
				{ description: "Renew Library Account", isComplete: false },
			];
		}

		this.addEventHandlers = this.addEventHandlers.bind(this);
		this.loadTasks();
		this.addTask = this.addTask.bind(this);

		document.getElementById("addButton").onclick = this.addTask;
	}

	addTask() {
		const textBox = document.getElementById("addTask");
		const v = textBox.value;

		if (v == "") textBox.classList.add("is-invalid");
		else {
			textBox.classList.remove("is-invalid");

			const newTask = {
				description: v,
				isComplete: false
			};

			this.tasks.push(newTask);
			this.loadTasks();

			textBox.value = "";
		}
	}

	addEventHandlers() {
		const checkBoxes = document.getElementsByName("toggleTaskStatus");
		const deleteIcons = document.getElementsByName("deleteTask");

		checkBoxes.forEach((c, i) => { c.onchange = this.toggleTaskStatus.bind(this, i); });
		deleteIcons.forEach((d, i) => { d.onclick = this.deleteTask.bind(this, i); });
	}

	loadTasks() {
		localStorage.tasks = JSON.stringify(this.tasks);

		let tasksHtml = this.tasks.reduce((html, task) => html += this.generateTaskHtml(task), "");

		document.getElementById("taskList").innerHTML = tasksHtml;

		this.addEventHandlers();
	}

	generateTaskHtml(task) {
		return `
			<li class="list-group-item checkbox">
				<div class="row"> 
					<div class="col-sm-1 pt-2 checkbox">
						<label><input name="toggleTaskStatus" type="checkbox" value="" class="" ${task.isComplete ? "checked" : ""}></label>
					</div>
					<div class="col-sm-10 task-text ${task.isComplete ? "complete" : ""}">
						${task.description}
					</div>
					<div class="col-sm-1 pt-2 delete-icon-area">
						<a name="deleteTask" class="" href="/"><i class="bi-trash delete-icon"></i></a>
					</div>
				</div>
			</li>
		`;
	}

	toggleTaskStatus(index) {
		this.tasks[index].isComplete = !this.tasks[index].isComplete;
		this.loadTasks();
	}

	deleteTask(index, event) {
		event.preventDefault();

		this.tasks.splice(index, 1);
		this.loadTasks();
	}
}

var toDo;

window.onload = () => { toDo = new ToDoList(); };