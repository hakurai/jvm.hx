package javap;
import jQuery.JQuery;

class Main {

// test
    public static function main() {

        var input = new JQuery("#file");
        input.change(function(event:Dynamic) {
            event.preventDefault();
            var file:Dynamic = event.target.files[0];

            var fileReader:Dynamic = untyped __js__('new FileReader(file)');
            var parser = new ClassFileParser(fileReader);

            parser.parse();


        });


    }


}