# AI-p（AIパートナーサイト）

このリポジトリは、AIパートナーのWebサイト実装です。

## ディレクトリ構成
```
AI-p/
  .github/workflows/      # 自動デプロイ設定
  auth/                   # 認証（登録/ログイン）
  chat/                   # チャット関連アセット（必要なら分離）
  ga/                     # 画像・素材
  paid/                   # 有料案内/購入
  profile/                # 各キャラクターのプロフィールページ
  index.html
  matching.html
  chat.html
  characters.json
  chatScript.json
  style.css               # 共通スタイル（軽量）
```
## 相対パスのルール
- **ルートHTML**（`index.html`, `matching.html`, `chat.html` 等）からの参照は `./` を使う  
  例: `./ga/image/...`
- **サブディレクトリ**（`paid/`, `auth/`, `profile/` 等）からの参照は `../` を使う  
  例: `../ga/image/...`

## HTMLの共通要素
- すべての主要ページに**共通ナビ**を挿入（TOP / 一覧 / チケット / 登録 / チャット）
- `<meta name="viewport" content="width=device-width, initial-scale=1">` を必ず入れる

## CSSポリシー（軽量）
- 共通スタイルは `style.css` に集約
- ページ固有の調整は各ページ内の `<style>` または専用CSSに切り出す
- 将来の分割方針: `styles/base.css`（共通） + `styles/chat.css`（チャット専用） など

## ローカル開発
- JSONをfetchするページ（`chat.html`）は **HTTPサーバ** で開く必要があります  
  例: `npx serve` → `http://localhost:3000/index.html`
- `file://` 直開きだと `fetch` が失敗します（画面にも警告を表示）

## デプロイ
- `.github/workflows/` の設定に合わせてデプロイ（詳細は各YAMLを参照）
- 秘密情報（APIキー等）は必ずリポジトリSecretsへ

## 今後の拡張
- Firebase Authentication / Firestore / Stripe の導線を `auth/` / `paid/` に追加
- 価格ID・公開キーは `.env` ではなく**環境変数**/Secretsから読み込む
