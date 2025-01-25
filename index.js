const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;

const HOURS = jQuery('#horas');
const MINUTES = jQuery('#minutos');
const SECONDS = jQuery('#segundos');

var START_TIME = new Date();
var FINAL_TIME = new Date();
var INTERVAL;


function zeropad(value, size=2) {
   return value.toString().padStart(size, '0');
   }


function stop() {
   clearInterval(INTERVAL);
   }


function start() {
   var hours = parseInt(jQuery('#max_hours').val());
    console.log('hours:', hours);
   var minutes = parseInt(jQuery('#max_minutes').val());
    console.log('minutes:', minutes);
   START_TIME = new Date();
   var delta = hours * ONE_HOUR + minutes * ONE_MINUTE; 
    console.log('delta:', delta);
   var seconds = START_TIME.getTime() + delta;
    console.log('seconds:', seconds);

   FINAL_TIME = new Date(START_TIME.getTime() + delta);
   updateCountdown();
   INTERVAL = setInterval(updateCountdown, ONE_SECOND);
   }    

function reset() {
   var hours = parseInt(jQuery('#max_hours').val());
   var minutes = parseInt(jQuery('#max_minutes').val());
   clearInterval(INTERVAL);
   HOURS.text(zeropad(hours));
   MINUTES.text(zeropad(minutes));
   SECONDS.text(zeropad(0));
   }


function updateCountdown() {
  var duration = Math.round((FINAL_TIME - new Date()) / ONE_SECOND);

  if (duration <= 0) {
      stop();
      duration = 0;
  }
  const remaining_seconds = Math.floor(duration % 60);
  const remaining_minutes = Math.floor((duration / 60) % 60);
  const remaining_hours = Math.floor((duration / 3600) % 24);
  HOURS.text(zeropad(remaining_hours));
  MINUTES.text(zeropad(remaining_minutes));
  SECONDS.text(zeropad(remaining_seconds));
  }


jQuery(document).ready(function () {
  console.log('Starts');
  reset();  
  jQuery('#pb_reset').click(reset);
  jQuery('#pb_start').click(start);
  });
