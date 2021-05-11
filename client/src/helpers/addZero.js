const addZero = num => {
	return +num < 10 && +num >= 0 ? '0' + num : num
}

export default addZero