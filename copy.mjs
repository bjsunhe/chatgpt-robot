import robot from 'robotjs';
import clipboardy from 'clipboardy';



function pasteText(text) {
    // Copy text to clipboard
    clipboardy.writeSync(text);

    // Simulate Ctrl+V (Windows/Linux) or Command+V (Mac)
    robot.keyTap('v', process.platform === 'darwin' ? 'command' : 'control');
}

// Function to move the mouse to a specific position
function moveMouseTo(x, y) {
    robot.moveMouse(x, y);
}

// Function to perform a mouse click
function clickMouse() {
    robot.mouseClick();
}


// Function to press a key (e.g., Enter)
function pressKey(key) {
    robot.keyTap(key);
}


function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






// setTimeout(async ()=>{
//     // Move the mouse to coordinates (500, 500)
//     moveMouseTo(599, 637);    
//     clickMouse();
//     moveMouseTo(900, 760); 
//     clickMouse();
//     robot.keyTap('v', process.platform === 'darwin' ? 'command' : 'control');
    




// },2000)



setTimeout(async ()=>{
    // Move the mouse to coordinates (500, 500)
    moveMouseTo(599, 637);    
    clickMouse();
    clipboardy.read().then(content => {
        console.log('Clipboard content:', content);
    }).catch(err => {
        console.error('Failed to read clipboard content:', err);
    });
    
    




},2000)
