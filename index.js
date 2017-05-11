require('isomorphic-fetch');
const Ajv = require('ajv');

const remoteSchema = 'http://localhost:3000/schema.json';

const schema = {
  type      : 'object',
  properties: {
    user   : {$ref: remoteSchema},
    comment: {type: 'string'},
  },
};

const ajv = new Ajv({loadSchema: loadSchema});
ajv.compileAsync(schema).then((validate) => {
  const input = {user: {id: 0, name: 'Steve'}, comment: 'Awesome!'};
  console.log('input:', input);
  const valid = validate(input);
  console.log('result:', valid);
});

function loadSchema(uri) {
  return fetch(uri).then((res) => res.json())
}
