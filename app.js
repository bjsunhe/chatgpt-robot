const robot = require('robotjs');
const clipboardy = require('clipboardy');




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

You are an information system professor and an expert linguist, specializing in translation from {source_lang} to {target_lang}.`



let reflection=`carefully read a source text and a translation from {source_lang} to {target_lang}, and then give constructive criticism and helpful suggestions to improve the translation. The final style and tone of the translation should match the style of {target_lang} colloquially spoken in {country}.

When writing suggestions, pay attention to whether there are ways to improve the translation's \n (i) accuracy (by correcting errors of addition, mistranslation, omission, or untranslated text),\n (ii) fluency (by applying {target_lang} grammar, spelling and punctuation rules, and ensuring there are no unnecessary repetitions),\n (iii) style (by ensuring the translations reflect the style of the source text and takes into account any cultural context),\n (iv) terminology (by ensuring terminology use is consistent and reflects the source text domain; and by only ensuring you use equivalent idioms {target_lang}).\n\

Write a list of specific, helpful and constructive suggestions for improving the translation. Each suggestion should address one specific part of the translation. Output only the suggestions and nothing else.`

let newTranslation=`carefully read, then edit, a translation from {source_lang} to {target_lang}, taking into account a list of expert suggestions and constructive criticisms.

Please take into account the expert suggestions when editing the translation. Edit the translation by ensuring:

(i) accuracy (by correcting errors of addition, mistranslation, omission, or untranslated text), (ii) fluency (by applying {target_lang} grammar, spelling and punctuation rules and ensuring there are no unnecessary repetitions), (iii) style (by ensuring the translations reflect the style of the source text) (iv) terminology (inappropriate for context, inconsistent use), or (v) other errors.

Output only the new translation and nothing else.`


let originalText=`While the general rise of digital platforms is mirrored by an
increasing research interest in the topic, research on digital
industrial platforms is still scarce. It is broadly recognized
that platforms cannot be treated as a homogenous phenomenon
and choosing the right level of abstraction while
embracing the individual complexity of platforms is necessary
for a comprehensive analysis (Tilson et al. 2013).
Thus, there is a growing understanding that digital platforms
need to be analyzed differently from non-digital
platforms (De Reuver et al. 2018). Similarly, we show that
industrial platforms are different from many other digital
platforms studied to date, such as mobile platforms (Basole
and Karla 2010; Ghazawneh and Henfridsson 2013),
internet platforms (Muzellec et al. 2015; Ta¨uscher and
Laudien 2018), or video game consoles (Cennamo and
Santalo 2013; Cennamo et al. 2018; Ozalp et al. 2018).
Lessons learned from other domains may therefore not
always be readily transferable to industrial platforms, creating
the need for novel insights into the mechanisms
driving success and failure of industrial platforms (Schermuly
et al. 2019).
However, not everything that looks new is completely
new. Therefore, we can nevertheless build on the vast
amount of insights on platforms in other domains. To
successfully establish digital industrial platforms, practitioners
must carefully evaluate which established strategies
they can build on, which strategies they need to adapt to the
new context, and which completely new strategies are
required or become feasible. In this nascent domain, it is
therefore important that the BISE research community
provides practitioners with guidance. The complexities and
implications presented herein can be a good starting point
for the identification of phenomena that require further
examination in the context of digital industrial platforms.`


setTimeout(async ()=>{
    // Move the mouse to coordinates (500, 500)
    moveMouseTo(900, 760);
    
    clickMouse();
    pasteText(initialTranslationPrompt);
    pressKey('enter');
    await pause(10000);

    clickMouse();
    pasteText(originalText);
    pressKey('enter');
    await pause(10000);

    clickMouse();
    pasteText(reflection);
    pressKey('enter');
    await pause(10000);

    clickMouse();
    pasteText(newTranslation);
    pressKey('enter');





},2000)

