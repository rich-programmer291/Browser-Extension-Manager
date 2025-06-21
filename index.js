import orgData from './data.js';
let data = [...orgData];

let header_buttons = document.getElementsByClassName("header-btn");
let type = "All";
let extensions = document.getElementById("extensions");
const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const toggleImg = document.getElementById('toggle-logo');
    toggleImg.src = (newTheme === 'dark') ? './assets/images/icon-sun.svg' : './assets/images/icon-moon.svg';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
})


function removeItem(name) {
    const index = data.findIndex((item) => item.name === name);
    if (index !== -1) {
        data.splice(index, 1);
        createExtensions(type);
    }
}


function createExtension(dataItem) {
    var box = document.createElement('div');
    box.classList.add('box');

    var name = document.createElement('h4');
    name.classList.add('title');
    name.textContent = dataItem.name;

    var image = document.createElement('img');
    image.src = dataItem.logo;
    image.classList.add('logo');

    var coverBox = document.createElement('div');
    coverBox.classList.add('cover-box');

    var rightBox = document.createElement('div');
    rightBox.classList.add('right-box');

    var description = document.createElement('p');
    description.className = 'desc';
    description.innerText = dataItem.description;

    var bottomBox = document.createElement('div');
    bottomBox.classList.add('bottom-box');

    var removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', () => removeItem(dataItem.name));

    var switchInput = document.createElement('input');
    switchInput.type = 'checkbox';
    switchInput.id = 'toggleSwitch';
    switchInput.checked = dataItem.isActive;
    switchInput.addEventListener('click', (event) => {
        console.log(event);
        console.log(switchInput.checked);
        if (switchInput.checked) {
            dataItem.isActive = true;
        }
        else
            dataItem.isActive = false;
    })

    var switchSpan = document.createElement('span');
    switchSpan.className = 'slider';

    var switchLabel = document.createElement('label');
    switchLabel.classList.add('switch');


    switchLabel.appendChild(switchInput);
    switchLabel.appendChild(switchSpan);

    rightBox.appendChild(name);
    rightBox.appendChild(description);
    coverBox.appendChild(image);
    coverBox.appendChild(rightBox);
    box.appendChild(coverBox);

    bottomBox.appendChild(removeButton);
    bottomBox.appendChild(switchLabel);
    box.appendChild(bottomBox);
    extensions.appendChild(box);

}

function createExtensions(type) {
    extensions.innerHTML = "";
    if (type == 'All') {
        data.forEach((item) => createExtension(item));
    } else if (type == 'Active') {
        data.forEach((item) => {
            if (item.isActive == true) {
                createExtension(item);
            }
        });
    } else {
        {
            data.forEach((item) => {
                if (item.isActive == false) {
                    createExtension(item);
                }
            });
        }
    }
}

for (let btn of header_buttons) {
    btn.addEventListener('click', function () {
        for (let b of header_buttons) {
            b.classList.remove('active-btn');
        }
        btn.classList.add('active-btn');
        type = btn.innerHTML;
        createExtensions(type);
    })
}


createExtensions(type);