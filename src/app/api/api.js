const apiURL = process.env.NEXT_PUBLIC_API;
const databaseURL = process.env.NEXT_PUBLIC_DATABASE;
const apiKey = process.env.NEXT_PUBLIC_KEY;

export const fetchAPI = async (endpoint, options = {}) => {
  const url = `${apiURL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const fetchDatabase = async (endpoint, options = {}) => {
  const url = `${databaseURL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
