// Templates for Buildings, Research, Resources...
export function getTemplates() {
	let buildings = [
		{
			id:1,
			type:"building",
			name:"Ore Extraction Facility",
			level:1,
			energy_required:30,
			time_required:30,
			prps:0.107, // Production Rate Per Second
			prerequisites:[], // "type_id_lvl"
			resource_cost:[], // "id_quantity"
		},
	];
	let research = [
		{
			id:1,
			type:"research",
			name:"Energy Technology",
			level:1,
			time_required:30,
			prerequisites:[], // "type_id_lvl"
			resource_cost:[], // "id_quantity"
		},
	];
	let resources = [
		{id:1,name:"Metal",},
		{id:2,name:"Crystal",},
		{id:3,name:"Deuterium",},
		{id:4,name:"Hydrogen",},
		{id:5,name:"Energy",},
		{id:6,name:"Antimatter",},
	];

	return {
		buildings:buildings,
		research:research,
		resources:resources
	};
}