<div align="center">
  <img src="./public/Logo.svg" alt="ロゴ" width="300" />
</div>

## ぐるっと

### コンセプト

現在地に近いお店をすぐに見つけられることのできるアプリ。
お気に入りの店を保存し何度でも通えるようにする。

### こだわったポイント

飲食店を検索するアプリなので暖色を意識して使うようにしたところ。

## 開発環境

### 開発言語

- Type Script

### 環境構築手順

1. リポジトリをクローン

```bash
    git clone https://github.com/Suzune2741/Gurutto.git
```

2. 依存関係のインストール

```bash
    pnpm i
```

3. 開発サーバーの起動

```bash
    pnpm run dev
```

`http://localhost:5173`で動作します。

4. ビルド

```bash
    pnpm run build
```

### デプロイ

#### 本番環境に直接デプロイ

```bash
    pnpm run deploy
```

#### プレビューURLをデプロイ

```bash
    npx wrangler versions upload
```

#### バージョンを本番環境に昇格

```bash
    npx wrangler versions deploy
```

### 対象としている端末

- PC(Windows,MacOS)

## アプリケーション機能

- 飲食店の検索: ホットペッパーグルメリサーチAPIを利用して、現在地周辺の飲食店を検索する。
- レストラン情報取得: ホットペッパーグルメリサーチAPIを使用して、飲食店の詳細情報を取得する.
- お気に入り機能: お気に入り機能により飲食店を保存できる。

### 画面一覧

- トップページ: 飲食店の検索を行う。
- 検索&検索結果画面: 検索結果を一覧表示する。カード表示とリスト表示を選択可能。
- 店舗詳細画面: 店舗の詳細を表示する。
- お気に入り一覧: お気に入りに登録した店舗の一覧を表示する。

### 使用しているAPI,ライブラリ等

- API
  - ホットペッパーグルメサーチAPI
  - Geolocation API
  - localStorage API
  - 国土地理院API
- ライブラリ
  - React
  - React Router(v7)
  - React Icons
  - Tailwind CSS
