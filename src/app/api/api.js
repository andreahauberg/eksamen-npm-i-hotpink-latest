const baseURL = process.env.NEXT_PUBLIC_API;
const databaseURL = process.env.NEXT_PUBLIC_DATABASE;
const apiKey = process.env.NEXT_PUBLIC_KEY;

export const fetchAPI = async (endpoint, options = {}) => {
  const url = `${baseURL}${endpoint}`;
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

export const saveOrderToDatabase = async (orderData) => {
  const url = `${databaseURL}/ticket_info`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Failed to save order data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving order data: ', error);
    throw error;
  }
};


