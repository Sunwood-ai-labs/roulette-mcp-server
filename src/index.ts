#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

interface SpinRouletteArgs {
  options?: string[];
}

const DEFAULT_OPTIONS = [
  '大吉',
  '中吉',
  '小吉',
  '吉',
  '末吉',
  '凶',
];

const isValidSpinRouletteArgs = (args: any): args is SpinRouletteArgs =>
  typeof args === 'object' &&
  args !== null &&
  (args.options === undefined ||
    (Array.isArray(args.options) &&
      args.options.every((opt: any) => typeof opt === 'string')));

class RouletteServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'roulette-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // エラーハンドリング
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'spin_roulette',
          description: 'ルーレットを回して結果を取得します',
          inputSchema: {
            type: 'object',
            properties: {
              options: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'ルーレットの選択肢（オプション）',
              },
            },
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name !== 'spin_roulette') {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
      }

      if (!isValidSpinRouletteArgs(request.params.arguments)) {
        throw new McpError(
          ErrorCode.InvalidParams,
          'Invalid roulette arguments'
        );
      }

      const options = request.params.arguments.options || DEFAULT_OPTIONS;
      const result = options[Math.floor(Math.random() * options.length)];

      // アニメーション効果のテキストを生成
      const spinAnimation = [
        '🎲 ルーレットを回しています...',
        '🎯 選択中...',
        `✨ 結果は... ${result} です！`,
      ].join('\n');

      return {
        content: [
          {
            type: 'text',
            text: spinAnimation,
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Roulette MCP server running on stdio');
  }
}

const server = new RouletteServer();
server.run().catch(console.error);
