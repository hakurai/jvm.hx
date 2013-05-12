package jvm.klass;

import Array;
class Klass {

    public var magic(default, default):Int;
    public var minorVersion(default, default):Int;
    public var majorVersion(default, default):Int;
    public var constantPoolCount(default, default):Int;
    public var constantPool(default, null):Array<ConstantPoolInfo>;
    public var accessFlags(default, default):Int;
    public var thisClass(default, default):Int;
    public var superClass(default, default):Int;
    public var interfacesCount(default, default):Int;
    public var interfaces(default, null):Array<Int>;
    public var fieldsCount(default, default):Int;
    public var fields(default, null):Array<FieldInfo>;
    public var methodsCount(default, default):Int;
    public var methods(default, null):Array<MethodInfo>;
    public var attributesCount(default, default):Int;
    public var attributes(default, null):Array<AttributeInfo>;

    public function new() {
        constantPool = new Array<ConstantPoolInfo>();
        interfaces = new Array<Int>();
        fields = new Array<FieldInfo>();
        methods = new Array<MethodInfo>();
        attributes = new Array<AttributeInfo>();
    }


}

typedef FieldInfo = {
    var accessFlags:Int;
    var nameIndex:Int;
    var descriptorIndex:Int;
    var attributeCount:Int;
    var attributes:Array<AttributeInfo>;
}


typedef ExceptionTableEntry = {
    var startPC:Int;
    var endPC:Int;
    var handlerPC:Int;
    var catchType:Int;
}




typedef ClassesEntry = {
    var innerClassInfoIndex:Int;
    var outerClassInfoIndex:Int;
    var innerNameIndex:Int;
    var innerClassAccessFlags:Int;
}

typedef LineNumberTableEntry = {
    var startPC:Int;
    var lineNumber:Int;
}

typedef LocalVariableTableEntry = {
    var startPC:Int;
    var length:Int;
    var nameIndex:Int;
    var descriptorIndex:Int;
    var index:Int;
}

typedef LocalVariableTypeTableEntry = {
    var startPC:Int;
    var length:Int;
    var nameIndex:Int;
    var signatureIndex:Int;
    var index:Int;
}

typedef Annotation = {
    var typeIndex:Int;
    var numElementValuePairs:Int;
    var elementValuePairs:Array<ElementValuePair>;
}

typedef ElementValuePair = {
    var elementNameIndex:Int;
    var value:ElementValue;
}

enum ElementValue {
    ByteType(tag:Int);
    CharType(tag:Int);
    DoubleType(tag:Int);
    FloatType(tag:Int);
    IntType(tag:Int);
    LongType(tag:Int);
    ShortType(tag:Int);
    BooleanType(tag:Int);
    StringType(tag:Int, constValueIndex:Int);
    EnumType(tag:Int, enumConstValue:EnumConstValue);
    ClassType(tag:Int, classInfoIndex:Int);
    AnnotationType(tag:Int, annotationValue:Int);
    ArrayType(tag:Int, numValues:Int, values:Array<ElementValue>);
}

typedef EnumConstValue = {
    var typeNameIndex:Int;
    var constNameIndex:Int;
}

typedef ArrayValue = {
    var numValues:Int;
    var values:Array<ElementValue>;
}

typedef ParameterAnnotation = {
    var numAnnotations:Int;
    var annotations:Array<Annotation>;
}

typedef BootstrapMethod = {
    var bootstrapMethodRef:Int;
    var numBootstrapArguments:Int;
    var bootstrapArguments:Array<Int>;
}

typedef MethodParameter = {
    var nameIndex:Int;
    var flag:Int;
}

typedef ByteCode = {
    var pc:Int;
    var opcode:Int;
    var operand:Array<Int>;
}

typedef MethodInfo = {
    var accessFlags:Int;
    var nameIndex:Int;
    var descriptorIndex:Int;
    var attributesCount:Int;
    var attributes:Array<AttributeInfo>;
}