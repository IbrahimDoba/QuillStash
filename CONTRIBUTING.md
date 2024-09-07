# Contribution Guidelines

Thank you for considering contributing to this project! Your help is greatly appreciated.

## Getting Started

To get started, follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top right of this page to create a copy of the repository on your GitHub account.
2. **Clone your fork**: Clone the forked repository to your local machine.

    ```bash
    git clone https://github.com/IbrahimDoba/QuillStash.git
    cd quillstash
    ```

3. **Install dependencies**: Install the required dependencies using `npm` or `yarn`:

    ```bash
    npm install
    # or
    yarn install
    ```

4. **Set up environment variables**: Create a `.env` file in the root of the project and copy the contents of the `.env.example` file.

    ```bash
    cp .env.example .env
    ```

    Replace the URLs with the appropriate values for your local development environment.

5. **Run the development server**: Start the development server to make sure everything is set up correctly:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see your local version of the project.

## Code Style

Please ensure your code follows the existing style conventions and best practices:

- Use **ESLint** and **Prettier** for linting and formatting.
- Follow the **JavaScript Standard Style** for consistent formatting.
- Use **React Hooks** where applicable and prefer functional components over class components.

## Making Changes

1. **Create a branch**: Before making any changes, create a new branch specific to the feature or bug fix you're working on.

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Make changes**: Write your code, test it locally, and make sure it adheres to the project's coding standards.

3. **Commit changes**: Make atomic commits with clear messages explaining your changes.

    ```bash
    git commit -m "Add feature: explanation of what this commit does"
    ```

4. **Push your branch**: Push your changes to your forked repository on GitHub.

    ```bash
    git push origin feature/your-feature-name
    ```

5. **Open a pull request**: Go to the original repository on GitHub and create a new pull request from your forked branch. Make sure to provide a clear description of your changes and any relevant information.

## Reporting Issues

If you find a bug or want to suggest an enhancement, please create an issue [here](https://github.com/ibrahimdoba/quillstash/issues). Make sure to provide a detailed description of the problem or suggestion.

## Community Guidelines

- Be respectful to other contributors.
- Provide constructive feedback in code reviews.
- Help others whenever possible.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE.md).

---

Thank you for your interest in contributing! 🚀
