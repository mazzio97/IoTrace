const agent_alpha_channel = 0.7
const infection_area_alpha_channel = 0.2
// Time elapsed every loop (in milliseconds)
export const timestep = 100

export const Colors = {
	normal: "rgba(0, 0, 0, " + agent_alpha_channel + ")",
	infected: "rgba(255, 0, 0, " + agent_alpha_channel + ")",
	notified: "rgba(255, 255, 0, " + agent_alpha_channel + ")",
	quarantined: "rgba(0, 255, 0, " + agent_alpha_channel + ")",

	infection_area: "rgba(255, 0, 0, " + infection_area_alpha_channel + ")",
	selected_stroke: "rgba(255, 0, 255, " + agent_alpha_channel + ")",
	text: "rgba(0, 0, 0, " + agent_alpha_channel + ")",
}

export const Dim = {
	epsilon: 1e-3, // Minimum distance used to stop agents which have reached their destinations
	agent_radius: 15,
	infection_radius: 15 * 2.5,
	selected_stroke_width: 3
}

export const Time = {
	// 8.64e+7
	sickness: 3000 * timestep,
	visit: 2000 * timestep,
	notification: 500 * timestep,
}

export default {}
