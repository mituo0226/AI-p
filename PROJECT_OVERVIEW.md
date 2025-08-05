# AIパートナー診断サイト - プロジェクト概要

## 🎯 プロジェクト目的
実在するかのような20名のAIキャラクターたちを使い、ユーザーに“最適なAIパートナー”とのマッチング体験を提供するWebアプリです。質問形式の診断を通じて、性別・年齢・関係性タイプに応じたキャラクターを表示し、感情的な共鳴を重視します。

---

## 📁 構成ディレクトリ・主要ファイル

```
web/AI-p/
├─ index.html               ... トップページ（ランダムなキャラ紹介＋診断導入）
├─ questionnaire.html      ... 診断ページ（質問に応じてURLパラメータ生成）
├─ matching.html           ... 診断結果ページ（メイン・サブキャラ表示）
├─ prof.html               ... キャラクター全員の一覧ページ（画像＋説明）
├─ characters.json         ... キャラ情報（画像・セリフ・動画・職業・性格など）
├─ style.css               ... チャットUI用CSS
├─ ftp-deploy.yml          ... GitHub ActionsによるFTPデプロイ設定
├─ ga/image/character/     ... キャラクター画像（.png）
├─ ga/mov/character/       ... キャラクター動画（.mp4）
├─ ga/image/material/      ... ロゴ画像など素材
```

---

## 💡 使用技術・ライブラリ

- HTML5 / CSS3 / JavaScript（Vanilla）
- Tailwind CSS（CDNから読み込み）
- JSON（キャラデータ構成）
- GitHub Desktop / Actions（デプロイ用）
- Cursor（AI支援エディタ）

---

## 🧠 キャラクター構成（characters.json）

- 男女10名ずつの合計20名
- 各キャラクターは以下の情報を持つ：
  - `name`: 表示名（例：「園田 なな（19歳）」）
  - `img`: プロフィール画像（相対パス）
  - `video`: 動画ファイル（相対パス）
  - `phrase`: 印象的な台詞（matchingで表示）
  - `intro`: 職業・性格の紹介文
  - 今後追加推奨：`id`, `gender`, `age`, `age_label`, `type`, `profile`

---

## 🔁 診断フロー概要

1. `index.html` → 「パートナー診断を始める」ボタンで診断スタート
2. `questionnaire.html` にて5ステップの質問を実施（性別/年齢/求める関係性など）
3. `matching.html` にて、URLパラメータをもとにキャラを自動選出・表示
4. メイン1名＋サブ4名のキャラがカード式に表示
5. 各キャラの `profile.html` へリンク（今後整備）

---

## 🛠 GitHubと連携済

- `ftp-deploy.yml` により、GitHub Actions経由でレンタルサーバーへ自動デプロイ可能（FTP）
- GitHub Desktopを使用してローカル→GitHub同期

---

## ✨ 今後の発展予定（例）

- 各キャラ専用の `profile/xxx.html` を動画付きで整備
- `chat.html` によるAIチャット機能（ポイント制課金）
- セリフ5通の自動表示・切り替え
- Midjourneyでの追加画像や背景の拡張
- JSONへの`chatStyle`, `id`, `voice`, `tags` など追加

---

## 📝 備考
- キャラクター名や画像ファイル名の命名は一貫性を保つこと（例：`miura.png`, `miura.mp4`, `miura.html`）
- JSONとHTMLの間で`id`や`profile`リンクが整合するよう注意

---

作成日：2025年8月  
作成者：ChatGPT（Cursor連携補助用）