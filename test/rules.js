module.exports = [
  {
    'type': 'helper',
    'id': 'test-helper',
    'name': 'Test Helper',
    'matcher': 'test-helper',
    'noParams': true,
    'styles': {
      'cursor': 'pointer'
    }
  },
  {
    'type': 'pattern',
    'id': 'test-pattern',
    'name': 'Test Pattern',
    'matcher': 'TestPattern',
    'allowParamToValue': false,
    'styles': {
      'background-repeat': '$0'
    },
    'arguments': [{
      'n': 'no-repeat'
    }]
  }
]
