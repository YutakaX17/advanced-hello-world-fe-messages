# Advanced Hello World Frontend Messages

Independent React and TypeScript feature package providing the Hello World
message page, form, API client, validation feedback, and save confirmation.

## Responsibilities

- Own message request and response types.
- Own the message API client and page behavior.
- Export a typed `ApplicationModule` descriptor.
- Reuse the frontend core's stable module contract.

## Development

Clone the frontend core beside this repository, then run:

```text
workspace/
├── advanced-hello-world-fe-core/
└── advanced-hello-world-fe-messages/
```

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

This repository's `node_modules` is an independent contributor environment.
Full-application integration uses the frontend assembler's dependencies. The
forthcoming manifest installer will select and link both packages
automatically.

This package is selected by the frontend assembler's `modules.json`; developers
do not manually edit application imports.

## Releases and security

Tags use Semantic Versioning. Releases contain the package archive, an SPDX
SBOM, and SHA-256 checksums. See [CONTRIBUTING.md](CONTRIBUTING.md) and
[SECURITY.md](SECURITY.md).

## Repository family

- [Frontend core](https://github.com/YutakaX17/advanced-hello-world-fe-core)
- [Frontend assembler](https://github.com/YutakaX17/advanced-hello-world-fe)
- [Backend messages](https://github.com/YutakaX17/advanced-hello-world-be-messages)
- [Distribution](https://github.com/YutakaX17/advanced-hello-world)
