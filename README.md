# zendesk のサポートデータを整形+集計してスプレッドシートに吐き出す GAS

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
npm ci
npm run build
```

### デプロイ

```
npm run clasp-login
npm run clasp-deploy
```
