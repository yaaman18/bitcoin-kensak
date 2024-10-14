# Bitcoin Development Project Search / ビットコイン開発プロジェクト検索

## English

### Overview
This project is a web application that allows users to search for Bitcoin development projects. It utilizes the GitHub API to find repositories and OpenAI's API to gather web information about Bitcoin development.

### Features
1. Search for GitHub repositories related to Bitcoin development
2. Retrieve web information about Bitcoin development projects
3. Display search results in a user-friendly interface

### Technical Stack
- Frontend: Svelte
- Backend: SvelteKit
- APIs: GitHub API, OpenAI API

### How it works
1. The user interface is built using Svelte components
2. When the page loads, it automatically searches for Bitcoin development projects
3. The backend API endpoint handles requests to search GitHub and web information
4. Results are displayed on the frontend, showing GitHub repositories and web search results

### Setup
1. Clone the repository
2. Install dependencies with `npm install`
3. Set up environment variables for GITHUB_TOKEN and OPENAI_API_KEY
4. Run the development server with `npm run dev`

### API Endpoints
- GET `/api/bitcoin`: Searches for Bitcoin projects on GitHub and the web

## 日本語

### 概要
このプロジェクトは、ビットコイン開発プロジェクトを検索するためのウェブアプリケーションです。GitHub APIを使用してリポジトリを検索し、OpenAI APIを使用してビットコイン開発に関するウェブ情報を収集します。

### 機能
1. ビットコイン開発に関連するGitHubリポジトリの検索
2. ビットコイン開発プロジェクトに関するウェブ情報の取得
3. 検索結果をユーザーフレンドリーなインターフェースで表示

### 技術スタック
- フロントエンド: Svelte
- バックエンド: SvelteKit
- API: GitHub API, OpenAI API

### 動作の仕組み
1. ユーザーインターフェースはSvelteコンポーネントを使用して構築されています
2. ページ読み込み時に自動的にビットコイン開発プロジェクトを検索します
3. バックエンドのAPIエンドポイントがGitHubとウェブ情報の検索リクエストを処理します
4. 結果はフロントエンドに表示され、GitHubリポジトリとウェブ検索結果が表示されます

### セットアップ
1. リポジトリをクローンします
2. `npm install`で依存関係をインストールします
3. GITHUB_TOKENとOPENAI_API_KEYの環境変数を設定します
4. `npm run dev`で開発サーバーを起動します

### APIエンドポイント
- GET `/api/bitcoin`: GitHubとウェブ上でビットコインプロジェクトを検索します
