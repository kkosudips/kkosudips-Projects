// 上課時間下課時間循環鬧鐘


const buttonStartEl = document.querySelector('#btn-start')
const buttonResetEl = document.querySelector('#btn-reset');
const buttonPauseEl = document.querySelector('#btn-pause');
const tbodyEl = document.querySelector('#tbody-record')


const labelMinuteEl = document.querySelector('#label-minute');
const labelSecondEl = document.querySelector('#label-second');
const labelStateEl = document.querySelector('#label-state');

let minute = labelMinuteEl.textContent;
let second = labelSecondEl.textContent;

const work = 40
const recess =20

let flag = "stop" // clock start or pause
let state = "working" // working time or recessing time


let start_time; // record starting time
let end_time; 

buttonStartEl.addEventListener('click',(event)=>{
    console.log("start");

    start_time = new Date().toLocaleString();
    flag="start";
    buttonStartEl.disabled = true;
    buttonPauseEl.disabled = false;
    start();
})

buttonPauseEl.addEventListener('click',(event)=>{
    console.log("pause/start");
    if(flag=="start"){
        buttonPauseEl.textContent="Cont"
        flag="pause"
    }else if(flag=="pause"){
        buttonPauseEl.textContent="Pause"
        flag="start"
        start()
    }
})

buttonResetEl.addEventListener('click',(event)=>{
    console.log("reset");
    reset()
})




const sleep = (ms)=>{
    return new Promise(resolve => setTimeout(resolve,ms)).then(console.log("sleeping"))
}

const addz = (num)=>{
    let content = num.toString();
    return content.padStart(2,'0');
}

const timer = async()=>{
    if(second>0)second--;
    else if(second==0&&minute>0){
        second=59;
        minute--;
    }
    else if(second==0&&minute==0){
        if(state=="working"){
            state="recessing"

            minute=recess;
            second=0;

            labelStateEl.textContent="休息";
        }
        else if(state=="recessing"){
            flag="stop"
            state="working"
            end_time = new Date().toLocaleString();
            console.log(end_time);
            reset();
            return 1;
        }
    }
   
    labelSecondEl.textContent=addz(second);
    labelMinuteEl.textContent=addz(minute);

    return 0;
}

const start = async()=>{
    try{
        let num;
        while(flag=="start"){
            timer().then(resolve=>num=resolve);
            console.log(num);
            await sleep(1000);
        }
        if(num==1)await record()
    }catch(err){
        console.log(err);
    }
}

const record = ()=>{
    console.log("record");
    return new Promise((resolve, reject) => {
    
        let asert_content = `
            <tr id="tr-record">
                <td>
                    <time">${start_time}</time>
                </td>
                <td>
                    <time">${end_time}</time>
                </td>
            </tr>
        `
        tbodyEl.innerHTML+=asert_content
    })
}
const reset = ()=>{
    minute = work;
    second = "00";
    flag = "stop";
    state ="working";

    labelMinuteEl.textContent=minute;
    labelSecondEl.textContent=second;
    labelStateEl.textContent="做事";
    buttonPauseEl.disabled = true;
    buttonStartEl.disabled = false;
}