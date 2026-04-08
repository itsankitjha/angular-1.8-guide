# AngularJS 1.8 in Production — A Practical Guide for Legacy Systems

This is a comprehensive, engineering-focused documentation site designed to help modern frontend developers navigate, maintain, and eventually migrate legacy AngularJS 1.x applications.

The documentation is built beautifully with [VitePress](https://vitepress.dev/) to ensure high performance and an elegant developer experience.

## View the Documentation

The guide is openly accessible here:
**[https://itsankitjha.github.io/angular-1.8-guide/](https://itsankitjha.github.io/angular-1.8-guide/)**

## Running Locally

To run the documentation site on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/itsankitjha/angular-1.8-guide.git
   cd angular-1.8-guide
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the VitePress dev server:
   ```bash
   npm run docs:dev
   ```

## Contributing to the Guide

This an open-source living document! If you are an engineer managing legacy systems and have found unique architectural solutions, optimizations, or quirks, we would love your input. 

**How to contribute:**
1. **Fork** the repository and create your feature branch: `git checkout -b feature/my-cool-addition`
2. **Edit** the Markdown files situated in the `docs/guide/` directory. If you add a completely new concept, make sure to add it into the Sidebar in `docs/.vitepress/config.mjs`.
3. **Run** the server locally (`npm run docs:dev`) to ensure your markdown renders perfectly and no `{{ }}` interpolation bindings are conflicting with Vue templates.
4. **Commit** your changes: `git commit -m 'Docs: Add detailed section on memory leak origins'`
5. **Push** to the branch and open a Pull Request.

All accepted pull requests will automatically deploy to the live site via GitHub Actions!

## License

This project is licensed under the MIT License.
