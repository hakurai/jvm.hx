package jvm.klass;

import jvm.klass.Klass;
enum AttributeInfo {
    ConstantValue(body:ConstantValueBody);
    Code(body:CodeBody);
    StackMapTable(body:StackMapTableBody);
    Exceptions(body:ExceptionsBody);
    InnerClasses(body:InnerClassesBody);
    EnclosingMethod(body:EnclosingMethodBody);
    Synthetic(body:SyntheticBody);
    Signature(body:SignatureBody);
    SourceFile(body:SourceFileBody);
    SourceDebugExtension(body:SourceDebugExtensionBody);
    LineNumberTable(body:LineNumberTableBody);
    LocalVariableTable(body:LocalVariableTableBody);
    LocalVariableTypeTable(body:LocalVariableTypeTableBody);
    Deprecated(body:DeprecatedBody);
    RuntimeVisibleAnnotations(body:RuntimeVisibleAnnotationsBody);
    RuntimeInvisibleAnnotations(body:RuntimeInvisibleAnnotationsBody);
    RuntimeVisibleParameterAnnotations(body:RuntimeVisibleParameterAnnotationsBody);
    RuntimeInvisibleParameterAnnotations(body:RuntimeInvisibleParameterAnnotationsBody);
    AnnotationDefault(body:AnnotationDefaultBody);
    BootstrapMethods(body:BootstrapMethodsBody);
    MethodParameters(body:MethodParametersBody);
}

typedef ConstantValueBody = {
attributeNameIndex:Int,
attributeLength:Int,
constantValueIndex:Int}

typedef CodeBody = {
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
}

typedef StackMapTableBody = {
attributeNameIndex:Int,
attributeLength:Int,
numberOfEntries:Int,
entries:Array<StackMapFrameEntry>
}

typedef ExceptionsBody = {
attributeNameIndex:Int,
attributeLength:Int,
numberOfExceptions:Int,
exceptionIndexTable:Array<Int>
}

typedef InnerClassesBody = {
attributeNameIndex:Int,
attributeLength:Int,
numberOfClasses:Int,
classes:Array<ClassesEntry>
}

typedef EnclosingMethodBody = {
attributeNameIndex:Int,
attributeLength:Int,
classIndex:Int,
methodIndex:Int
}

typedef SyntheticBody = {
attributeNameIndex:Int,
attributeLength:Int
}

typedef SignatureBody = {
attributeNameIndex:Int,
attributeLength:Int,
signatureIndex:Int
}

typedef SourceFileBody = {
attributeNameIndex:Int,
attributeLength:Int,
sourcefileIndex:Int
}

typedef SourceDebugExtensionBody = {
attributeNameIndex:Int,
attributeLength:Int,
debugExtension:Array<Int>
}

typedef LineNumberTableBody = {
attributeNameIndex:Int,
attributeLength:Int,
lineNumberTableLength:Int,
lineNumberTable:Array<LineNumberTableEntry>
}

typedef LocalVariableTableBody = {
attributeNameIndex:Int,
attributeLength:Int,
localVariableTableLength:Int,
localVariableTable:Array<LocalVariableTableEntry>
}

typedef LocalVariableTypeTableBody = {
attributeNameIndex:Int,
attributeLength:Int,
localVariableTypeTableLength:Int,
localVariableTypeTable:Array<LocalVariableTypeTableEntry>
}

typedef DeprecatedBody = {
attributeNameIndex:Int,
attributeLength:Int
}

typedef RuntimeVisibleAnnotationsBody = {
attributeNameIndex:Int,
attributeLength:Int,
numAnnotations:Int,
annotations:Array<Annotation>
}

typedef RuntimeInvisibleAnnotationsBody = {
attributeNameIndex:Int,
attributeLength:Int,
numAnnotations:Int,
annotations:Array<Annotation>
}

typedef RuntimeVisibleParameterAnnotationsBody = {
attributeNameIndex:Int,
attributeLength:Int,
numParameters:Int,
parameterAnnotations:Array<ParameterAnnotation>
}

typedef RuntimeInvisibleParameterAnnotationsBody = {
attributeNameIndex:Int,
attributeLength:Int,
numParameters:Int,
parameterAnnotations:Array<ParameterAnnotation>
}

typedef AnnotationDefaultBody = {
attributeNameIndex:Int,
attributeLength:Int,
defaultValue:ElementValue
}

typedef BootstrapMethodsBody = {
attributeNameIndex:Int,
attributeLength:Int,
bootstrapMethods:Array<BootstrapMethod>
}

typedef MethodParametersBody = {
attributeNameIndex:Int,
attributeLength:Int,
numMethodParameters:Int,
methodParameters:Array<MethodParameter>
}