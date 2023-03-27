# GAS で Web スクレイピング

### Node.js のバージョンを変更

```
nvm use
```

### 環境変数を設定

```
cp src/env.base.ts src/env.ts
vim src/env.ts
```

### ビルド

```
npm install
npm run build
```

### デプロイ

```
npm run clasp-login
npm run clasp-deploy
```
