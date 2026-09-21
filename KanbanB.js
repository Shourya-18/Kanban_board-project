const todo = document.querySelector(".todo");
const progress = document.querySelector(".Inprogress");
const done = document.querySelector(".done");
let drag = null;

const container = document.querySelector(".container");
const arr = [todo, progress, done];

let taskData = {};

if (localStorage.getItem("tasks")) {

    taskData = JSON.parse(localStorage.getItem("tasks"));

    [todo, progress, done].forEach(col => {

        const tasks = taskData[col.className] || [];

        tasks.forEach(task => {

            const div = document.createElement("div");
            div.classList.add("card");
            div.setAttribute("draggable", "true");

            const head = document.createElement("h5");
            head.classList.add("head");

            const description = document.createElement("h6");
            description.classList.add("Des");

            const button = document.createElement("button");
            button.classList.add("Delete");
            button.textContent = "Delete";

            head.textContent = task.title;
            description.textContent = task.description;

            div.appendChild(head);
            div.appendChild(description);
            div.appendChild(button);

            div.addEventListener("dragstart", (e) => {
                drag = div;
            });

            button.addEventListener("click", (e) => {
                e.stopPropagation();
                div.remove();
                updateTasks();
            });
        
            col.appendChild(div);
        });
    });
}

function updateTasks() {

    [todo, progress, done].forEach(col => {

        const count = col.querySelector(".count");
        const tasks = col.querySelectorAll(".card");

        count.textContent = tasks.length;

        taskData[col.className] = Array.from(tasks).map(t => {

            return {
                title: t.querySelector(".head").innerText,
                description: t.querySelector(".Des").innerText
            };

        });

    });

    localStorage.setItem("tasks", JSON.stringify(taskData));

}

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("dragstart", (e) => {
        drag = card;
    });

});

function addDrag(col) {
    col.addEventListener("dragenter", (e) => {
        e.preventDefault();
        col.classList.add("hover");
    });

    col.addEventListener("dragleave", (e) => {
        e.preventDefault();
        col.classList.remove("hover");
    });

    col.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    col.addEventListener("drop", (e) => {
        e.preventDefault();
        if (!drag) return;
        col.appendChild(drag);
        col.classList.remove("hover");
        updateTasks();
        drag = null;
    });
}

addDrag(todo);
addDrag(progress);
addDrag(done);

const addTask = document.querySelector(".Add");
const form = document.querySelector(".form");
const sumbit = document.querySelector(".submit");


addTask.addEventListener("click", (e) => {
    e.stopPropagation();
    form.style.display = "flex";
});

container.addEventListener("click", () => {
    form.style.display = "none";
    document.querySelector(".title").value = "";
    document.querySelector(".des").value = "";
});

form.addEventListener("click", (e) => {
    e.stopPropagation();
});

sumbit.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector(".title").value;
    const des = document.querySelector(".des").value;

    if (title.trim() === "" || des.trim() === "") {
        return;
    }

    const div = document.createElement("div");

    div.classList.add("card");
    div.setAttribute("draggable", "true");

    const head = document.createElement("h5");

    head.classList.add("head");

    const description = document.createElement("h6");

    description.classList.add("Des");

    const button = document.createElement("button");

    button.classList.add("Delete");
    button.textContent = "Delete";


    head.textContent = title;
    description.textContent = des;


    div.appendChild(head);
    div.appendChild(description);
    div.appendChild(button);

    div.addEventListener("dragstart", (e) => {
        drag = div;
    });

    button.addEventListener("click", (e) => {
        e.stopPropagation();
        div.remove();
        updateTasks();
    });
    todo.appendChild(div);
    updateTasks();

    form.style.display = "none";
    document.querySelector(".title").value = "";
    document.querySelector(".des").value = "";

});
