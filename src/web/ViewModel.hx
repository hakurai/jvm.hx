package web;
import jvm.klass.AttributeInfo;
import jvm.klass.ConstantPoolInfo;
import knockout.Knockout;
import jvm.klass.Klass;
import knockout.ObservableArray;
import knockout.Observable;

@:keep
class ViewModel {

    public var klass:Klass;
    public var minorVersion:Observable<Int>;
    public var majorVersion:Observable<Int>;
    public var constantPoolCount:Observable<Int>;
    public var accessFlags:Observable<Int>;
    public var thisClass:Observable<Int>;
    public var superClass:Observable<Int>;
    public var constantPool:ObservableArray<ConstantPoolInfo>;
    public var interfacesCount:Observable<Int>;
    public var interfaces:ObservableArray<Int>;
    public var fieldsCount:Observable<Int>;
    public var fields:ObservableArray<FieldInfo>;
    public var methodsCount:Observable<Int>;
    public var methods:ObservableArray<MethodInfo>;
    public var attributesCount:Observable<Int>;
    public var attributes:ObservableArray<AttributeInfo>;

    public function new() {
        minorVersion = Knockout.observable();
        majorVersion = Knockout.observable();
        constantPoolCount = Knockout.observable();
        accessFlags = Knockout.observable();
        thisClass = Knockout.observable();
        superClass = Knockout.observable();
        constantPool = Knockout.observableArray();
        interfacesCount = Knockout.observable();
        interfaces = Knockout.observableArray();
        fieldsCount = Knockout.observable();
        fields = Knockout.observableArray();
        methodsCount = Knockout.observable();
        methods = Knockout.observableArray();
        attributesCount = Knockout.observable();
        attributes = Knockout.observableArray();
    }

    public function elementValueTemplate(tag:Int):String {
        switch (tag) {
            case 0x42, // B byte
            0x43, // C char
            0x44, // D double
            0x46, // F float
            0x49, // I int
            0x4a, // J long
            0x53, // S short
            0x5a, // Z boolean
            0x73: // s String
                return 'elementValue-other';

            case 0x65: // e enum
                return 'elementValue-enum';

            case 0x63: // c class
                return 'elementValue-class';

            case 0x40: // @ annotation
                return 'elementValue-annotation';

            case 0x5b: // [ array
                return 'elementValue-array';

            default:
                throw 'LinkageError';


        }
    }

    public function getConstantPoolTemplateName(info:Array<Dynamic>):String {
        return if (info.length > 2) {
            "constant-" + info[2].tag;
        } else {
            "constant-empty";
        }
    }

    public function unwrapEnum(info:Array<Dynamic>):Dynamic {
        return info[2];
    }

    public function getConstantUTF8Value(index:Int):String {
        var pool = constantPool.get();
        return switch(pool[index]){
            case ConstantPoolInfo.Utf8Info(body):
                body.bytes;
            default:
                "";

        }
    }

    public function getConstantType(tag:Int):String {
        return switch (tag) {
            case 1:
                'CONSTANT_Utf8';
            case 3:
                'CONSTANT_Integer';
            case 4:
                'CONSTANT_Float';
            case 5:
                'CONSTANT_Long';
            case 6:
                'CONSTANT_Double';
            case 7:
                'CONSTANT_Class';
            case 8:
                'CONSTANT_String';
            case 9:
                'CONSTANT_Fieldref';
            case 10:
                'CONSTANT_Methodref';
            case 11:
                'CONSTANT_InterfaceMethodref';
            case 12:
                'CONSTANT_NameAndType';
            case 15:
                'CONSTANT_MethodHandle';
            case 16:
                'CONSTANT_MethodType';
            case 18:
                'CONSTANT_InvokeDynamic';
            default :
                '';

        }

    }

    public function getConstantHref(index:Int) {
        return '#constant' + index;
    }
}
