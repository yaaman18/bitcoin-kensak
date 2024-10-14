import { json } from '@sveltejs/kit';
import axios from 'axios';
import { OPENAI_API_KEY, GITHUB_TOKEN } from '$env/static/private';

interface GitHubRepo {
	name: string;
	html_url: string;
	description: string | null;
	pushed_at: string;
}

// APIキー設定
if (!OPENAI_API_KEY || !GITHUB_TOKEN) {
	throw new Error('OPENAI_API_KEYとGITHUB_TOKENの環境変数が設定されていません。');
}

// GitHub APIを使って指定期間内に更新されたプロジェクトを検索
async function searchGithubRepositories(query: string, startDate: Date) {
	const formattedStartDate = startDate.toISOString().split('T')[0]; // YYYY-MM-DD形式に変換
	const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+pushed:>=${formattedStartDate}`;

	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`
			}
		});

		if (response.status === 200) {
			const repos = response.data.items.slice(0, 5); // 上位5つのリポジトリを取得
			const repoList = repos.map((repo: GitHubRepo) => ({
				name: repo.name,
				url: repo.html_url,
				description: repo.description,
				lastPushed: repo.pushed_at
			}));
			return repoList;
		} else {
			console.error('Error fetching GitHub repositories:', response.status, response.statusText);
			return null;
		}
	} catch (error) {
		console.error('Error fetching GitHub repositories:', error);
		return null;
	}
}

// OpenAI APIを使ってWeb情報を検索
async function searchBitcoinProjectsOnWeb(query: string): Promise<string> {
	if (!OPENAI_API_KEY) {
		throw new Error('OPENAI_API_KEY is not set');
	}

	try {
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: "gpt-4",
				messages: [
					{
							role: "system",
							content: "You are a helpful assistant that searches for information about Bitcoin development projects."
					},
					{
							role: "user",
							content: `Search for Bitcoin development projects: ${query}`
					}
				],
				max_tokens: 500,
				n: 1,
				temperature: 0.5
			},
			{
				headers: {
					'Authorization': `Bearer ${OPENAI_API_KEY}`,
					'Content-Type': 'application/json'
				}
			}
		);

		return response.data.choices[0].message.content;
	} catch (error) {
		console.error('Error fetching OpenAI Web search:', error);
		throw error;
	}
}

// APIエンドポイントのハンドラー
export async function GET({ url }) {
	const query = url.searchParams.get('query') || 'Bitcoin development project';
	const startDateStr = url.searchParams.get('startDate') || '2023-01-01';
	const startDate = new Date(startDateStr);

	// GitHubリポジトリの検索
	const githubResults = await searchGithubRepositories(query, startDate);

	// OpenAI APIを使ってWeb情報を検索
	const webResults = await searchBitcoinProjectsOnWeb(query);

	return json({
		github: githubResults,
		web: webResults
	});
}
