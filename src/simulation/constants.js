const place_alpha_channel = 0.7
const agent_alpha_channel = 0.7
const infection_area_alpha_channel = 0.2
const timestep = 1000.0 / 30.0 // 30fps

const Colors = {
	normal: "rgba(0, 0, 0, " + agent_alpha_channel + ")",
	infected: "rgba(255, 0, 0, " + agent_alpha_channel + ")",
	notified: "rgba(255, 255, 0, " + agent_alpha_channel + ")",
	quarantined: "rgba(100, 0, 135, " + agent_alpha_channel + ")",

	infection_area: "rgba(255, 0, 0, " + infection_area_alpha_channel + ")",
	selected_stroke: "rgba(255, 0, 255, " + agent_alpha_channel + ")",
	text: "rgba(0, 0, 0, " + agent_alpha_channel + ")",

	place_line: "rgba(0, 0, 0, 1)",
	place_text: "rgba(0, 0, 0, " + place_alpha_channel + ")"
}

const Dim = {
	epsilon: 1, // Minimum distance used to stop agents which have reached their destinations
	agent_radius: 10,
	infection_radius: 20,
	selected_stroke_width: 3,
	offset: 60,
	width: window.innerWidth,
	height: window.innerHeight
}

const Time = {
	clock: timestep,
	clockScale: 10 * 60 * timestep, // every second in the simulation corresponds to ten minutes
	writingTime: 10 * 60 * 1000, // agents write every ten (simulated) minute
	initialDate: new Date(2020, 2) // initial date of the simulation
}

export {Colors, Dim, Time}
