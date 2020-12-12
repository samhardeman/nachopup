//Simpler way to get data from an API than using node-fetch over and over again.
const fetch = require('node-fetch');

const getAPI = async url => {
	try {
		const response = await fetch(url, {
			method: 'GET',
		});
    if (!response.ok) { throw new Error(response.statusText) }
      const data = await response.json();
      return data;
	}
	catch(error) {
		return error;
	}
};

module.exports = function (url) {
  return getAPI(url)
}