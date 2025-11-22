import https from 'https';

export interface BingSearchResult {
  success: boolean;
  query: string;
  results: string[];
  error?: string;
}

export class BingSearchTool {
  private enabled: boolean = false;

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    console.log(`Bing Search Tool ${enabled ? 'enabled' : 'disabled'}`);
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public async search(query: string): Promise<BingSearchResult> {
    if (!this.enabled) {
      return {
        success: false,
        query,
        results: [],
        error: 'Web search is disabled. Please enable it in settings.',
      };
    }

    try {
      console.log(`Searching Bing for: ${query}`);
      
      const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
      const htmlContent = await this.fetchUrl(searchUrl);
      
      const results = this.parseSearchResults(htmlContent);
      
      return {
        success: true,
        query,
        results,
      };
    } catch (error) {
      console.error('Bing search error:', error);
      return {
        success: false,
        query,
        results: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private fetchUrl(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      }, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          resolve(data);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  }

  private parseSearchResults(html: string): string[] {
    const results: string[] = [];
    
    const titleRegex = /<h2[^>]*><a[^>]*>([^<]+)<\/a><\/h2>/gi;
    let match;
    
    while ((match = titleRegex.exec(html)) !== null && results.length < 5) {
      const title = match[1].trim();
      if (title) {
        results.push(title);
      }
    }
    
    const snippetRegex = /<p[^>]*class="[^"]*b_lineclamp[^"]*"[^>]*>([^<]+)<\/p>/gi;
    let snippetMatch;
    const snippets: string[] = [];
    
    while ((snippetMatch = snippetRegex.exec(html)) !== null && snippets.length < 5) {
      const snippet = snippetMatch[1].trim();
      if (snippet) {
        snippets.push(snippet);
      }
    }
    
    for (let i = 0; i < Math.max(results.length, snippets.length); i++) {
      if (results[i] && snippets[i]) {
        results[i] = `${results[i]}: ${snippets[i]}`;
      }
    }
    
    if (results.length === 0) {
      const textContent = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
      const words = textContent.split(' ').filter(w => w.length > 3);
      if (words.length > 0) {
        results.push(`搜索结果概要: ${words.slice(0, 50).join(' ')}...`);
      }
    }
    
    return results;
  }
}

export const bingSearchTool = new BingSearchTool();
