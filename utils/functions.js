const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('request failed');
  }
  const json = await response.json();
  return json;
};

export { doFetch };
