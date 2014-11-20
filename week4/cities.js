var city = {
	population: 160000,
	name: "Legoland",
	motto: "Everything is awesome"
	offices: [
		{name: "mayor", incumbent: "Batman"},
		{name: "treasurer", incumbent: "Robin"}]
}

function City(name, population) {
	this.name = name;
	this.population = population;
}

// this sets up the way of inputting stuff

var ny = new City ("New York, 450000000");