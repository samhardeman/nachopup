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

exports.get = function (url) {
  return getAPI(url)
}