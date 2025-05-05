# Todo App using Next, TypeScript, and Tailwind CSS

This application was built as part of a coding test with Endpoint.

## Installation
Ensure you have Node.js installed on your system. This project uses `pnpm` as the package manager, but `npm` or `yarn` should work as well.

1. Install dependencies:
```bash
  pnpm install
```
2. Start the development server:
```bash
  pnpm dev
```
3. Open your browser and navigate to `http://localhost:3032` to see the application in action.

## Notes
- I haven’t added unit tests yet because I wasn't sure if they were required for this test.
- Due to the mock API’s limitations, I used local state instead of form actions with `useOptimistic`.
- I’d love to add Add, Edit, and Delete features if API endpoints become available in the future.