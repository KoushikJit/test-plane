import * as Tone from 'tone'
let isPlaying = false;
let player: Tone.Player;
let isFiltered = false;
let lowpass: Tone.Filter;
function init() {
	if (!player) {
		lowpass = new Tone.Filter(400, 'lowpass').toDestination();
		player = new Tone.Player({
			url: '/background-track.mp3',
			loop: true,
		}).toDestination();
		Tone.loaded().then(() => {
			player.start();
		});
	}
}
export function playtone(distort?: boolean) {
	init();
	if (player) {
		if (distort) {
			player.disconnect().chain(lowpass);
		} else {
			player.disconnect(lowpass).toDestination();
		}
	}
}