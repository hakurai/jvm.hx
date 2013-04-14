package javap;
import jvm.klass.ConstantPoolInfo;
import jvm.klass.Klass;
import internal.html.DataView;
class ClassFileParser {

    var source:ClassSource;
    var klass:Klass;

    public function new(source:ClassSource) {
        klass = new Klass();
        this.source = source;
    }

    public function parse():Klass {
        readMagic();
        readMinorVersion();
        readMajorVersion();
        readConstantPoolCount();
        readConstantPool();
        readAccessFlags();
        readThisClass();
        readSuperClass();
        readInterfacesCount();
        readInterfaces();
        readFieldsCount();
        readFields();

        return klass;
    }

    function readMagic():Void {
        klass.magic = source.readU4();
    }

    function readMinorVersion():Void {
        klass.minorVersion = source.readU2();
    }

    function readMajorVersion():Void {
        klass.majorVersion = source.readU2();
    }

    function readConstantPoolCount():Void {
        klass.constantPoolCount = source.readU2();
    }

    function readConstantPool():Void {
        var count = klass.constantPoolCount;

//First ConstantPoolInfo is reserved by JVM
        klass.constantPool.push(ConstantPoolInfo.Empty);

        var constantPoolParser = new ConstantPoolParser(source);

        var i = 0;
        while (i < count) {
            var info = constantPoolParser.readConstantPoolInfo();
            klass.constantPool.push(info);
            switch(info){
                case LongInfo(tag, h, l), DoubleInfo(tag, h, l):
                    klass.constantPool.push(ConstantPoolInfo.Empty);
                    i++;
                default:
            }
        }
    }


    function readAccessFlags():Void {
        klass.accessFlags = source.readU2();
    }

    function readThisClass():Void {
        klass.thisClass = source.readU2();
    }

    function readSuperClass():Void {
        klass.superClass = source.readU2();
    }

    function readInterfacesCount():Void {
        klass.interfacesCount = source.readU2();
    }

    function readInterfaces():Void {
        var count = klass.interfacesCount;
        for (i in 0...count) {
            klass.interfaces.push(source.readU2());
        }
    }

    function readFieldsCount():Void {
        klass.fieldsCount = source.readU2();
    }

    function readFields():Void {
        var count = klass.fieldsCount;
        for (i in 0...count) {
            klass.fields.push(readFieldInfo());
        }
    }

    function readFieldInfo():FieldInfo {
        var accessFlags = source.readU2();
        var nameIndex = source.readU2();
        var descriptorIndex = source.readU2();
        var attributeCount = source.readU2();
        var attributes = new Array<AttributeInfo>();

        var attributeParser = new AttributeParser(source, klass.constantPool);
        for (i in 0...attributeCount) {
            attributes.push(attributeParser.readAttribute());
        }

        return{
        accessFlags: accessFlags,
        nameIndex:nameIndex,
        descriptorIndex:descriptorIndex,
        attributeCount:attributeCount,
        attributes:attributes
        };
    }


}
