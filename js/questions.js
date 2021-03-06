$(function()
		    {
			
		        $("#quiz-content1").sliding_quiz ({
					'questions':
					[
						{
							'question'	: 'How many states are there in the Union?',
							'answers'	: ['52', '50', '40', '36'],
							'result'	: 2
						},
						{
							'question'	: 'Who was the first president of the United States?',
							'answers'	: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
							'result'	: 3
						},
						{
							'question'	: 'What is the legislative branch of our government?',
							'answers'	: ['The Supreme Court ', 'The President ', 'The Cabinet ', 'Congress'],
							'result'	: 4
						},
						{
							'question'	: 'On July 4, 1776, America declared independence from what country?',
							'answers'	: ['England ', 'France', 'Canada', 'Germany'],
							'result'	: 1
						},
						{
							'question'	: 'What is the national anthem of the United States?',
							'answers'	: ['"America the Beautiful"', '"My Country Tis of Thee"', '"God Bless America"', '"The Star-Spangled Banner"'],
							'result'	: 4
						},
						{
							'question'	: 'Who selects the Supreme Court justices?',
							'answers'	: ['The citizens, by voting', 'The President', 'The Senate', 'The House of Representatives'],
							'result'	: 2
						},
						{
							'question'	: 'For how long do we elect each senator?',
							'answers'	: ['2 years', '4 years', '6 years', '8 years'],
							'result'	: 3
						},
						{
							'question'	: 'What is the supreme law of the United States?',
							'answers'	: ['The Constitution', 'The Declaration of Independence', 'The Supreme Court', 'Congress'],
							'result'	: 1
						},
						{
							'question'	: 'Which countries were our allies during World War II?',
							'answers'	: ['Germany and France', 'France and Japan', 'England and Russia', 'Japan and England'],
							'result'	: 3
						},
						{
							'question'	: 'What are the first 10 amendments to the Constitution called?',
							'answers'	: ['The Rights of Man', 'The Bill of Rights', 'The Preamble', 'The Rights of Citizenship'],
							'result'	: 2
						}
					],
					'locale': //optional
					{
						'msg_not_found' : 'Cannot find questions',
						'msg_please_select_an_option' : 'Please select an option',
						'msg_question' : 'Question',
						'msg_you_scored' : 'You scored',
						'msg_hover_to_review' : 'Hover your mouse over Question button to review your answers',
						'bt_next' : 'Next',
						'bt_back' : 'Back',
						'bt_finish' : 'Finish'
					}
				});	
			});