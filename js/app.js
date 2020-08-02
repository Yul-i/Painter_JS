const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

//css크기 주고 여기서도 canvas 크기 인식하게 주기
canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

// 기본 설정
ctx.fillStyle="white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// 마우스 이벤트

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event){
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        // 반대는 closePath()
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

// 컬러 바꾸기
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// 사이즈 바꾸기
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth=size;
}

// fill 버튼
function handleModeClick(event) {
    if(filling === true){
        filling = false;
        mode.innerText="Fill";
    }else{
        filling = true;
        mode.innerText="Paint";
    }
}

function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// 오른쪽 클릭 메뉴 안뜨게 하기
function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS(내가그린기린그림)";
    link.click();
}

// 마우스 이벤트
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// console.log(Array.from(colors));
Array.from(colors).forEach(color=>color.addEventListener("click", handleColorClick));

// range 이벤트
if(range){
    range.addEventListener("input", handleRangeChange);
}

// fill 버튼
if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}