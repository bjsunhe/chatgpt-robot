import robot from 'robotjs';
import clipboardy from 'clipboardy';
import fs from 'fs'


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

// Function to type a string
function typeString(message) {
    robot.typeString(message);
}

// Function to press a key (e.g., Enter)
function pressKey(key) {
    robot.keyTap(key);
}


function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let initialTranslationPrompt=`source_lang=english target_lang=chinese

You are an information system professor and an expert linguist, specializing in translation from {source_lang} to {target_lang}. Translate the {OriginalText} and nothing else. `



let reflection=`carefully read a source text and a translation from {source_lang} to {target_lang}, and then give constructive criticism and helpful suggestions to improve the translation. The final style and tone of the translation should match the style of {target_lang} colloquially spoken in {country}.

When writing suggestions, pay attention to whether there are ways to improve the translation's \n (i) accuracy (by correcting errors of addition, mistranslation, omission, or untranslated text),\n (ii) fluency (by applying {target_lang} grammar, spelling and punctuation rules, and ensuring there are no unnecessary repetitions),\n (iii) style (by ensuring the translations reflect the style of the source text and takes into account any cultural context),\n (iv) terminology (by ensuring terminology use is consistent and reflects the source text domain; and by only ensuring you use equivalent idioms {target_lang}).\n\

Write a list of specific, helpful and constructive suggestions for improving the translation. Each suggestion should address one specific part of the translation. Output only the suggestions and nothing else.`

let newTranslation=`carefully read, then edit, a translation from {source_lang} to {target_lang}, taking into account a list of expert suggestions and constructive criticisms.

Please take into account the expert suggestions when editing the translation. Edit the translation by ensuring:

(i) accuracy (by correcting errors of addition, mistranslation, omission, or untranslated text), (ii) fluency (by applying {target_lang} grammar, spelling and punctuation rules and ensuring there are no unnecessary repetitions), (iii) style (by ensuring the translations reflect the style of the source text) (iv) terminology (inappropriate for context, inconsistent use), or (v) other errors.

Output only the new translation and nothing else.`







let originalString=fs.readFileSync('./gpt.txt', 'utf8')


console.log(originalString.length)


function splitString(input, maxLength) {
    let result = [];
    let current = "";
    let sentences = input.match(/[^\.!\?]+[\.!\?]+/g);

    sentences.forEach(sentence => {
        if ((current + sentence).length > maxLength) {
            result.push(current.trim());
            current = sentence;
        } else {
            current += sentence;
        }
    });

    if (current) {
        result.push(current.trim());
    }

    return result;
}

let maxLength = 4000;
let  originalTextArray= splitString(originalString, maxLength);

console.log(originalTextArray);

let currentIndex = 1;

async function processElement(originalText){
    // move to input
    moveMouseTo(900, 760);
    
    // translate
    // clickMouse();
    // pasteText(initialTranslationPrompt);
    // pressKey('enter');
    // await pause(20000);

    // clickMouse();
    // pasteText(originalText);
    // pressKey('enter');
    // await pause(30000);


    clickMouse();
    pasteText(initialTranslationPrompt+'  OriginalText: '+originalText);
    pressKey('enter');
    await pause(144000);

    

    clickMouse();
    pasteText(reflection);
    pressKey('enter');
    await pause(144000);

    clickMouse();
    pasteText(newTranslation);
    pressKey('enter');
    await pause(144000);

    // copy result
    moveMouseTo(599, 637);    
    clickMouse();
    clipboardy.read().then(content => {
        console.log('Clipboard content:', content);
    }).catch(err => {
        console.error('Failed to read clipboard content:', err);
    });

    // create new chat
    moveMouseTo(218, 120);    
    clickMouse();
}


async function firstElementTranslation(){
    pause(2000)
    processElement(originalTextArray[0]);
}


firstElementTranslation()

const intervalId=setInterval(()=>{


    if (currentIndex < originalTextArray.length) {
        processElement(originalTextArray[currentIndex]);
        currentIndex++;
      } else {
        // Clear the interval once all elements are processed
        clearInterval(intervalId);
        console.log('All elements processed.');
      }
    


},450000)

