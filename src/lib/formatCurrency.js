export default function formatCurrency(money) {
	let converted;

	if (money < 1000000) {
		converted = Math.abs(Math.round(money / 1000));
		converted += "K";
	} else if (money < 10000000) {
		converted = Math.abs(Math.round(money / 10000) / 100);
		converted += "M";
	} else {
		converted = Math.abs(Math.round(money / 10000) / 100);
		converted += "M";
	}

	return converted;
}
