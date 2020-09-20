const player= document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const skipButtons=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');
const screen=player.querySelector('.new');


function toggleplay(){
	const method=video.paused?'play':'pause';
	video[method]();

}
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}
function skip(){
	console.log(this.dataset.skip);
	video.currentTime+=parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
	video[this.name]=this.value;
console.log(this.value);
}
function handleProgress(){
	const percent=(video.currentTime/video.duration)*100;
	progressBar.style.flexBasis=`${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
function toggleWindow(e){
	console.log(e);

}
//hook up event listener

video.addEventListener('click',toggleplay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate',handleProgress);

toggle.addEventListener('click',toggleplay);
skipButtons.forEach(button=>{
button.addEventListener('click',skip);
});

ranges.forEach(range=>{
range.addEventListener('change',handleRangeUpdate);
});
ranges.forEach(range=>{
range.addEventListener('mousemove',handleRangeUpdate);
});
let mousedown=false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));

screen.addEventListener('click',toggleWindow);