PROJECT_NAME = helloworld
COMPILED_FILENAME = game.js

game: deps compile

deps:
	python bin/lime.py update

compile:
	python bin/lime.py build $(PROJECT_NAME) -o $(PROJECT_NAME)/compiled.js

copy_compiled: 
	cp $(PROJECT_NAME)/compiled.js ../app/assets/javascripts/$(COMPILED_FILENAME) 

copy_assets: $(PROJECT_NAME)/assets
	cp -r $(PROJECT_NAME)/assets/* ../app/assets/images

copy: copy_compiled copy_assets

all: game copy


