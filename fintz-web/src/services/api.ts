const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, options);

    console.log("asdasda", response)

  if (!response.ok) {
    const errorData = await response.json();
    console.log("o que foi isso?", errorData);
    
    throw new Error(errorData.message || 'Erro na requisição da API');
  }

  return response.json();
}