# ポートフォリオ管理ダッシュボード / Portfolio Management Dashboard

## 📊 概要 - Overview

**日本語**
- 保有資産の配分や金額を可視化するためのポートフォリオ管理用ダッシュボードです。
- 日本株・米国株・投資信託・ゴールド・現金（円・ドル）などの資産カテゴリごとに、投資状況を一目で把握できます。

**English**
- A portfolio management dashboard for visualizing asset allocation and amounts.
- Allows you to grasp your investment status at a glance by asset categories such as Japanese stocks, US stocks, mutual funds, gold, and cash (JPY・USD).

## 📷 デモ動画 - Demo Video
![My Image](image/demo.gif)

## ✨ 主な機能 - Key Features

**日本語**
- **📈 円グラフによる資産配分のビジュアル表示**: 保有資産を視覚的に把握
- **🪙 多様な資産カテゴリ**: 日本株、米国株、投資信託、ゴールド、現金（円・ドル）
- **💹 投資金額と割合の同時表示**: 金額と配分比率を一画面で確認
- **🖥️ レスポンシブデザイン**: PC・スマホ・タブレット対応
- **📝 手動データ入力**: シンプルな記録・シミュレーションに最適
- **🎨 インタラクティブグラフ**: Plotlyによる動的な可視化

**English**
- **📈 Visual Asset Allocation Display**: Visualize holdings with pie charts
- **🪙 Diverse Asset Categories**: Japanese stocks, US stocks, mutual funds, gold, cash (JPY・USD)
- **💹 Simultaneous Amount and Percentage Display**: View amounts and allocation ratios on one screen
- **🖥️ Responsive Design**: Compatible with PC, mobile, and tablet
- **📝 Manual Data Input**: Ideal for simple recording and simulation
- **🎨 Interactive Charts**: Dynamic visualization with Plotly

## 🛠️ 技術スタック - Tech Stack

### フロントエンド - Frontend
- **Framework**: Streamlit
- **Language**: Python
- **Charts**: Plotly / Matplotlib / Altair
- **UI Components**: Streamlit Widgets
- **Responsive Design**: Streamlit's built-in responsive layout

### データ管理 - Data Management
- **Input Method**: Manual entry via web forms / Webフォームによる手動入力
- **Storage**: Session state / セッション状態
- **Format**: Python dictionaries and DataFrames

### 可視化 - Visualization
- **Chart Library**: Plotly Express
- **Chart Types**: Pie charts, bar charts / 円グラフ、棒グラフ
- **Interactivity**: Hover effects, zoom, pan / ホバー効果、ズーム、パン

## 🚀 セットアップ - Setup

### 前提条件 - Prerequisites
- Python 3.8 以上 / or higher
- pip パッケージマネージャー / package manager

### インストール手順 - Installation Steps
```bash
# リポジトリをクローン / Clone the repository
git clone https://github.com/nori07-dev/investment-portfolio-dashboard.git
cd investment-portfolio-dashboard

# 依存関係をインストール / Install dependencies
pip install -r requirements.txt

# アプリを起動 / Start the application
streamlit run app.py
```

### 依存関係 - Dependencies
```txt
streamlit>=1.28.0
plotly>=5.15.0
pandas>=2.0.0
numpy>=1.24.0
```

## 📱 使い方 - How to Use

### 1. アプリケーション起動 - Application Launch

**日本語**
1. ターミナルで `streamlit run app.py` を実行
2. ブラウザで http://localhost:8501 にアクセス
3. ダッシュボードが表示されます

**English**
1. Run `streamlit run app.py` in terminal
2. Access http://localhost:8501 in your browser
3. The dashboard will be displayed

### 2. データ入力 - Data Input

**日本語**
各資産カテゴリの金額を入力します：

**English**
Enter amounts for each asset category:

- 日本株 / Japanese Stocks
- 米国株 / US Stocks  
- 投資信託 / Mutual Funds
- ゴールド / Gold
- 現金（円）/ Cash (JPY)
- 現金（ドル）/ Cash (USD)

### 3. 結果確認 - View Results

**日本語**
- **円グラフ**: 資産配分を視覚的に確認
- **詳細表**: 各資産の金額と割合を数値で確認
- **総資産**: 全体の投資金額を把握

**English**
- **Pie Chart**: Visually check asset allocation
- **Detail Table**: View amounts and percentages numerically for each asset
- **Total Assets**: Understand overall investment amount

## 📊 対応資産カテゴリ - Supported Asset Categories

| 資産クラス / Asset Class | 説明 / Description | 通貨 / Currency |
|------------------------|-------------------|----------------|
| 日本株 / Japanese Stocks | 国内株式投資 / Domestic equity investment | JPY |
| 米国株 / US Stocks | 米国株式投資 / US equity investment | USD |
| 投資信託 / Mutual Funds | 投資信託・ETF / Mutual funds & ETFs | JPY/USD |
| ゴールド / Gold | 金投資・貴金属 / Gold investment & precious metals | JPY |
| 現金（円）/ Cash (JPY) | 日本円現金・預金 / Japanese yen cash & deposits | JPY |
| 現金（ドル）/ Cash (USD) | 米ドル現金・預金 / US dollar cash & deposits | USD |

## 🔧 カスタマイズ - Customization

### 新しい資産クラスの追加 - Adding New Asset Classes

**日本語**
1. `app.py` の資産カテゴリリストを編集
2. 入力フォームに新しいフィールドを追加
3. グラフ表示ロジックに新しいカテゴリを組み込み

**English**
1. Edit the asset category list in `app.py`
2. Add new fields to the input form
3. Integrate new categories into graph display logic

### 色設定の変更 - Changing Color Settings
```python
# カスタムカラーパレット / Custom color palette
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
```

## 📈 機能詳細 - Feature Details

### 可視化機能 - Visualization Features

**日本語**
- **円グラフ**: 各資産の割合を視覚的に表示
- **ホバー情報**: マウスオーバーで詳細情報を表示
- **動的更新**: データ変更時にリアルタイムでグラフが更新

**English**
- **Pie Chart**: Visually display percentage of each asset
- **Hover Information**: Show detailed information on mouse over
- **Dynamic Updates**: Real-time graph updates when data changes

### データ管理機能 - Data Management Features

**日本語**
- **セッション保持**: ブラウザセッション中はデータを保持
- **入力検証**: 無効な値の入力を防止
- **自動計算**: 総資産と配分比率を自動算出

**English**
- **Session Persistence**: Retain data during browser session
- **Input Validation**: Prevent invalid value input
- **Auto Calculation**: Automatically calculate total assets and allocation ratios

## ⛔ Streamlitの終了方法 - How to Stop Streamlit

**日本語**
ターミナルで **Ctrl + C** を押してアプリケーションを終了します。

**English**
Press **Ctrl + C** in the terminal to stop the application.

* **Mac / Linux**: `Control + C`
* **Windows**: `Ctrl + C`

### キャッシュクリア - Clear Cache (オプション / Optional)
```bash
streamlit cache clear
```

## 🤝 コントリビューション - Contributing

**日本語**
1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

**English**
1. Fork this repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 補足 - Notes

**日本語**
- 本アプリはデモ目的であり、実際の投資判断には利用しないでください。
- データはブラウザセッション中のみ保持され、永続化されません。
- より高度な機能が必要な場合は、データベース連携の実装を検討してください。

**English**
- This app is for demonstration purposes only and should not be used for actual investment decisions.
- Data is only retained during browser sessions and is not persisted.
- For more advanced features, consider implementing database integration.

## 🙏 謝辞 - Acknowledgments
- [Streamlit](https://streamlit.io/) - Webアプリフレームワーク / Web app framework
- [Plotly](https://plotly.com/) - インタラクティブ可視化ライブラリ / Interactive visualization library
- [Pandas](https://pandas.pydata.org/) - データ分析ライブラリ / Data analysis library
- [NumPy](https://numpy.org/) - 数値計算ライブラリ / Numerical computing library

---
