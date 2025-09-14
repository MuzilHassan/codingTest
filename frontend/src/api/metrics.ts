export const ISSMGetMetrics = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/metrics`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
