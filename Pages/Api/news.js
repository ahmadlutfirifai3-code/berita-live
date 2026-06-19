import axios from 'axios';

export default async function handler(req, res) {
  // Set CORS dan cache control
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  
  try {
    // Menggunakan API berita gratis dari NewsAPI
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=id&apiKey=d6b418f827ad43509859dbdb6f4ecde5&pageSize=20`
    );
    
    // Alternatif: Gunakan API dari berbagai sumber
    // const response = await axios.get('https://api.spaceflightnewsapi.net/v3/articles');
    
    const news = response.data.articles.map((article, index) => ({
      id: index,
      title: article.title || 'No Title',
      description: article.description || 'No Description',
      content: article.content || article.description || 'No Content',
      url: article.url || '#',
      image: article.urlToImage || 'https://via.placeholder.com/400x200?text=News',
      source: article.source?.name || 'Unknown Source',
      publishedAt: article.publishedAt || new Date().toISOString(),
      author: article.author || 'Anonymous'
    }));
    
    res.status(200).json({ 
      success: true, 
      news,
      total: news.length,
      lastUpdate: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch news',
      news: getFallbackNews()
    });
  }
}

// Fallback news jika API error
function getFallbackNews() {
  return [
    {
      id: 1,
      title: 'Berita Terbaru Hari Ini',
      description: 'Update berita terbaru dari berbagai sumber',
      content: 'Kami sedang memperbarui berita...',
      url: '#',
      image: 'https://via.placeholder.com/400x200?text=News+Update',
      source: 'News Live',
      publishedAt: new Date().toISOString()
    }
  ];
        }
