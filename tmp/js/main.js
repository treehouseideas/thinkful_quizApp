(function() {
    var questions = [{"text": "Which of the following choices are functions of government?", "options": ["Establishing justice", "Providing for the common defense", "Promoting the general welfare", "All of these"], "answer": "All of these", "explanation": "There are five types of functions of government: establishing justice, ensuring domestic tranquility, providing for the common defense, promoting the general welfare, and securing the blessings of liberty. All of these are from the Constitution and should be used properly."}, {"text": "Which of the following choices is not a type of government?", "options": ["Political", "Monarchy", "Totalitarianism", "Democracy"], "answer": "Political", "explanation": "Monarchy is a form of government in which power is vested in hereditary kings and queens. Totalitarianism is a system in which leaders have unlimited power in a particular religion, while individuals have no personal rights. Oligarchy is a system in which a group of elites rule society. Democracy is a system of government that gives power to the people."}, {"text": "Which of the following choices is not a basic principle of the Constitution?", "options": ["Federalism", "Separation of powers", "Federalists", "Checks and balances"], "answer": "Federalists", "explanation": "Federalism is power and/or responsibility divided between the national and state governments. Separation of powers are three branches of government (legislative, executive, and judicial). Checks and balances are a government structure that gives each of the three branches of government some degree of oversight and control over the actions of the others."}, {"text": "Which of the following methods are used to change the Constitution?", "options": ["Both proposal and ratification", "Proposal", "Ratification", "None of these"], "answer": "Both proposal and ratification", "explanation": "A proposal for a certain amendment must be either be presented and approved in both houses of Congress, and ratification is either by legislatures in 3/4 of the states or by conventions in 3/4 of the states."}, {"text": "Which of the following powers are not included in the Enumerated Powers?", "options": ["Taxation", "Liberty", "Coinage of Money", "Regulation of Commerce"], "answer": "Liberty", "explanation": "Enumerated powers are the 17 specific powers granted to Congress under Article 1, Section 8, of the U.S. Constitution. These powers include taxation, coinage of money, regulation of commerce, and the authority to provide for a national defense."}, {"text": "By whom was the Bill of Rights proposed?", "options": ["Federalists", "Citizens", "Federal Grants", "Anti-Federalists"], "answer": "Anti-Federalists", "explanation": "The Bills of Rights are the first ten amendments of the Constitution, and the Anti-Federalists proposed it to protect individual rights. The Federalists opposed it as unnecessary."}, {"text": "Libels are false written statements tending to call someone's reputation into disrepute.", "options": ["True", "False"], "answer": "True", "explanation": "There are four types of unprotected speech and publications. Libels are false written statements, slanders are untrue spoken statements, fighting words tend to incite an immediate breach of peace, and obscenities are materials that are utterly without redeeming social importance."}, {"text": "Which of the following choices is not an American legal system?", "options": ["Trial Courts", "Plessy Courts", "Appellate Courts", "Supreme Court"], "answer": "Plessy Courts", "explanation": "There are three courts of American legal system. Trial Courts are courting of original jurisdiction where cases begin. Appellate Courts are courting that generally review only findings of law made by lower courts. The Supreme Court is the last resort at the top of the judicial pyramid."}];
    var UP = 38,
        DOWN = 40,
        ENTER = 13,
        ESCAPE = 27,
        counter = 0,
        quizOver = false,
        resetCounter = 0,
        scoreNode = $('#score'),
        actionButton = $('#submit'),
        answersBlock = $('.answers'),
        questionTitle = $('.question h2'),
        errorMessage = $('#error_message'),
        questionNumber = $('#question_number'),
        controlsMessage = $('#controls_message'),
        answerTemplate = $('#answer_template').text(),
        results = {answers: [], currentScore: 0},
        wrap = function(tag, text) {
            return '<{{0}}>{{1}}</{{0}}>'.replace(/\{\{0\}\}/g, tag)
                .replace(/\{\{1\}\}/g, text);
        },
        calculateScore = function(answers) {
            var correctCount = 0;
            answers.map(function(value, index) {
                if (value) correctCount += 1;
            });
            return Math.round(100 * correctCount / answers.length);
        },
        resetQuiz = function() {
            if (resetCounter++ > 1 || quizOver || confirm('Are you sure you want to reset the quiz?')) {
                counter = 0;
                quizOver = false;
                results = {count: 0, answers: [], currentScore: 0};
                scoreNode.addClass('no_score').text('');
                nextQuestion();
            }
        },
        showResults = function() {
            answersBlock.empty();
            questionTitle.text('You answered ' + results.currentScore + '% of '
                + 'the questions correctly.');
            quizOver = true;
            actionButton.text('Play again');
            scoreChart();
        },
        scoreChart = function() {
            var data = [{name: 'You', score: results.currentScore}];
            var quizDB = new Firebase('');
            quizDB.once('value', function(scores) {
                var sum = 0,
                    count = 0,
                    currentAverage = 0,
                    currentScores = scores.val();
                for (var i in currentScores) {
                    if (currentScores.hasOwnProperty(i)) {
                        count += 1;
                        sum += currentScores[i];
                    }
                }
                currentAverage = sum / count;
                quizDB.push(results.currentScore);
                data.push({name: 'Everyone else', score: currentAverage});
                drawChart('.answers', data);
                $('.chart').show('slide', {direction: 'right'}, 400);
            });
        },
        inputCheck = function() {
            if ($('.answer_radio:checked').length) {
                transitionEffect(gradeQuestion);
            } else {
                overlayMessage(errorMessage, {borderRadius: '3px', width: '35%', left: '32%'}, 2000);
            }
        },
        overlayMessage = function(message, css, timeout) {
            $.blockUI({ message: message, css: css });
            if (timeout) {
                setTimeout(function() {
                    $.unblockUI();
                }, timeout);
            }
        },
        transitionEffect = function(func) {
            $('.question').hide('slide', {direction: 'left'}, 200, function() {
                func();
                $('.question').show('slide', {direction: 'right'}, 200);
            });
        },
        dispatchAction = function() {
            var action = actionButton.text();
            if (action === 'Answer') {
                inputCheck();
            } else if (action === 'Next question') {
                transitionEffect(nextQuestion);
            } else if (action === 'Play again') {
                transitionEffect(resetQuiz);
            } else {
                transitionEffect(showResults);
            }
        },
        gradeQuestion = function() {
            var chosenAnswer = $('.answer_radio:checked + .answer').text(),
                correctAnswer = questions[counter-1].answer,
                explanation = questions[counter-1].explanation,
                correct = chosenAnswer === correctAnswer,
                correctText = correct ? 'Correct! ' : 'Incorrect! The correct answer was ';

            results.answers.push(correct);
            results.currentScore = calculateScore(results.answers);

            scoreNode.removeClass('no_score')
                .text(results.currentScore + '% correct');
            questionTitle.html(correctText + wrap('span', correctAnswer)).addClass('show_answer');
            answersBlock.text(explanation);
            if (counter === questions.length) {
                actionButton.text('See results');
            } else {
                actionButton.text('Next question');
            }
        },
        nextQuestion = function() {
            var questionDetails = questions[counter];
            questionNumber.text((counter+1) + ' of ' + questions.length);
            questionTitle.text(questionDetails.text).removeClass('show_answer');
            answersBlock.empty();
            actionButton.text('Answer');
            for (var i = 0; i < questionDetails.options.length; i++) {
                var newQuestion = answerTemplate
                  .replace(/{{id}}/g, 'answer' + i)
                  .replace('{{text}}', questionDetails.options[i]);
                answersBlock.append($(newQuestion));
            }
            counter++;
        },
        controlsHelp = function() {
            $.blockUI({
                message: controlsMessage,
                css: { borderRadius: '3px',
                       width: '65%',
                       top: '20%',
                       left: '17%' },
                onBlock: function() {
                    $(document).click(function() {
                        $.unblockUI();
                        $(document).unbind('click');
                    });
                }
            });
        },
        keydownListener = function(e) {
            // Remove message if present
            if ($('.blockMsg:visible').length) {
                e.preventDefault();
                $.unblockUI();
                return;
            }
            if (e.keyCode === ENTER) {
                e.preventDefault();
                dispatchAction();
            } else if (e.keyCode === UP || e.keyCode === DOWN) {
                e.preventDefault();
                var answerCount = $('.answer_radio').length;
                if ($('.answer_radio:checked').length) {
                    var checkedID = $('.answer_radio:checked').attr('id'),
                        id = parseInt(checkedID.substring(6)),
                        direction = (e.keyCode === UP) ? -1 : 1;
                    // move ID number to next in answer range
                    id = (id + direction + answerCount) % answerCount;
                    $('#answer' + id).prop('checked', true);
                } else if (e.keyCode === DOWN) {
                    $('#answer0').prop('checked', true);
                } else if (e.keyCode === UP) {
                    $('#answer' + (answerCount - 1)).prop('checked', true);
                }
            }
        };

    $('#reset').click(resetQuiz);
    $('#controls_help').click(controlsHelp);
    actionButton.click(dispatchAction);
    $(document).keydown(keydownListener);

    // Load first question
    nextQuestion();


    // Draw d3.js chart with score data
    function drawChart(elementSelector, data) {

        var dataHeight = 55 * data.length;
        var chartHeight = dataHeight + (data.length - 1) * 5 + 5;
        var rangeHeight = 48 * data.length;

        var chart = d3.select(elementSelector).append('svg')
            .attr('class', 'chart')
            .attr('width', '100%')
            .attr('height', chartHeight)
          .append('g')
            .attr('transform', 'translate(10,20)');

        var x = d3.scale.linear()
            .domain([0, 100])
            .range(['0px', '90%']);

        var y = d3.scale.ordinal()
            .domain(d3.range(data.length))
            .rangeBands([0, rangeHeight]);

        var halfBarHeight = y.rangeBand() / 2;

        function barY(d, idx) {
            return y(idx) + idx * 5;
        }
        function barLabelY(d, idx) {
            return barY(d, idx) + halfBarHeight;
        }

        // Range lines
        chart.selectAll('line')
            .data(x.ticks(10))
          .enter().append('line')
            .attr('x1', x)
            .attr('x2', x)
            .attr('y1', 0)
            .attr('y2', dataHeight)
            .style('stroke', '#ccc');

        // Bars
        chart.selectAll('rect')
            .data(data)
          .enter().append('rect')
            .attr('y', barY)
            .attr('width', function(d) { return x(d.score); })
            .attr('height', y.rangeBand());

        // Bar labels
        chart.selectAll('text')
            .data(data)
          .enter().append('text')
            .attr('x', 0)
            .attr('y', barLabelY)
            .attr('dx', 5)
            .attr('dy', '.35em')
            .attr('text-anchor', 'start')
            .text(function(d) { return d.name; });

        // Range marker numbers
        chart.selectAll('.rule')
            .data(x.ticks(10))
          .enter().append('text')
            .attr('class', 'rule')
            .attr('x', x)
            .attr('y', 0)
            .attr('dy', -3)
            .attr('text-anchor', 'middle')
            .text(String);

        // Solid left line
        chart.append('line')
            .attr('y1', 0)
            .attr('y2', 120)
            .style('stroke', '#000');
    }
}());