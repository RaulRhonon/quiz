var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
  	function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};

//GET /quizes
exports.index = function(req, res) { 
console.log('Search:'+ req.query.search); 
  if(req.query.search === '' || req.query.search === undefined){
    //Si no hay parametro search
    models.Quiz.findAll().then(function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes});
    }).catch(function(error){next(error)});
  } else {
    //Si lo hay
    //Tratamos el string
    var searhing = '%' + req.query.search.replace(" ","%") + '%';
    models.Quiz.findAll({where: ["pregunta like ?", searhing]}).then(function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes});
    }).catch(function(error){next(error)});
  }
};

//GET /quizes/question
exports.show = function(req,res){
		res.render('quizes/show', {quiz: req.quiz});

};

//GET /quizes/answer
exports.answer = function(req,res){
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});		
};
