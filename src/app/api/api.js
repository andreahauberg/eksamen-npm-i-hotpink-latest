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


export const reserveSpot = async (area, amount) => {
  const url = `${baseURL}/reserve-spot`;
  const payload = { area, amount };
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error reserving spot: ", error);
    throw error;
  }
};

export const fulfillReservation = async (id) => {
  const url = `${baseURL}/fullfill-reservation`;
  const payload = { id };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fulfilling reservation: ", error);
    throw error;
  }
};
