.PHONY: lint format test

# roda os linters e checagens
lint:
	flake8 .
	mypy .

# formata o código automaticamente
format:
	black .
	isort .

# roda os testes com cobertura
test:
	PYTHONPATH=. pytest --cov=.

# formata, checa e testa tudo
check:
	make format
	make lint
	make test