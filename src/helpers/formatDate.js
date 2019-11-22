export default function formatDate (date, opts = { year: 'numeric', month: 'long' }) {
	if (!(date instanceof Date))
		date = new Date(date);

	return new Intl.DateTimeFormat('en-GB', opts).format(date);
}
