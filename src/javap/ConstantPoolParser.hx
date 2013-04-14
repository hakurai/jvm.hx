package javap;
import internal.html.DataView;
import jvm.klass.Klass.ConstantPoolInfo;
class ConstantPoolParser {

    var source:ClassSource;

    public function new(source:ClassSource) {
        this.source = source;
    }

    public function readConstantPoolInfo():ConstantPoolInfo {
        var tag = source.readU1();
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
            } else if (b <= 0xe0) {
                i++;
                c = ((source.readU1() & 0x1f) << 6) | 0x0800;
                i++;
                c += source.readU1() & 0x3f;
                bytes.addChar(c);
            } else {
                c = ((b & 0x0f) << 12);
                i++;
                c += (source.readU1() & 0x3f) << 6;
                i++;
                c += source.readU1() & 0x3f;
                bytes.addChar(c);
            }
            i++;
        }
        return ConstantPoolInfo.Utf8Info(tag, length, bytes.toString());
    }

    inline function readConstantInteger(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.IntegerInfo(tag, source.readU4());
    }

    inline function readConstantFloat(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.FloatInfo(tag, source.readU4());
    }

    inline function readConstantLong(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.LongInfo(tag, source.readU4(), source.readU4());
    }

    inline function readConstantDouble(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.DoubleInfo(tag, source.readU4(), source.readU4());
    }

    inline function readConstantClass(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.ClassInfo(tag, source.readU2());
    }

    inline function readConstantString(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.StringInfo(tag, source.readU2());
    }

    inline function readConstantFieldref(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.FieldrefInfo(tag, source.readU2(), source.readU2());
    }

    inline function readConstantMethodref(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.MethodrefInfo(tag, source.readU2(), source.readU2());
    }

    inline function readConstantInterfaceMethodref(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.InterfaceMethodrefInfo(tag, source.readU2(), source.readU2());
    }

    inline function readConstantNameAndType(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.NameAndTypeInfo(tag, source.readU2(), source.readU2());
    }


    inline function readConstantMethodHandle(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.MethodHandleInfo(tag, source.readU1(), source.readU2());
    }

    inline function readConstantMethodType(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.ConstantMethodTypeInfo(tag, source.readU2());
    }

    inline function readConstantInvokeDynamic(tag:Int):ConstantPoolInfo {
        return ConstantPoolInfo.ConstantInvokeDynamicInfo(tag, source.readU2(), source.readU2());
    }
}
