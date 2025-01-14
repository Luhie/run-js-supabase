
const makePath = (dir) => {
	const currentUrl = window.location.href;

	const url = new URL(currentUrl);
	url.pathname = '/.__./'+dir;
	return url.href
}