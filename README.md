# 📊 投資ポートフォリオダッシュボード

これは、保有資産の配分や金額を可視化するためのポートフォリオ管理用ダッシュボードです。
日本株・米国株・投資信託・ゴールド・現金（円・ドル）などの資産カテゴリごとに、投資状況を一目で把握できます。

## 🚀 主な機能

- 📈 円グラフによる資産配分のビジュアル表示
- 🪙 資産カテゴリ：日本株、米国株、投資信託、ゴールド、現金（円・ドル）
- 💹 投資金額と割合の同時表示
- 🖥️ ブラウザから簡単にアクセス可能（PC／スマホ対応）
- 📝 手動でのデータ入力に対応（シンプルな記録・シミュレーションにも最適）

## 📷 デモ動画

![My Image](image/demo.gif)

## 🛠️ 技術スタック

- **フロントエンド**：Streamlit（または React）
- **使用言語**：Python
- **グラフ描画**：Matplotlib / Plotly / Altair
- **データ入力**：Webフォームから手動入力

## 🧪 使い方

1. リポジトリをクローン
   ```bash
   git clone https://github.com/nori07-dev/investment-portfolio-dashboard.git
   cd investment-portfolio-dashboard

2. 必要なライブラリをインストール
   ```bash
   pip install -r requirements.txt

3. アプリを起動
   ```bash
   streamlit run app.py \

4. アプリで起動
   ```bash
   http://localhost:8501 にアクセス