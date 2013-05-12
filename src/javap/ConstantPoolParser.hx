package javap;
import internal.html.DataView;
import jvm.klass.ConstantPoolInfo;
class ConstantPoolParser {

    var source:ClassSource;

    public function new(source:ClassSource) {
        this.source = source;
    }

    public function readConstantPoolInfo():ConstantPoolInfo {
        var tag = source.readU1();
        trace(tag);
        var info:ConstantPoolInfo;
        switch(tag){
            case 1:
                info = readConstantUTF8(tag);
            case 3:
                info = readConstantInteger(tag);
            case 4:
                info = readConstantFloat(tag);
            case 5:
                info = readConstantLong(tag);
            case 6:
                info = readConstantDouble(tag);
            case 7:
                info = readConstantClass(tag);
            case 8:
                info = readConstantString(tag);
            case 9:
                info = readConstantFieldref(tag);
            case 10:
                info = readConstantMethodref(tag);
            case 11:
                info = readConstantInterfaceMethodref(tag);
            case 12:
                info = readConstantNameAndType(tag);
            case 15:
                info = readConstantMethodHandle(tag);
            case 16:
                info = readConstantMethodType(tag);
            case 18:
                info = readConstantInvokeDynamic(tag);
            default:
                throw "LinkageError";
        }

        return info;
    }

    inline function readConstantUTF8(tag:Int):ConstantPoolInfo {
        var length = source.readU2();
        var bytes = new StringBuf();

        var i = 0;

        while (i < length) {
            var c;
            var b = source.readU1();

            if (b <= 0x7f) {
                bytes.addChar(b);
            } else if (b <= 0xdf) {
                c = ((b & 0x1f) << 6);
                i++;
                c += source.readU1() & 0x3f;
                bytes.addChar(c);
            } else if (b <= 0xef) {
                c = ((b & 0x0f) << 12);
                i++;
                c += ((source.readU1() & 0x3f) << 6);
                i++;
                c += source.readU1() & 0x3f;
                bytes.addChar(c);
            } else {
                i++;
                c = ((b & 0x0f) << 6);
                i++;
                c += (source.readU1() & 0x3f);
                bytes.addChar(c);

                i++;
                source.readU1();
                i++;
                c = ((b & 0x0f) << 6);
                i++;
                c += (source.readU1() & 0x3f);
                bytes.addChar(c);
            }
            i++;
        }
        return ConstantPoolInfo.Utf8Info({tag:tag, length:length, bytes:bytes.toString()});
    }

    inline function readConstantInteger(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.IntegerInfo({tag:tag, bytes:source.readU4()});
    }

    inline function readConstantFloat(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.FloatInfo({tag:tag, bytes:source.readU4()});
    }

    inline function readConstantLong(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.LongInfo({tag:tag, highBytes:source.readU4(), lowBytes:source.readU4()});
    }

    inline function readConstantDouble(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.DoubleInfo({tag:tag, highBytes:source.readU4(), lowBytes:source.readU4()});
    }

    inline function readConstantClass(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.ClassInfo({tag:tag, nameIndex:source.readU2()});
    }

    inline function readConstantString(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.StringInfo({tag:tag, stringIndex:source.readU2()});
    }

    inline function readConstantFieldref(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.FieldrefInfo({tag:tag, classIndex:source.readU2(), nameAndTypeIndex:source.readU2()});
    }

    inline function readConstantMethodref(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.MethodrefInfo({tag:tag, classIndex:source.readU2(), nameAndTypeIndex:source.readU2()});
    }

    inline function readConstantInterfaceMethodref(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.InterfaceMethodrefInfo({tag:tag, classIndex:source.readU2(), nameAndTypeIndex:source.readU2()});
    }

    inline function readConstantNameAndType(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.NameAndTypeInfo({tag:tag, nameIndex:source.readU2(), descriptorIndex:source.readU2()});
    }


    inline function readConstantMethodHandle(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.MethodHandleInfo({tag:tag, referenceKind:source.readU1(), referenceIndex:source.readU2()});
    }

    inline function readConstantMethodType(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.ConstantMethodTypeInfo({tag:tag, descriptorIndex:source.readU2()});
    }

    inline function readConstantInvokeDynamic(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.ConstantInvokeDynamicInfo({tag:tag, bootstrapMethodAttrIndex:source.readU2(), nameAndTypeIndex:source.readU2()});
    }
}
