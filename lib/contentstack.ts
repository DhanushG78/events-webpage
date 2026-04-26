import Contentstack from 'contentstack';

const apiKey = process.env.NEXT_PUBLIC_API_KEY || process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.NEXT_PUBLIC_DELIVERY_TOKEN || process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || process.env.CONTENTSTACK_ENVIRONMENT;
const region = process.env.NEXT_PUBLIC_REGION === 'EU' || process.env.CONTENTSTACK_REGION === 'EU' ? Contentstack.Region.EU : 
               process.env.NEXT_PUBLIC_REGION === 'AZ' || process.env.CONTENTSTACK_REGION === 'AZ' ? Contentstack.Region.AZ : 
               Contentstack.Region.US;

if (!apiKey || !deliveryToken || !environment) {
  console.warn("⚠️ CONTENTSTACK ENVIRONMENT VARIABLES ARE MISSING! The build might fail or generate empty pages.");
}

export const Stack = Contentstack.Stack({
  api_key: apiKey as string,
  delivery_token: deliveryToken as string,
  environment: environment as string,
  region: region,
});
