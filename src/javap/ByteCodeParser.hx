package javap;
import jvm.klass.Klass.ByteCode;
class ByteCodeParser {

    public static var PARSER(get_PARSER, null):Array<Parser>;

    private static var BYTECODE_PARSER:Array<Parser>;

    public static function parse(codeArray:Array<Int>):Array<ByteCode> {
        var len = codeArray.length;
        var byteCodeArray = new Array<ByteCode>();

        var i = 0;
        while (i < len) {
            var byteCode = parseCode(codeArray, i);
            byteCodeArray.push(byteCode);
            i++;
            i += byteCode.operand.length;
        }

        return byteCodeArray;
    }

    static function parseCode(codeArray:Array<Int>, index:Int):ByteCode {
        var opcode = codeArray[index];

        if (opcode < 0 || opcode > 201) {
            throw "Illegal opcode: " + opcode;
        }

        var parser:Array<Int> -> Int -> ByteCode = PARSER[opcode].parser;

        return parser(codeArray, index);
    }



    private static function get_PARSER():Array<Parser> {
        if (BYTECODE_PARSER == null) {
            BYTECODE_PARSER = new Array();
            BYTECODE_PARSER[0] = bytecode('nop', 0);
            BYTECODE_PARSER[1] = bytecode('aconst_null', 0);
            BYTECODE_PARSER[2] = bytecode('iconst_m1', 0);
            BYTECODE_PARSER[3] = bytecode('iconst_0', 0);
            BYTECODE_PARSER[4] = bytecode('iconst_1', 0);
            BYTECODE_PARSER[5] = bytecode('iconst_2', 0);
            BYTECODE_PARSER[6] = bytecode('iconst_3', 0);
            BYTECODE_PARSER[7] = bytecode('iconst_4', 0);
            BYTECODE_PARSER[8] = bytecode('iconst_5', 0);
            BYTECODE_PARSER[9] = bytecode('lconst_0', 0);
            BYTECODE_PARSER[10] = bytecode('lconst_1', 0);
            BYTECODE_PARSER[11] = bytecode('fconst_0', 0);
            BYTECODE_PARSER[12] = bytecode('fconst_1', 0);
            BYTECODE_PARSER[13] = bytecode('fconst_2', 0);
            BYTECODE_PARSER[14] = bytecode('dconst_0', 0);
            BYTECODE_PARSER[15] = bytecode('dconst_1', 0);
            BYTECODE_PARSER[16] = bytecode('bipush', 1);
            BYTECODE_PARSER[17] = bytecode('sipush', 2);
            BYTECODE_PARSER[18] = bytecode('ldc', 1);
            BYTECODE_PARSER[19] = bytecode('ldc_w', 2);
            BYTECODE_PARSER[20] = bytecode('ldc2_w', 2);
            BYTECODE_PARSER[21] = bytecode('iload', 1);
            BYTECODE_PARSER[22] = bytecode('lload', 1);
            BYTECODE_PARSER[23] = bytecode('fload', 1);
            BYTECODE_PARSER[24] = bytecode('dload', 1);
            BYTECODE_PARSER[25] = bytecode('aload', 1);
            BYTECODE_PARSER[26] = bytecode('iload_0', 0);
            BYTECODE_PARSER[27] = bytecode('iload_1', 0);
            BYTECODE_PARSER[28] = bytecode('iload_2', 0);
            BYTECODE_PARSER[29] = bytecode('iload_3', 0);
            BYTECODE_PARSER[30] = bytecode('lload_0', 0);
            BYTECODE_PARSER[31] = bytecode('lload_1', 0);
            BYTECODE_PARSER[32] = bytecode('lload_2', 0);
            BYTECODE_PARSER[33] = bytecode('lload_3', 0);
            BYTECODE_PARSER[34] = bytecode('fload_0', 0);
            BYTECODE_PARSER[35] = bytecode('fload_1', 0);
            BYTECODE_PARSER[36] = bytecode('fload_2', 0);
            BYTECODE_PARSER[37] = bytecode('fload_3', 0);
            BYTECODE_PARSER[38] = bytecode('dload_0', 0);
            BYTECODE_PARSER[39] = bytecode('dload_1', 0);
            BYTECODE_PARSER[40] = bytecode('dload_2', 0);
            BYTECODE_PARSER[41] = bytecode('dload_3', 0);
            BYTECODE_PARSER[42] = bytecode('aload_0', 0);
            BYTECODE_PARSER[43] = bytecode('aload_1', 0);
            BYTECODE_PARSER[44] = bytecode('aload_2', 0);
            BYTECODE_PARSER[45] = bytecode('aload_3', 0);
            BYTECODE_PARSER[46] = bytecode('iaload', 0);
            BYTECODE_PARSER[47] = bytecode('laload', 0);
            BYTECODE_PARSER[48] = bytecode('faload', 0);
            BYTECODE_PARSER[49] = bytecode('daload', 0);
            BYTECODE_PARSER[50] = bytecode('aaload', 0);
            BYTECODE_PARSER[51] = bytecode('baload', 0);
            BYTECODE_PARSER[52] = bytecode('caload', 0);
            BYTECODE_PARSER[53] = bytecode('saload', 0);
            BYTECODE_PARSER[54] = bytecode('istore', 1);
            BYTECODE_PARSER[55] = bytecode('lstore', 1);
            BYTECODE_PARSER[56] = bytecode('fstore', 1);
            BYTECODE_PARSER[57] = bytecode('dstore', 1);
            BYTECODE_PARSER[58] = bytecode('astore', 1);
            BYTECODE_PARSER[59] = bytecode('istore_0', 0);
            BYTECODE_PARSER[60] = bytecode('istore_1', 0);
            BYTECODE_PARSER[61] = bytecode('istore_2', 0);
            BYTECODE_PARSER[62] = bytecode('istore_3', 0);
            BYTECODE_PARSER[63] = bytecode('lstore_0', 0);
            BYTECODE_PARSER[64] = bytecode('lstore_1', 0);
            BYTECODE_PARSER[65] = bytecode('lstore_2', 0);
            BYTECODE_PARSER[66] = bytecode('lstore_3', 0);
            BYTECODE_PARSER[67] = bytecode('fstore_0', 0);
            BYTECODE_PARSER[68] = bytecode('fstore_1', 0);
            BYTECODE_PARSER[69] = bytecode('fstore_2', 0);
            BYTECODE_PARSER[70] = bytecode('fstore_3', 0);
            BYTECODE_PARSER[71] = bytecode('dstore_0', 0);
            BYTECODE_PARSER[72] = bytecode('dstore_1', 0);
            BYTECODE_PARSER[73] = bytecode('dstore_2', 0);
            BYTECODE_PARSER[74] = bytecode('dstore_3', 0);
            BYTECODE_PARSER[75] = bytecode('astore_0', 0);
            BYTECODE_PARSER[76] = bytecode('astore_1', 0);
            BYTECODE_PARSER[77] = bytecode('astore_2', 0);
            BYTECODE_PARSER[78] = bytecode('astore_3', 0);
            BYTECODE_PARSER[79] = bytecode('iastore', 0);
            BYTECODE_PARSER[80] = bytecode('lastore', 0);
            BYTECODE_PARSER[81] = bytecode('fastore', 0);
            BYTECODE_PARSER[82] = bytecode('dastore', 0);
            BYTECODE_PARSER[83] = bytecode('aastore', 0);
            BYTECODE_PARSER[84] = bytecode('bastore', 0);
            BYTECODE_PARSER[85] = bytecode('castore', 0);
            BYTECODE_PARSER[86] = bytecode('sastore', 0);
            BYTECODE_PARSER[87] = bytecode('pop', 0);
            BYTECODE_PARSER[88] = bytecode('pop2', 0);
            BYTECODE_PARSER[89] = bytecode('dup', 0);
            BYTECODE_PARSER[90] = bytecode('dup_x1', 0);
            BYTECODE_PARSER[91] = bytecode('dup_x2', 0);
            BYTECODE_PARSER[92] = bytecode('dup2', 0);
            BYTECODE_PARSER[93] = bytecode('dup2_x1', 0);
            BYTECODE_PARSER[94] = bytecode('dup2_x2', 0);
            BYTECODE_PARSER[95] = bytecode('swap', 0);
            BYTECODE_PARSER[96] = bytecode('iadd', 0);
            BYTECODE_PARSER[97] = bytecode('ladd', 0);
            BYTECODE_PARSER[98] = bytecode('fadd', 0);
            BYTECODE_PARSER[99] = bytecode('dadd', 0);
            BYTECODE_PARSER[100] = bytecode('isub', 0);
            BYTECODE_PARSER[101] = bytecode('lsub', 0);
            BYTECODE_PARSER[102] = bytecode('fsub', 0);
            BYTECODE_PARSER[103] = bytecode('dsub', 0);
            BYTECODE_PARSER[104] = bytecode('imul', 0);
            BYTECODE_PARSER[105] = bytecode('lmul', 0);
            BYTECODE_PARSER[106] = bytecode('fmul', 0);
            BYTECODE_PARSER[107] = bytecode('dmul', 0);
            BYTECODE_PARSER[108] = bytecode('idiv', 0);
            BYTECODE_PARSER[109] = bytecode('ldiv', 0);
            BYTECODE_PARSER[110] = bytecode('fdiv', 0);
            BYTECODE_PARSER[111] = bytecode('ddiv', 0);
            BYTECODE_PARSER[112] = bytecode('irem', 0);
            BYTECODE_PARSER[113] = bytecode('lrem', 0);
            BYTECODE_PARSER[114] = bytecode('frem', 0);
            BYTECODE_PARSER[115] = bytecode('drem', 0);
            BYTECODE_PARSER[116] = bytecode('ineg', 0);
            BYTECODE_PARSER[117] = bytecode('lneg', 0);
            BYTECODE_PARSER[118] = bytecode('fneg', 0);
            BYTECODE_PARSER[119] = bytecode('dneg', 0);
            BYTECODE_PARSER[120] = bytecode('ishl', 0);
            BYTECODE_PARSER[121] = bytecode('lshl', 0);
            BYTECODE_PARSER[122] = bytecode('ishr', 0);
            BYTECODE_PARSER[123] = bytecode('lshr', 0);
            BYTECODE_PARSER[124] = bytecode('iushr', 0);
            BYTECODE_PARSER[125] = bytecode('lushr', 0);
            BYTECODE_PARSER[126] = bytecode('iadn', 0);
            BYTECODE_PARSER[127] = bytecode('land', 0);
            BYTECODE_PARSER[128] = bytecode('ior', 0);
            BYTECODE_PARSER[129] = bytecode('lor', 0);
            BYTECODE_PARSER[130] = bytecode('ixor', 0);
            BYTECODE_PARSER[131] = bytecode('lxor', 0);
            BYTECODE_PARSER[132] = bytecode('iinc', 2);
            BYTECODE_PARSER[133] = bytecode('i2l', 0);
            BYTECODE_PARSER[134] = bytecode('i2f', 0);
            BYTECODE_PARSER[135] = bytecode('i2d', 0);
            BYTECODE_PARSER[136] = bytecode('l2i', 0);
            BYTECODE_PARSER[137] = bytecode('l2f', 0);
            BYTECODE_PARSER[138] = bytecode('l2d', 0);
            BYTECODE_PARSER[139] = bytecode('f2i', 0);
            BYTECODE_PARSER[140] = bytecode('f2l', 0);
            BYTECODE_PARSER[141] = bytecode('f2d', 0);
            BYTECODE_PARSER[142] = bytecode('d2i', 0);
            BYTECODE_PARSER[143] = bytecode('d2l', 0);
            BYTECODE_PARSER[144] = bytecode('d2f', 0);
            BYTECODE_PARSER[145] = bytecode('i2b', 0);
            BYTECODE_PARSER[146] = bytecode('i2c', 0);
            BYTECODE_PARSER[147] = bytecode('i2s', 0);
            BYTECODE_PARSER[148] = bytecode('lcmp', 0);
            BYTECODE_PARSER[149] = bytecode('fcmpl', 0);
            BYTECODE_PARSER[150] = bytecode('fcmpg', 0);
            BYTECODE_PARSER[151] = bytecode('dcmpl', 0);
            BYTECODE_PARSER[152] = bytecode('dcmpg', 0);
            BYTECODE_PARSER[153] = bytecode('ifeq', 2);
            BYTECODE_PARSER[154] = bytecode('ifne', 2);
            BYTECODE_PARSER[155] = bytecode('iflt', 2);
            BYTECODE_PARSER[156] = bytecode('ifge', 2);
            BYTECODE_PARSER[157] = bytecode('ifgt', 2);
            BYTECODE_PARSER[158] = bytecode('ifle', 2);
            BYTECODE_PARSER[159] = bytecode('if_icmpeq', 2);
            BYTECODE_PARSER[160] = bytecode('if_icmpne', 2);
            BYTECODE_PARSER[161] = bytecode('if_icmplt', 2);
            BYTECODE_PARSER[162] = bytecode('if_icmpge', 2);
            BYTECODE_PARSER[163] = bytecode('if_icmpgt', 2);
            BYTECODE_PARSER[164] = bytecode('if_icmple', 2);
            BYTECODE_PARSER[165] = bytecode('if_acmpeq', 2);
            BYTECODE_PARSER[166] = bytecode('if_acmpne', 2);
            BYTECODE_PARSER[167] = bytecode('goto', 2);
            BYTECODE_PARSER[168] = bytecode('jsr', 2);
            BYTECODE_PARSER[169] = bytecode('ret', 1);
            BYTECODE_PARSER[170] = bytecode('tableswitch'); //variable length instruction
            BYTECODE_PARSER[171] = bytecode('lookupswitch'); // variable length instruction
            BYTECODE_PARSER[172] = bytecode('ireturn', 0);
            BYTECODE_PARSER[173] = bytecode('lreturn', 0);
            BYTECODE_PARSER[174] = bytecode('freturn', 0);
            BYTECODE_PARSER[175] = bytecode('dreturn', 0);
            BYTECODE_PARSER[176] = bytecode('areturn', 0);
            BYTECODE_PARSER[177] = bytecode('return', 0);
            BYTECODE_PARSER[178] = bytecode('getstatic', 2);
            BYTECODE_PARSER[179] = bytecode('putstatic', 2);
            BYTECODE_PARSER[180] = bytecode('getfield', 2);
            BYTECODE_PARSER[181] = bytecode('putfield', 2);
            BYTECODE_PARSER[182] = bytecode('invokevirtual', 2);
            BYTECODE_PARSER[183] = bytecode('involespecial', 2);
            BYTECODE_PARSER[184] = bytecode('invokestatic', 2);
            BYTECODE_PARSER[185] = bytecode('invokeinterface', 4);// 4th byte must be zero
            BYTECODE_PARSER[186] = bytecode('invokedynamic', 4);
            BYTECODE_PARSER[187] = bytecode('new', 2);
            BYTECODE_PARSER[188] = bytecode('newarray', 1);
            BYTECODE_PARSER[189] = bytecode('anewarray', 2);
            BYTECODE_PARSER[190] = bytecode('arraylength', 0);
            BYTECODE_PARSER[191] = bytecode('athrow', 0);
            BYTECODE_PARSER[192] = bytecode('checkcast', 2);
            BYTECODE_PARSER[193] = bytecode('instanceof', 2);
            BYTECODE_PARSER[194] = bytecode('monitorenter', 0);
            BYTECODE_PARSER[195] = bytecode('monitorexit', 0);
            BYTECODE_PARSER[196] = bytecode('wide'); // variable length instruction
            BYTECODE_PARSER[197] = bytecode('multianewarray', 3);
            BYTECODE_PARSER[198] = bytecode('ifnull', 2);
            BYTECODE_PARSER[199] = bytecode('ifnonnull', 2);
            BYTECODE_PARSER[200] = bytecode('goto_w', 4);
            BYTECODE_PARSER[201] = bytecode('jsr_w', 4);

// reserved opcode
            BYTECODE_PARSER[202] = bytecode('breakpoint');
            BYTECODE_PARSER[254] = bytecode('impdep1');
            BYTECODE_PARSER[255] = bytecode('impdep2');
        }

        return BYTECODE_PARSER;
    }

    private static function bytecode(name:String, ?num:Int):Parser {
        var fn = null;

        if (name == 'tableswitch') {
            fn = parseTableswitch;
        } else if (name == 'lookupswitch') {
            fn = parseLookupswitch;
        } else if (name == 'wide') {
            fn = parseWide;
        } else if (num == 0) {
            fn = parse0;
        } else if (num == 1) {
            fn = parse1;
        } else if (num == 2) {
            fn = parse2;
        } else if (num == 3) {
            fn = parse3;
        } else if (num == 4) {
            fn = parse4;
        }
        return {
        name:name,
        parser:fn
        }
    }

    static function parse0(codeArray:Array<Int>, index:Int):ByteCode {
        return {
        pc:index,
        opcode:codeArray[index],
        operand:[]
        };
    }

    static function parse1(codeArray:Array<Int>, index:Int):ByteCode {
        return {
        pc:index,
        opcode:codeArray[index],
        operand:[codeArray[index + 1]]
        };
    }

    static function parse2(codeArray:Array<Int>, index:Int):ByteCode {
        return {
        pc:index,
        opcode:codeArray[index],
        operand:[codeArray[index + 1], codeArray[index + 2]]
        };
    }

    static function parse3(codeArray:Array<Int>, index:Int):ByteCode {
        return {
        pc:index,
        opcode:codeArray[index],
        operand:[codeArray[index + 1], codeArray[index + 2], codeArray[index + 3]]
        };
    }

    static function parse4(codeArray:Array<Int>, index:Int):ByteCode {
        return {
        pc:index,
        opcode:codeArray[index],
        operand:[codeArray[index + 1], codeArray[index + 2], codeArray[index + 3], codeArray[index + 4]]
        };
    }

    static function parseTableswitch(codeArray:Array<Int>, index:Int):ByteCode {
        var defaultByteIndex = index + 1;

        while (defaultByteIndex % 4 != 0) {
            defaultByteIndex++;
        }

        var low = codeArray[defaultByteIndex + 4] << 24 | codeArray[defaultByteIndex + 5] << 16 | codeArray[defaultByteIndex + 6] << 8 | codeArray[defaultByteIndex + 7];
        var high = codeArray[defaultByteIndex + 8] << 24 | codeArray[defaultByteIndex + 9] << 16 | codeArray[defaultByteIndex + 10] << 8 | codeArray[defaultByteIndex + 11];

        var numJumpOffset = (high - low + 1);

        var len = defaultByteIndex + (3 + numJumpOffset) * 4 - index + 1;
        var i = index + 1;

        var operand = new Array<Int>();
        while (i < len) {
            operand.push(codeArray[i]);
            i++;
        }

        return {
        pc:index,
        opcode:codeArray[index],
        operand:operand
        };
    }

    static function parseLookupswitch(codeArray:Array<Int>, index:Int):ByteCode {
        var defaultByteIndex = index + 1;

        while (defaultByteIndex % 4 != 0) {
            defaultByteIndex++;
        }

        var npairs = codeArray[defaultByteIndex + 4] << 24 | codeArray[defaultByteIndex + 5] << 16 | codeArray[defaultByteIndex + 6] << 8 | codeArray[defaultByteIndex + 7];

        var len = defaultByteIndex + (2 + npairs * 2) * 4 - index + 1;
        var i = index + 1;
        var operand = new Array<Int>();
        while (i < len) {
            operand.push(codeArray[i]);
            i++;
        }
        return {
        pc:index,
        opcode:codeArray[index],
        operand:operand
        };
    }

    static function parseWide(codeArray:Array<Int>, index:Int):ByteCode {
        var operand;

        if (codeArray[index + 1] == 132) {
            operand = [codeArray[index + 1], codeArray[index + 2], codeArray[index + 3]];
        } else {
            operand = [codeArray[index + 1], codeArray[index + 2], codeArray[index + 3], codeArray[index + 4], codeArray[index + 5]];
        }

        return {
        pc:index,
        opcode:codeArray[index],
        operand:operand
        };
    }

}

typedef Parser = {
    var name:String;
    var parser:Array<Int> -> Int -> ByteCode;
}