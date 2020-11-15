const agent_alpha_channel = 0.7
const infection_area_alpha_channel = 0.2

export const Colors = {
	normal: "rgba(0, 0, 0, " + agent_alpha_channel + ")",
	notified: "rgba(255, 255, 0, " + agent_alpha_channel + ")",
	infected: "rgba(255, 0, 0, " + agent_alpha_channel + ")",
	infection_area: "rgba(255, 0, 0, " + infection_area_alpha_channel + ")",
	selected_stroke: "rgba(0, 255, 0, " + agent_alpha_channel + ")"
}

export const Dim = {
	epsilon: 1e-3, // Minimum distance used to stop agents which have reached their destinations
	agent_radius: 10,
	infection_radius: 35,
	selected_stroke_width: 3
}

export default {}
