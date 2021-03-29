const button = document.getElementById("button");
const toasts = document.getElementById("toasts");

const messages = [
    'Message One',
    'Message Two',
    'Message Three',
    'Message Four',
]

const types = [
    'info',
    'success',
    'error'
]

button.addEventListener("click", () => showToast());

function showToast(message = null, type = null) {
    const notification = document.createElement('div')

    notification.classList.add('toast');

    notification.classList.add(type ? type : getRandomToastColor());

    notification.innerText = message ? message : getRandomToast();

    toasts.appendChild(notification);

    setTimeout(() => {
        notification.remove()
    }, 3000)
}

function getRandomToast() {
    return messages[Math.floor(Math.random() * messages.length)]
}

function getRandomToastColor() {
    return types[Math.floor(Math.random() * types.length)]
}