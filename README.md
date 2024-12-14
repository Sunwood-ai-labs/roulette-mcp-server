<div align="center">
  <img src="https://raw.githubusercontent.com/Sunwood-ai-labs/roulette-mcp-server/master/assets/header.svg" alt="Roulette MCP Header" width="800">
</div>

# 🎲 Roulette MCP

このMCPサーバーは、ルーレット機能を提供するModel Context Protocolサーバーです。

## 🌟 特徴

- 🎯 シンプルで使いやすいルーレット機能
- 🔄 カスタマイズ可能な選択肢
- ⚡ 高速なレスポンス
- 🎨 美しいアニメーション効果

## 🚀 インストール

```bash
npm install roulette-mcp
```

## 💻 使用方法

MCPサーバーとして使用する場合：

```json
{
  "mcpServers": {
    "roulette": {
      "command": "npx",
      "args": ["roulette-mcp"],
      "env": {}
    }
  }
}
```

## 🛠️ 利用可能なツール

### spin_roulette
ルーレットを回して結果を取得します。

入力スキーマ:
```json
{
  "type": "object",
  "properties": {
    "options": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "ルーレットの選択肢（オプション）"
    }
  }
}
```

## 👥 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m '✨ feat: 素晴らしい機能を追加'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📝 ライセンス

MITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🙏 謝辞

- このプロジェクトは[Model Context Protocol](https://github.com/roovet/model-context-protocol)を使用しています。
- すべてのコントリビューターとユーザーに感謝します。
