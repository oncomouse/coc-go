# coc-go

Go language server extension using [`gopls`](https://github.com/golang/go/wiki/gopls)
for [`coc.nvim`](https://github.com/neoclide/coc.nvim).

## Install

In your vim/neovim, run command:

```
:CocInstall coc-go
```

## Features

See [`gopls`](https://github.com/golang/go/wiki/gopls)

## Commands

Additional to commands provided by gopls, this extensions provides these commands:

- `go.install.gopls` Go: Install / Update gopls
- `go.install.gomodifytags` Go: Install / Update gomodifytags
- `go.tags.add` Go: Add Tags To Struct Fields
- `go.tags.add.prompt` Go: Add Tags To Struct Fields (prompt)
- `go.tags.remove` Go: Remove Tags From Struct Fields
- `go.tags.remove.prompt` Go: Remove Tags From Struct Fields (prompt)
- `go.tags.clear` Go: Remove All Tags From Struct Fields
- `go.version` Go: Print extension version

## Configuration options

- `go.enable` set to `false` to disable gopls language server.
- `go.commandPath` absolute path of gopls executable.
- `go.tags.tags` Comma separated tags to be used by `go.tags.add` command
- `go.tags.options` Comma separated tag=options pairs to be used by `go.tags.add` command
- `go.tags.transform` Transformation rule used by `go.tags.add` command to add tags

Trigger completion in `coc-settings.json` to get complete list.

## Development

1. Run `yarn build` or `yarn build:watch`
2. Link extension

```sh
cd ~/github/coc-go          && yarn link
cd ~/.config/coc/extensions && yarn link coc-go
```

3. Add `"coc-go": "*"` to dependencies in `~/.config/coc/extensions/package.json`

## License

[MIT © Josa Gesell](LICENSE)

