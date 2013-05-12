package jvm.klass;

enum ConstantPoolInfo {
    Empty;
    Utf8Info(body:Utf8InfoBody);
    IntegerInfo(body:IntegerInfoBody);
    FloatInfo(body:FloatInfoBody);
    LongInfo(body:LongInfoBody);
    DoubleInfo(body:DoubleInfoBody);
    ClassInfo(body:ClassInfoBody);
    StringInfo(body:StringInfoBody);
    FieldrefInfo(body:FieldrefInfoBody);
    MethodrefInfo(body:MethodrefInfoBody);
    InterfaceMethodrefInfo(body:InterfaceMethodrefInfoBody);
    NameAndTypeInfo(body:NameAndTypeInfoBody);
    MethodHandleInfo(body:MethodHandleInfoBody);
    ConstantMethodTypeInfo(body:ConstantMethodTypeInfoBody);
    ConstantInvokeDynamicInfo(body:ConstantInvokeDynamicInfoBody);
}

typedef Utf8InfoBody = {
tag:Int, length:Int, bytes:String
}

typedef IntegerInfoBody = {
tag:Int, bytes:Int
}

typedef FloatInfoBody = {
tag:Int, bytes:Int
}

typedef LongInfoBody = {
tag:Int, highBytes:Int, lowBytes:Int
}

typedef DoubleInfoBody = {
tag:Int, highBytes:Int, lowBytes:Int
}

typedef ClassInfoBody = {
tag:Int, nameIndex:Int
}

typedef StringInfoBody = {
tag:Int, stringIndex:Int
}

typedef FieldrefInfoBody = {
tag:Int, classIndex:Int, nameAndTypeIndex:Int
}

typedef MethodrefInfoBody = {
tag:Int, classIndex:Int, nameAndTypeIndex:Int
}

typedef InterfaceMethodrefInfoBody = {
tag:Int, classIndex:Int, nameAndTypeIndex:Int
}
typedef NameAndTypeInfoBody = {
tag:Int, nameIndex:Int, descriptorIndex:Int
}
typedef MethodHandleInfoBody = {
tag:Int, referenceKind:Int, referenceIndex:Int
}
typedef ConstantMethodTypeInfoBody = {
tag:Int, descriptorIndex:Int
}
typedef ConstantInvokeDynamicInfoBody = {
tag:Int, bootstrapMethodAttrIndex:Int, nameAndTypeIndex:Int
}
