import algoliasearch from 'algoliasearch';

const appId = process.env.ALGOLIA_APP_ID || 'placeholder_app_id';
const adminKey = process.env.ALGOLIA_ADMIN_API_KEY || 'placeholder_admin_key';

const client = algoliasearch(appId, adminKey);

export const index = client.initIndex('entrepreneurs');
