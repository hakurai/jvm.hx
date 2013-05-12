package jvm.klass;

enum StackMapFrameEntry {
    SameFrame(body:SameFrameBody);
    SameLocals1StackItemFrame(body:SameLocals1StackItemFrameBody);
    SameLocals1StackItemFrameExtended(body:SameLocals1StackItemFrameExtendedBody);
    ChopFrame(body:ChopFrameBody);
    SameFrameExtended(body:SameFrameExtendedBody);
    AppendFrame(body:AppendFrameBody);
    FullFrame(body:FullFrameBody);
}

typedef SameFrameBody = {frameType:Int}
typedef SameLocals1StackItemFrameBody = {frameType:Int, stack:VerificationTypeInfo}
typedef SameLocals1StackItemFrameExtendedBody = {frameType:Int, offsetDelta:Int, stack:VerificationTypeInfo}
typedef ChopFrameBody = {frameType:Int, offsetDelta:Int}
typedef SameFrameExtendedBody = {frameType:Int, offsetDelta:Int}
typedef AppendFrameBody = {frameType:Int, offsetDelta:Int, locals:Array<VerificationTypeInfo>}
typedef FullFrameBody = {frameType:Int, offsetDelta:Int, numberOfLocals:Int, locals:Array<VerificationTypeInfo>, numberOfStackItems:Int, stack:Array<VerificationTypeInfo>}

enum VerificationTypeInfo {
    TopVariableInfo(body:VerificationTypeInfoBody);
    IntegerVariableInfo(body:VerificationTypeInfoBody);
    FloatVariableInfo(body:VerificationTypeInfoBody);
    DoubleVariableInfo(body:VerificationTypeInfoBody);
    LongVariableInfo(body:VerificationTypeInfoBody);
    NullVariableInfo(body:VerificationTypeInfoBody);
    UninitializedThisVariableInfo(body:VerificationTypeInfoBody);
    ObjectVariableInfo(body:ObjectVariableInfoBody);
    UninitializedVariableInfo(body:UninitializedVariableInfoBody);
}

typedef VerificationTypeInfoBody = {
tag:Int
}
typedef ObjectVariableInfoBody = {
tag:Int, cpoolIndex:Int
}
typedef UninitializedVariableInfoBody = {
tag:Int, offset:Int
}