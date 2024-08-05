## Getting Started

install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

include the environment variables in your .env file:

```bash
# for connecting to your atlas cluster
MONGO

# for using nextjs authentication
AUTH_SECRET

# for using google sign-in
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# for using as the prefix path of input videos
BEFORE_VIDEO_PREFIX
```

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

You can view "demo_video.mp4" to check out the general features of the application.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
