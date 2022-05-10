// /* YOUR CODE HERE! */

let box_numbers = [1];

function generateBoxNumber() {
    let maxVal = Math.max(...box_numbers) + 1;
    box_numbers.push(maxVal);
    return maxVal.toString();
}

function generateRandomColor(){
    let maxVal = 0xFFFFFF; 
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}


function dragBoxHandler(event) {

    let target = event.target;

    if (event.button !== 0) {
        return;
    }

    event.target.moving = true;



    event.target.oldX = event.clientX;
    event.target.oldY = event.clientY;


    event.target.oldLeft = window.getComputedStyle(target).getPropertyValue('left').split('px')[0] * 1;
    event.target.oldTop = window.getComputedStyle(target).getPropertyValue('top').split('px')[0] * 1;

    event.target.addEventListener('mousemove', innerDragHandler, true);


    function innerDragHandler(event) {
        event.preventDefault();

        if (!event.target.moving) {
            return;
        }


        event.target.distX = event.clientX - target.oldX;
        event.target.distY = event.clientY - target.oldY;
        

        event.target.style.left = target.oldLeft + target.distX + "px";
        event.target.style.top = target.oldTop + target.distY + "px";
    }

    function endDrag() {
        event.target.moving = false;
    }
    event.target.addEventListener('mouseup', endDrag);

}


function rightClickHandler(event) {
    event.preventDefault();
    event.target.style.background = generateRandomColor();
}

function bigBoxHandler(event) {
    if (event.button ===  0) {
        if (event.shiftKey) {
            if (!event.target.classList.contains('box-large')) {
                event.target.classList.add('box-large');
              }
            else {
                event.target.classList.remove('box-large');
            }
        }
       
    }
}


function removeBoxHandler(event) {
    if (event.button ===  0) {
        if (event.metaKey || event.altKey) {

           

            if (box_numbers.length === 1) {
                return;
            }

            box_numbers.splice(box_numbers.indexOf(parseInt(event.target.innerHTML)), 1);

            event.target.parentNode.removeChild(event.target);

        }
       
    }
}

function newBoxHandler(event) {
 
    event.preventDefault();
    const new_box = document.createElement('div');
    new_box.innerHTML = generateBoxNumber();
    new_box.classList.add('box');
    new_box.addEventListener('mousedown', dragBoxHandler, true);
    new_box.addEventListener('contextmenu', rightClickHandler, true);
    new_box.addEventListener('dblclick', newBoxHandler, true);
    new_box.addEventListener('click', bigBoxHandler, true);
    new_box.addEventListener('click', removeBoxHandler, true);
    document.body.appendChild(new_box);
    
}


const boxes = document.getElementsByClassName("box");
[...boxes].forEach((box) => {
        box.addEventListener('mousedown', dragBoxHandler, true);
        box.addEventListener('contextmenu', rightClickHandler, true);
        box.addEventListener('click', bigBoxHandler, true);
        box.addEventListener('click', removeBoxHandler, true);
        box.addEventListener('dblclick', newBoxHandler, true);
        
    });

