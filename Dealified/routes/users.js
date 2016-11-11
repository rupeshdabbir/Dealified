var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
    var json = [{ id: 1, author: 'Morgan McCircuit', body: 'Great picture!', img: [ {src:'https://placeholdit.imgix.net/~text?txtsize=33&txt=400×300&w=380&h=265'},
        {src:'https://placeholdit.imgix.net/~text?txtsize=33&txt=400×300&w=380&h=265'},{src:'https://placeholdit.imgix.net/~text?txtsize=33&txt=400×300&w=380&h=265'}
    ]},
        { id: 2, author: 'Bending Bender', body: 'Excellent stuff', img: [ {src:'https://placeholdit.imgix.net/~text?txtsize=33&txt=400×300&w=380&h=265'},
            {src:'https://placeholdit.imgix.net/~text?txtsize=33&txt=400×300&w=380&h=265'}
        ]}];
  
  res.send(json);
});

module.exports = router;
