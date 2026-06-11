# Visual-Routes-Rails

Railsアプリケーションのルーティングを、ブラウザ上でインタラクティブなツリー構造として視覚化するGemです。

複雑に絡み合ったルーティング定義を、直感的に理解できる美しいツリー図として表示します。開発効率の向上、新しいチームメンバーのオンボーディング、ルーティング構造のドキュメント化に最適です。


## 特徴

### インタラクティブなツリー表示
D3.jsを使用した動的で美しいツリー構造の可視化により、ルーティングの全体像が一目で理解できます。

### 一目で理解
複雑なルーティング定義が、階層的で分かりやすいツリーとして表示されます。

### 軽量で高速
Gemのサイズが小さく、アプリケーションのパフォーマンスに影響を与えません。

### 簡単導入
わずか2ステップで、既存のRailsアプリに統合できます。

### レスポンシブデザイン
PC、タブレット、スマートフォンのあらゆるデバイスで快適に表示されます。

### 開発環境に最適
開発環境でのみ有効にすることで、本番環境への影響はゼロです。

## インストール

### ステップ1: Gemfileに追加
Gemfileを開き、以下の行を追加します。

```ruby
gem 'visual_routes'
```

開発環境のみで使用する場合（推奨）は、以下のように記述します。
```ruby
group :development do
  gem 'visual_routes'
end
```

### ステップ2: 依存関係をインストール
ターミナルで以下を実行します。
```bash
bundle install
```

### ステップ3: ルーティング設定

config/routes.rbを開き、以下を追加します。
```ruby
if Rails.env.development?
  mount VisualRoutes::Engine => "/visual_routes"
end
```
注意: 本番環境でのセキュリティリスクを避けるため、開発環境のみでマウントすることを強く推奨します。


## 使用方法

### 基本的な使い方
1.
Railsアプリケーションを起動します。
```bash
rails server
```
1. ブラウザで以下のURLにアクセスします。

```plain Text
http://localhost:3000/visual_routes
```
1. ルーティングツリーが表示されます 。

### ツリーの見方

- ルートノード
ルート（/）がツリーの最上位として表示されます。

- パスセグメント
パスの各部分がツリーのノードとして表示されます。例えば、/users/editは「/ → users → edit」と階層化されます。

- パラメータ
:idなどのパラメータは{id}のように波括弧で表示されます。

- ルート情報
各ノードをクリックすると、そのパスに関連するHTTPメソッド、コントローラ、アクションが表示されます。

### 例
以下のルーティング定義がある場合を考えます。

```ruby
Rails.application.routes.draw do
  root 'home#index'
  
  resources :users do
    resources :posts
  end
  
  namespace :admin do
    resources :dashboard
  end
end
```

Visual-Routes-Railsは以下のようなツリー構造を表示します。

```plain Text
/
├── users
│   ├── {id}
│   │   └── posts
│   │       └── {post_id}
├── admin
│   └── dashboard
```

## 設定オプション

マウントパスのカスタマイズ
デフォルトでは/visual_routesにマウントされますが、別のパスに変更することができます。

```ruby
# config/routes.rb
mount VisualRoutes::Engine => "/routes_visualizer"
```

この場合、http://localhost:3000/routes_visualizer でアクセスできます 。

### 環境別の設定
開発環境のみでマウントする場合は、以下のように記述します。

```ruby
# config/routes.rb
if Rails.env.development?
  mount VisualRoutes::Engine => "/visual_routes"
end
```
特定のホスト名でのみマウントする場合は、以下のように記述します。

```ruby
# config/routes.rb
mount VisualRoutes::Engine => "/visual_routes", constraints: { host: 'localhost' }
```

## 対応バージョン
| バージョン | Ruby | Rails |
| --- | --- | --- |
| 0.1.0以上 | 2.7以上 | 6.1以上 |


## 動作確認済み環境

以下の環境で動作確認済みです。
- Ruby: 3.0、3.1、3.2
- Rails: 6.1、7.0、7.1
- ブラウザ: Chrome、Firefox、Safari、Edge（最新版）


## 開発への貢献
バグ報告、機能提案、プルリクエストを歓迎します。

### バグ報告
GitHubのIssueで、以下の情報を含めて報告してください。
- エラーメッセージ
- 再現手順
- 使用しているRuby、Rails、ブラウザのバージョン

### 機能提案
GitHubのDiscussionsで、新機能のアイデアを共有してください。

### プルリクエスト
1. このリポジトリをフォークします。
2. 機能ブランチを作成します（git checkout -b feature/amazing-feature）。
3. 変更をコミットします（git commit -m 'Add amazing feature'）。
4. ブランチにプッシュします（git push origin feature/amazing-feature）。
5. プルリクエストを作成します。

## 今後の改善予定

以下の機能を実装予定です。
- 検索・フィルタリング機能: ルート名やコントローラ名で検索
- ズーム・パン機能: マウスホイールやジェスチャーでズーム
- ルート情報の詳細表示: クリックで詳細情報をモーダルで表示
- エクスポート機能: ツリーをPNG、SVGで保存
- 複数Railsバージョン対応テスト: Appraisalを使用した自動テスト
- ダークモード: ダークテーマの実装


## 参考資料
- Rails Routing Guide
https://guides.rubyonrails.org/routing.html

- D3.js Documentation
https://d3js.org/

- Rails Engines Guide
https://guides.rubyonrails.org/engines.html
