# Next.js v14 Template

This is a starter template for building applications using Next.js version 14. The template is pre-configured to work seamlessly with environment variables, authentication, and backend API integration.

## Features

- Next.js v14
- Tailwind CSS
- TypeScript
- Environment variable setup for frontend and backend URLs
- Authentication support using `npx auth secret`

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up authentication secret:**

   ```bash
   npx auth secret
   ```

   Copy the generated secret and paste it into the `AUTH_SECRET` field in the `.env` file.

4. **Configure environment variables:**

   Rename the `.env.local` file to `.env` and update the variables:

   ```env
   # Backend API URL
   NEXT_PUBLIC_BASE_URL_API=https://your-backend-url.com

   # Frontend URL
   NEXT_PUBLIC_BASE_URL=https://your-frontend-url.com

   # Authentication Secret
   AUTH_SECRET=your-generated-auth-secret
   ```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Folder Structure

```
.
├── src/
│   ├── components/       # Reusable components
│   ├── app/              # Application routes
├── .env                  # Environment variables
├── next.config.js        # Next.js configuration
└── tsconfig.json         # TypeScript configuration
```

## Using Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification to maintain consistent commit messages.

### Commit Message Format

Each commit message should include a **type**, an optional **scope**, and a **description**:

```
<type>(<scope>): <description>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

### Example Commit Messages

- `feat(auth): add login functionality`
- `fix(api): resolve timeout issue in fetch requests`
- `docs(readme): update installation steps`

## License

This template is open-source and available under the [MIT License](LICENSE).

Test
