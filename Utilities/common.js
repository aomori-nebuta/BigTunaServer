//returns true if any of the elements in the array are null or undefined
var NullElementInArrayChecker = (array) => {
	for (index in array) {
		const element = array[index];
		if (element === null || element === undefined) {
			return true;
		}
	}

	return false;
};

module.exports = NullElementInArrayChecker;