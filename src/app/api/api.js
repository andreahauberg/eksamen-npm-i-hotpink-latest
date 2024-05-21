// api.js
const baseURL = process.env.NEXT_PUBLIC_API;
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE;
const supabaseKey = process.env.NEXT_PUBLIC_KEY;


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
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const reserveSpot = (area, amount) => fetchAPI('/reserve-spot', {
  method: 'PUT',
  body: JSON.stringify({ area, amount }),
});



export const fullfillReservation = (id) => fetchAPI('/fullfill-reservation', {
  method: 'POST',
  body: JSON.stringify({ id }),
});



export const saveOrderToSupabase = async (orderData) => {
  const url = `${supabaseURL}/rest/v1/orders`;
  console.log("Saving order data to:", url);
  console.log("Order data:", orderData);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase response error:", errorText);
      throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
    }
    // Check if there is any content to parse
    const responseText = await response.text();
    console.log("Supabase response text:", responseText);
    return responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    console.error("Error saving data to Supabase: ", error);
    throw error;
  }
};
