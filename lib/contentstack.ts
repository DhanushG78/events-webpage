import Contentstack from 'contentstack';

if (!process.env.NEXT_PUBLIC_API_KEY || !process.env.NEXT_PUBLIC_DELIVERY_TOKEN || !process.env.NEXT_PUBLIC_ENVIRONMENT) {
  console.warn("⚠️ CONTENTSTACK ENVIRONMENT VARIABLES ARE MISSING! The build might fail or generate empty pages.");
}

export const Stack = Contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_API_KEY as string,
  delivery_token: process.env.NEXT_PUBLIC_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT as string,
  region: Contentstack.Region.US,
});
