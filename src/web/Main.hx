package web;
import js.html.Event;
import js.html.XMLHttpRequest;
import web.binding.ByteCodeBinding;
import web.binding.MethodBinding;
import web.binding.ConstantPoolBinding;
import knockout.BindingContext;
import knockout.BindingContext;
import javap.ClassFileParser;
import javap.ClassSource;
import knockout.Knockout;
import knockout.Utils;
import jQuery.JQuery;

class Main {

    var viewModel:ViewModel;

    public static function main() {
        var instance = new Main();
        instance.initBindingHandler();
        instance.init();
        instance.applyBindings();
    }

    function new():Void {
        viewModel = new ViewModel();
    }

    function init():Void {
        new JQuery("#drop")
        .on("dragover", function(event:Dynamic) {
            event.preventDefault();
        })
        .on("drop", function(event:Dynamic) {
            event.preventDefault();
            var file = event.originalEvent.dataTransfer.files[0];
            readFile(file);
        });


        new JQuery("#file")
        .change(function(event:Dynamic) {
            event.preventDefault();
            var file:Dynamic = event.target.files[0];

            readFile(file);
        });

        new JQuery('#getFromURL').on('click', function(){
            var url = new JQuery('#url').val();

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onreadystatechange = function (event:Event) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200 || xhr.status == 0) {
                        readFile(xhr.response);
                    } else {
                        trace(xhr.status);
                    }
                }
            };

            xhr.send(null);


        });

    }

    function applyBindings():Void{
        Knockout.applyBindings(viewModel);
    }


    function readFile(file:Dynamic) {
        var reader = untyped __js__('new FileReader()');
        reader.onload = function(e) {
            var data = e.target.result;
            var source = new ClassSource(data);

            var parser = new ClassFileParser(source);
            var klass = parser.parse();

            viewModel.klass = klass;
            viewModel.minorVersion.set(klass.minorVersion);
            viewModel.majorVersion.set(klass.majorVersion);
            viewModel.constantPoolCount.set(klass.constantPoolCount);
            viewModel.accessFlags.set(klass.accessFlags);
            viewModel.thisClass.set(klass.thisClass);
            viewModel.superClass.set(klass.superClass);
            viewModel.interfacesCount.set(klass.interfacesCount);
            viewModel.fieldsCount.set(klass.fieldsCount);
            viewModel.methodsCount.set(klass.methodsCount);
            viewModel.attributesCount.set(klass.attributesCount);

            viewModel.constantPool.removeAll();
            viewModel.interfaces.removeAll();
            viewModel.fields.removeAll();
            viewModel.methods.removeAll();
            viewModel.attributes.removeAll();

            Utils.arrayPushAll(viewModel.constantPool, klass.constantPool);
            Utils.arrayPushAll(viewModel.interfaces, klass.interfaces);
            Utils.arrayPushAll(viewModel.fields, klass.fields);
            Utils.arrayPushAll(viewModel.methods, klass.methods);
            Utils.arrayPushAll(viewModel.attributes, klass.attributes);
        };

        reader.readAsArrayBuffer(file);
    }

    inline function initBindingHandler():Void {
        Knockout.bindingHandlers.put("constantPool", new ConstantPoolBinding());
        Knockout.bindingHandlers.put("method", new MethodBinding());
        Knockout.bindingHandlers.put("bytecode", new ByteCodeBinding());

    }

}

