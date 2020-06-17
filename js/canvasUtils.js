const getVerticalImageData = (x, context) => {
	return context.getImageData(x, 0, 1, 10000).data;
};

const getHorizontalImageData = (y, context) => {
	return context.getImageData(0, y, 10000, 1).data;
};

const maxValue = (arr) => {
	let max = arr[0];

	for (let val of arr) {
		if (val > max)
			max = val;
	}

	return max;
}

export const detectCanvasContentSize = (context) => {
	let foundStart = false;
	let height = 0;
	for (let y = 0; y < 10000; y++) {
		if (!foundStart && maxValue(getHorizontalImageData(y, context)) !== 0) {
			foundStart = true;
		} else if (foundStart && maxValue(getHorizontalImageData(y, context)) === 0) {
			height = y;
			break;
		}
	}

	foundStart = false;
	let width = 0;
	for (let x = 0; x < 10000; x++) {
		if (!foundStart && maxValue(getVerticalImageData(x, context)) !== 0) {
			foundStart = true;
		} else if (foundStart && maxValue(getVerticalImageData(x, context)) === 0) {
			width = x;
			break;
		}
	}

	return {width, height};
};