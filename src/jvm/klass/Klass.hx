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

    public function new() {
        constantPool = new Array<ConstantPoolInfo>();
        interfaces = new Array<Int>();
        fields = new Array<FieldInfo>();
    }


}

enum ConstantPoolInfo {
    Empty;
    Utf8Info(tag:Int, length:Int, bytes:String);
    IntegerInfo(tag:Int, bytes:Int);
    FloatInfo(tag:Int, bytes:Int);
    LongInfo(tag:Int, highBytes:Int, lowBytes:Int);
    DoubleInfo(tag:Int, highBytes:Int, lowBytes:Int);
    ClassInfo(tag:Int, nameIndex:Int);
    StringInfo(tag:Int, stringIndex:Int);
    FieldrefInfo(tag:Int, classIndex:Int, nameAndTypeIndex:Int);
    MethodrefInfo(tag:Int, classIndex:Int, nameAndTypeIndex:Int);
    InterfaceMethodrefInfo(tag:Int, classIndex:Int, nameAndTypeIndex:Int);
    NameAndTypeInfo(tag:Int, nameIndex:Int, descriptorIndex:Int);
    MethodHandleInfo(tag:Int, referenceKind:Int, referenceIndex:Int);
    ConstantMethodTypeInfo(tag:Int, descriptorIndex:Int);
    ConstantInvokeDynamicInfo(tag:Int, bootstrapMethodAttrIndex:Int, nameAndTypeIndex:Int);
}


typedef FieldInfo = {
    var accessFlags:Int;
    var nameIndex:Int;
    var descriptorIndex:Int;
    var attributeCount:Int;
    var attributes:Array<AttributeInfo>;
}

enum AttributeInfo {
    ConstantValue(
    attributeNameIndex:Int,
    attributeLength:Int,
    constantValueIndex:Int);

    Code(
    attributeNameIndex:Int,
    attributeLength:Int,
    maxStack:Int,
    maxLocals:Int,
    codeLength:Int,
    code:Array<ByteCode>,
    exceptionTableLength:Int,
    exceptionTable:Array<ExceptionTableEntry>,
    attributesCount:Int,
    attributes:Array<AttributeInfo>
    );

    StackMapTable(
    attributeNameIndex:Int,
    attributeLength:Int,
    numberOfEntries:Int,
    entries:Array<StackMapFrameEntry>
    );

    Exceptions(
    attributeNameIndex:Int,
    attributeLength:Int,
    numberOfExceptions:Int,
    exceptionIndexTable:Array<Int>
    );

    InnerClasses(
    attributeNameIndex:Int,
    attributeLength:Int,
    numberOfClasses:Int,
    classes:Array<ClassesEntry>
    );

    EnclosingMethod(
    attributeNameIndex:Int,
    attributeLength:Int,
    classIndex:Int,
    methodIndex:Int
    );

    Synthetic(
    attributeNameIndex:Int,
    attributeLength:Int
    );

    Signature(
    attributeNameIndex:Int,
    attributeLength:Int,
    signatureIndex:Int
    );

    SourceFile(
    attributeNameIndex:Int,
    attributeLength:Int,
    sourcefileIndex:Int
    );

    SourceDebugExtension(
    attributeNameIndex:Int,
    attributeLength:Int,
    debugExtension:Array<Int>
    );

    LineNumberTable(
    attributeNameIndex:Int,
    attributeLength:Int,
    lineNumberTableLength:Int,
    lineNumberTable:Array<LineNumberTableEntry>
    );

    LocalVariableTable(
    attributeNameIndex:Int,
    attributeLength:Int,
    localVariableTableLength:Int,
    localVariableTable:Array<LocalVariableTableEntry>
    );

    LocalVariableTypeTable(
    attributeNameIndex:Int,
    attributeLength:Int,
    localVariableTypeTableLength:Int,
    localVariableTypeTable:Array<LocalVariableTypeTableEntry>
    );

    Deprecated(
    attributeNameIndex:Int,
    attributeLength:Int
    );

    RuntimeVisibleAnnotations(
    attributeNameIndex:Int,
    attributeLength:Int,
    numAnnotations:Int,
    annotations:Array<Annotation>
    );

    RuntimeInvisibleAnnotations(
    attributeNameIndex:Int,
    attributeLength:Int,
    numAnnotations:Int,
    annotations:Array<Annotation>
    );

    RuntimeVisibleParameterAnnotations(
    attributeNameIndex:Int,
    attributeLength:Int,
    numParameters:Int,
    parameterAnnotations:Array<ParameterAnnotation>
    );

    RuntimeInvisibleParameterAnnotations(
    attributeNameIndex:Int,
    attributeLength:Int,
    numParameters:Int,
    parameterAnnotations:Array<ParameterAnnotation>
    );

    AnnotationDefault(
    attributeNameIndex:Int,
    attributeLength:Int,
    defaultValue:ElementValue
    );
    BootstrapMethods(
    attributeNameIndex:Int,
    attributeLength:Int,
    bootstrapMethods:Array<BootstrapMethod>
    );

    MethodParameters(
    attributeNameIndex:Int,
    attributeLength:Int,
    numMethodParameters:Int,
    methodParameters:Array<MethodParameter>
    );
}

typedef ExceptionTableEntry = {
    var startPC:Int;
    var endPC:Int;
    var handlerPC:Int;
    var catchType:Int;
}

enum StackMapFrameEntry {
    SameFrame(frameType:Int);
    SameLocals1StackItemFrame(frameType:Int, stack:VerificationTypeInfo);
    SameLocals1StackItemFrameExtended(frameType:Int, offsetDelta:Int, stack:VerificationTypeInfo);
    ChopFrame(frameType:Int, offsetDelta:Int);
    SameFrameExtended(frameType:Int, offsetDelta:Int);
    AppendFrame(frameType:Int, offsetDelta:Int, locals:Array<VerificationTypeInfo>);
    FullFrame(frameType:Int, offsetDelta:Int, numberOfLocals:Int, locals:Array<VerificationTypeInfo>, numberOfStackItems:Int, stack:Array<VerificationTypeInfo>);

}

enum VerificationTypeInfo {
    TopVariableInfo(tag:Int);
    IntegerVariableInfo(tag:Int);
    FloatVariableInfo(tag:Int);
    DoubleVariableInfo(tag:Int);
    LongVariableInfo(tag:Int);
    NullVariableInfo(tag:Int);
    UninitializedThisVariableInfo(tag:Int);
    ObjectVariableInfo(tag:Int, cpoolIndex:Int);
    UninitializedVariableInfo(tag:Int, offset:Int);
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

enum ByteCode {
    nop;
}