# Solana Journal CRUD dApp

A decentralized application (dApp) built on Solana using the Anchor framework, enabling users to perform Create, Read, Update, and Delete (CRUD) operations on journal entries. This project was bootstrapped with `create-solana-dapp` and extends the counter example.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 18)
- [Rust & Cargo](https://www.rust-lang.org/tools/install)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli)
- [Anchor CLI](https://book.anchor-lang.com/getting_started/installation.html) (>= 0.29.0)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## Running the Solana Program Locally

1. **Build the program** (inside the `anchor/` directory):

```bash
anchor build
```

2. **Start the local validator** (from `anchor/target/`):

```bash
solana-test-validator
```

3. **Deploy the program** (back in the `anchor/` directory):

```bash
anchor deploy --provider.cluster localnet
```

4. **Sync keys (if needed)**:

```bash
anchor keys sync
```

If any changes are made, re-run `anchor build` and `anchor deploy`.

Visit [http://localhost:3000/crud](http://localhost:3000/crud) to use the journal CRUD UI.

## Credits

Based on [Solana Developer Bootcamp 2024 - Learn Blockchain and Full Stack Web3 Development - Projects 1-9](https://www.youtube.com/watch?v=amAq-WHAFs8)
