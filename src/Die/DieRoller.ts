export class DieRoller {

	public static roll(numberOfDice: number, numberOfSides: number) {
		var total = 0;
		for (var i = 0; i < numberOfDice; i++) {
			total += DieRoller.dice(numberOfSides);
		}
		return total;
	}

	public static dice(sides: number) {
		return Math.floor(Math.random() * sides + 1);
	}
}
