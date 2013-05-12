package web.binding;
import jvm.klass.ConstantPoolInfo;
import js.html.Element;
import knockout.BindingContext;
import jQuery.JQuery;
import javap.ByteCodeParser;
import jvm.klass.Klass;

class ByteCodeBinding {
    public function new() {
    }

    public function init(element:Element, valueAccessor:Void -> Dynamic, allBindingsAccessor:Void -> Dynamic, viewModel:Dynamic, bindingContext:BindingContext):Void {
    }

    public function update(element:Element, valueAccessor:Void -> Dynamic, allBindingsAccessor:Void -> Dynamic, viewModel:Dynamic, bindingContext:BindingContext):Void {
        var value = valueAccessor();

        if (value != null) {
            var name = ByteCodeParser.PARSER[value.opcode].name;
            var operand = printOperand(value, bindingContext.root.klass.constantPool);

            new JQuery(element).html(name + '<span class="operand">' + operand + '</span>');
        } else {
            new JQuery(element).text('');
        }
    }


    static function printOperand(bytecode:ByteCode, constantPool:Array<ConstantPoolInfo>):String {
        var op0, op1, op2, op3, index;

        if (bytecode.opcode == 170) {
            return printTableSwitch(bytecode);

        } else if (bytecode.opcode == 171) {
            return printLookupSwitch(bytecode);

        } else if (bytecode.operand.length == 0) {
            return '';

        } else if (bytecode.operand.length == 1) {

            switch (bytecode.opcode) {
                case 16: //bipush
                    return signExtensionByte(bytecode.operand[0]);

                case 18: //ldc
                    op0 = bytecode.operand[0];
                    return printConstantPoolValue(constantPool, op0);

                default:
                    return Std.string(bytecode.operand[0]);
            }

        } else if (bytecode.operand.length == 2) {
            op0 = bytecode.operand[0];
            op1 = bytecode.operand[1];

            switch (bytecode.opcode) {
                case 17, //sipush
                198, //ifnull
                199: //ifnonnull
                    return signExtensionShort(bytecode);

                case 19, //ldc_w
                178, //getstatic
                179, //putstatic
                180, //getfield
                181, //putfield
                182, //invokevirtual
                183, //invokespecial
                184, //invokestatic
                187, //new
                189, //anewarray
                192, //checkcast
                193: //instanceof
                    index = op0 << 8 | op1;
                    return printConstantPoolValue(constantPool, index);

                case 132: //iinc
                    return op0 + '  ' + signExtensionByte(op1);

                case 153, //if<cond>
                154,
                155,
                156,
                157,
                158,
                159, //if_icmp<cond>
                160,
                161,
                162,
                163,
                164,
                167, //goto
                168: //jsr
                    return Std.string(bytecode.pc + (op0 << 8 | op1));

                default:
                    return op0 + ', ' + op1;
            }

        } else if (bytecode.operand.length == 3) {
            op0 = bytecode.operand[0];
            op1 = bytecode.operand[1];
            op2 = bytecode.operand[2];
//multianewarray
            index = op0 << 8 | op1;
            return printConstantPoolValue(constantPool, index) + ', ' + op2;

        } else if (bytecode.operand.length == 4) {
            op0 = bytecode.operand[0];
            op1 = bytecode.operand[1];
            op2 = bytecode.operand[2];
            op3 = bytecode.operand[3];

            switch (bytecode.opcode) {

                case 185, //invokeinterface
                186: //invokedynamic
                    index = op0 << 8 | op1;
                    return printConstantPoolValue(constantPool, index) + ', ' + op2;

                case 200, //goto_w
                201: //jsr_w
                    return Std.string(bytecode.pc + (op0 << 24 | op1 << 16 | op2 << 18 | op3)); //
            }

        }

        return '';

    }

    static function printTableSwitch(bytecode:ByteCode):String {
        var index = bytecode.pc;
        var defaultByteIndex = index + 1;
        var i = 0;
        var operand:Array<Int> = bytecode.operand;

        while (defaultByteIndex % 4 != 0) {
            defaultByteIndex++;
            i++;
        }

        var def = operand[i] << 24 | operand[i + 1] << 16 | operand[i + 2] << 8 | operand[i + 3];
        var low = operand[i + 4] << 24 | operand[i + 5] << 16 | operand[i + 6] << 8 | operand[i + 7];
        var high = operand[i + 8] << 24 | operand[i + 9] << 16 | operand[i + 10] << 8 | operand[i + 11];
        i += 12;

        var offsetArray = new Array<Int>();
        while (i < operand.length) {
            var offset = operand[i++] << 24 | operand[i++] << 16 | operand[i++] << 8 | operand[i++];
            offsetArray.push(offset);
        }

        var print = '<div class="offset-table"> { // ' + low + ' to ' + high + '<br />';

        for (i in 0...offsetArray.length) {
            print += (low + i);
            print += ': ';
            print += (index + offsetArray[i]);
            print += '<br />';
        }
        print += 'default: ';
        print += (index + def);
        print += '<br />';
        print += '}</div>';
        return print;
    }

    static  function printLookupSwitch(bytecode:ByteCode):String {
        var index = bytecode.pc;
        var defaultByteIndex = index + 1;
        var i = 0;
        var pairArray = new Array<Pair>();
        var operand = bytecode.operand;

        while (defaultByteIndex % 4 != 0) {
            defaultByteIndex++;
            i++;
        }

        var def = operand[i] << 24 | operand[i + 1] << 16 | operand[i + 2] << 8 | operand[i + 3];
        var npair = operand[i + 4] << 24 | operand[i + 5] << 16 | operand[i + 6] << 8 | operand[i + 7];
        i += 8;

        while (i < operand.length) {
            var pair = {
            match: operand[i++] << 24 | operand[i++] << 16 | operand[i++] << 8 | operand[i++],
            offset: operand[i++] << 24 | operand[i++] << 16 | operand[i++] << 8 | operand[i++]
            }
            pairArray.push(pair);
        }

        var print = '<div class="offset-table"> { // ' + npair + '<br />';

        for (i in 0...pairArray.length) {
            print += pairArray[i].match;
            print += ': ';
            print += (index + pairArray[i].offset);
            print += '<br />';
        }
        print += 'default: ';
        print += (index + def);
        print += '<br />';
        print += '}</div>';
        return print;
    }

    static function signExtensionByte(op0:Int):String {
        return Std.string(op0 > 127 ? op0 | 0xFFFFFF00 : op0); //Sign extension
    }

    static function signExtensionShort(bytecode:ByteCode):String {
        var short = bytecode.operand[0] << 8 | bytecode.operand[1];

        return Std.string(short > 32768 ? short | 0xFFFF0000 : short); //Sign extension
    }


    static function printConstantPoolValue(constantPool:Array<ConstantPoolInfo>, index:Int):String {
        var value:ConstantPoolInfo = constantPool[index];
        var desc = switch(value){
            case ConstantPoolInfo.ClassInfo(body):
                ' <span class="comment">// Class ' + BindingHelper.escape(printClass(constantPool, body.nameIndex)) + '</span>';

            case ConstantPoolInfo.StringInfo(body):
                ' <span class="comment">// String ' + BindingHelper.escape(printString(constantPool, body.stringIndex)) + '</span>';

            case ConstantPoolInfo.FieldrefInfo(body):
                ' <span class="comment">// Field ' + BindingHelper.escape(printField(constantPool, body.classIndex, body.nameAndTypeIndex)) + '</span>';

            case ConstantPoolInfo.MethodrefInfo(body):
                ' <span class="comment">// Method ' + BindingHelper.escape(printMethodref(constantPool, body.classIndex, body.nameAndTypeIndex)) + '</span>';

            case ConstantPoolInfo.InterfaceMethodrefInfo(body):
                ' <span class="comment">// InterfaceMethod ' + BindingHelper.escape(printMethodref(constantPool, body.classIndex, body.nameAndTypeIndex)) + '</span>';

            default:
                '';
        }

        return constantPoolLink(index) + desc;
    }

    static function printClass(constantPool:Array<ConstantPoolInfo>, nameIndex:Int):String {
        return switch(constantPool[nameIndex]){
            case ConstantPoolInfo.Utf8Info(body):
                body.bytes;

            default:"Error!";
        }
    }

    static function printString(constantPool:Array<ConstantPoolInfo>, stringIndex:Int):String {
        return switch(constantPool[stringIndex]){
            case ConstantPoolInfo.Utf8Info(body):
                body.bytes;

            default:"Error!";
        }
    }

    static function printField(constantPool:Array<ConstantPoolInfo>, classIndex:Int, nameAndTypeIndex:Int):String {
        var className = switch(constantPool[classIndex]){
            case ConstantPoolInfo.ClassInfo(body):
                printClass(constantPool, body.nameIndex);

            default:"Error!";
        }

        var nameAndType = switch(constantPool[nameAndTypeIndex]){
            case ConstantPoolInfo.NameAndTypeInfo(body):
                printNameAndType(constantPool, body.nameIndex, body.descriptorIndex);

            default:"Error!";
        }

        return className + '.' + nameAndType;
    }

    static function printMethodref(constantPool:Array<ConstantPoolInfo>, classIndex:Int, nameAndTypeIndex:Int):String {
        var className = switch(constantPool[classIndex]){
            case ConstantPoolInfo.ClassInfo(body):
                printClass(constantPool, body.nameIndex);

            default:"Error!";
        }

        var nameAndType = switch(constantPool[nameAndTypeIndex]){
            case ConstantPoolInfo.NameAndTypeInfo(body):
                printNameAndType(constantPool, body.nameIndex, body.descriptorIndex);

            default:"Error!";
        }

        return className + '.' + nameAndType;
    }

    static function printNameAndType(constantPool:Array<ConstantPoolInfo>, nameIndex:Int, descriptorIndex:Int):String {
        var name = switch(constantPool[nameIndex]){
            case ConstantPoolInfo.Utf8Info(body):
                body.bytes;

            default:"Error!";
        }
        var desc = switch(constantPool[descriptorIndex]){
            case ConstantPoolInfo.Utf8Info(body):
                body.bytes;

            default:"Error!";
        }

        return name + ':' + desc;
    }

    static function constantPoolLink(value:Int):String {
        return '<a href="#constant' + Std.string(value) + '">' + '#' + Std.string(value) + '</a>';
    }


}


typedef Pair = {
    var match:Int;
    var offset:Int;
}