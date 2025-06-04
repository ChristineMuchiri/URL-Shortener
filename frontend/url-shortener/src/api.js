const API_BASE_URL = 'https://w9qvmmz2a4.execute-api.us-east-1.amazonaws.com/Prod'
export async function shortenUrl(originalUrl) {
  const response = await fetch(`${API_BASE_URL}/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: originalUrl }),
  });

  if (!response.ok) {
    throw new Error('Failed to shorten URL');
  }

  const data = await response.json();
  return data.short_url;
}
