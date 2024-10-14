<script lang="ts">
import { onMount } from 'svelte';


let query = 'bitcoin development';
let startDate = '2023-01-01';
let githubResults: GitHubRepo[] = [];
let webResults = '';

interface GitHubRepo {
	name: string;
	url: string;
	description: string | null;
	lastPushed: string;
}

// APIを呼び出す関数
async function searchBitcoinProjects(query: string, startDate: string) {
	try {
		const res = await fetch(`/api/bitcoin?query=${query}&startDate=${startDate}`);
		const data = await res.json();
		githubResults = data.github || [];
		webResults = data.web || '';
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

// コンポーネントのマウント時に検索を実行
onMount(() => {
	searchBitcoinProjects(query, startDate);
});
</script>

<h1>GitHub Repositories</h1>
<ul>
	{#each githubResults as repo}
		<li>
			<a href={repo.url} target="_blank">{repo.name}</a>
			<p>{repo.description}</p>
			<p>Last updated: {new Date(repo.lastPushed).toLocaleDateString()}</p>
		</li>
	{/each}
</ul>

<h2>Web Search Results</h2>
<p>{webResults}</p>
