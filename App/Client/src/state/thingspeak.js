const channelId = ''; // Replace with your ThingSpeak Channel ID
const apiKey = ''; // Replace with your ThingSpeak Read API Key

export const fetchDataFromThingSpeak = async (start, end) => {
    const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&start=${start.toISOString()}&end=${end.toISOString()}&results=100`;

  try {
    const response = await fetch(url);`zz`

    if (!response.ok) {
      throw new Error('Failed to fetch data from ThingSpeak');
    }

      const data = await response.json();

    // Process your data here
    return data;
  } catch (error) {
    console.error('Error fetching data from ThingSpeak:', error.message);
    return null;
  }
};