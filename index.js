require('isomorphic-fetch');
const Ajv = require('ajv');

async function loadSchema(uri) {
  const res = await fetch(uri);
  return res.json();
}

async function validateAsync(schema, data) {
  console.log('schema: ', schema);
  console.log('data: ', data);

  const ajv      = new Ajv({loadSchema: loadSchema});
  const validate = await ajv.compileAsync(schema);
  const isValid  = validate(data);
  console.log('isValid: ', isValid);
}

const remoteSchema = 'http://localhost:3000/schema.json';
const schema       = {
  type      : 'object',
  properties: {
    user   : {$ref: remoteSchema},
    comment: {type: 'string'},
  },
};

validateAsync(schema, {user: {id: 0, name: 'Steve'}, comment: 'Awesome!'});
