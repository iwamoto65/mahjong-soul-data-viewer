## 概要
オンライン麻雀ゲーム「雀魂」の牌譜をデータとして変換し、閲覧や分析を楽しめるプロダクトです。本プロダクトは初心者から上級者まで幅広いユーザーが、自分の目的に合ったデータを見つけることができるように設計されています。  
※「雀魂」のアカウントをお持ちの方であれば、どなたでもご利用いただけます。

![paifu-trans](https://github.com/iwamoto65/github-images/raw/main/paifu-trans.png)
## 機能
- 牌譜の読み取りとデータ変換
  - 戦績、対局モード、獲得ポイント、対局相手の情報
- プレイヤー選択
- 得点推移グラフ
- 戦績のスプレッドシート出力

## 使用技術
### フロントエンド
- Next.js
- TypeScript
### 認証
- Auth.js(旧NextAuth.js)
### インフラ
- Vercel
- Google API
### スタイル・UI
- Material UI
- styled-components
- react-tabs
### テスト
- jest
- React Testing Library

## システム構成
![flowchart](https://github.com/iwamoto65/github-images/raw/main/mahjong-data-viewer-site.png)
