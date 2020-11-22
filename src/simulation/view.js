const place_alpha_channel = 0.7
const agent_alpha_channel = 0.7
const infection_area_alpha_channel = 0.2
// Time elapsed every loop (in milliseconds)
export const timestep = 1000.0 / 30.0

export const Colors = {
	normal: "rgba(0, 0, 0, " + agent_alpha_channel + ")",
	infected: "rgba(255, 0, 0, " + agent_alpha_channel + ")",
	notified: "rgba(255, 255, 0, " + agent_alpha_channel + ")",
	quarantined: "rgba(0, 255, 0, " + agent_alpha_channel + ")",

	infection_area: "rgba(255, 0, 0, " + infection_area_alpha_channel + ")",
	selected_stroke: "rgba(255, 0, 255, " + agent_alpha_channel + ")",
	text: "rgba(0, 0, 0, " + agent_alpha_channel + ")",

	place_line: "rgba(0, 0, 0, 1)",
	place_text: "rgba(0, 0, 0, " + place_alpha_channel + ")"
}

export const Dim = {
	epsilon: 1, // Minimum distance used to stop agents which have reached their destinations
	agent_radius: 10,
	infection_radius: 20,
	selected_stroke_width: 3,
	offset: 50,
	width: window.innerWidth,
	height: window.innerHeight
}

export const Time = {
	// 8.64e+7
	updateTime: timestep,
	sickness: 3000 * timestep,
	visit: 2000 * timestep,
	notification: 500 * timestep,
}

export default {}
