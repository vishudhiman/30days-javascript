let countdown;
const timerdisplay=document.querySelector('.display__time-left');
const endTime=document.querySelector('.display__end-time');
const buttons=document.querySelectorAll('[data-time]');


function timer(seconds){
	// clear previous timer
	clearInterval(countdown);
	const now=Date.now();
	const then=now+seconds *1000;
	displayTimeLeft(seconds);
	displayEndTime(then);
	
	countdown=setInterval(()=>{
		const secondsLeft=Math.round((then-Date.now())/1000);
		// check to stop
		if(secondsLeft<0)
		{
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);
	},1000);
}
function displayTimeLeft(seconds){
	const mins=Math.floor(seconds/60);
	const sec=seconds%60;
	const display=`${mins}:${sec < 10 ?'0':'' }${sec}`;
	timerdisplay.textContent=display;
	document.title=display;
	// console.log(mins,sec);
}
function displayEndTime(timestamp){
	const end=new Date(timestamp);
	const hour=end.getHours();
	const minutes=end.getMinutes();
	const adjustedHour=hour > 12 ? hour-12 :hour;
	endTime.textContent=`Be Back At ${adjustedHour}:${minutes<10 ? '0' :''}${minutes}` ;
}
function startTimer(){
	const secc=parseInt(this.dataset.time);
	// console.log(secc);
	timer(secc);
}

buttons.forEach(button=>button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e){
e.preventDefault();
const mins=this.minutes.value;
console.log(mins);
timer(mins*60);
this.reset();
});