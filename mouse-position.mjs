import robot from 'robotjs';


setTimeout(()=>{
    const mousePos = robot.getMousePos();
    console.log(`鼠标点击位置: x=${mousePos.x}, y=${mousePos.y}`);
},2000)
