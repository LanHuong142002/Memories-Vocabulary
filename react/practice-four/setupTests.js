const dotenv = require('dotenv');
const result = dotenv.config({ path: '.env.test' });

if (result.error) {
  throw result.error;
}
