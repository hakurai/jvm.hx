package javap;
import jvm.klass.Klass.AttributeInfo;
import jvm.klass.Klass.ConstantPoolInfo;
import jvm.klass.Klass.ExceptionTableEntry;
import jvm.klass.Klass.StackMapFrameEntry;
import jvm.klass.Klass.VerificationTypeInfo;
import jvm.klass.Klass.ClassesEntry;
import jvm.klass.Klass.LineNumberTableEntry;
import jvm.klass.Klass.LocalVariableTableEntry;
import jvm.klass.Klass.LocalVariableTypeTableEntry;
import jvm.klass.Klass.Annotation;
import jvm.klass.Klass.ElementValuePair;
import jvm.klass.Klass.ElementValue;
import jvm.klass.Klass.ParameterAnnotation;
import jvm.klass.Klass.BootstrapMethod;
import jvm.klass.Klass.MethodParameter;

class AttributeParser {

    var source:ClassSource;
    var constantPool:Array<ConstantPoolInfo>;

    public function new(source:ClassSource, constantPool:Array<ConstantPoolInfo>) {
        this.source = source;
        this.constantPool = constantPool;
    }

    public function readAttribute():AttributeInfo {
        var attributeNameIndex = source.readU2();
        var attributeLength = source.readU4();
        var attributeName = switch(constantPool[attributeNameIndex]){
            case Utf8Info(tag, length, bytes): bytes;
            default: throw "LinkageError";
        };

        return switch (attributeName) {
            case 'ConstantValue':
                readConstantValue(attributeNameIndex, attributeLength);

            case 'Code':
                readCode(attributeNameIndex, attributeLength);

            case 'StackMapTable':
                readStackMapTable(attributeNameIndex, attributeLength);

            case 'Exceptions':
                readExceptions(attributeNameIndex, attributeLength);

            case 'InnerClasses':
                readInnerClasses(attributeNameIndex, attributeLength);

            case 'EnclosingMethod':
                readEnclosingMethod(attributeNameIndex, attributeLength);

            case 'Synthetic':
                readSynthetic(attributeNameIndex, attributeLength);

            case 'Signature':
                readSignature(attributeNameIndex, attributeLength);

            case 'SourceFile':
                readSourceFile(attributeNameIndex, attributeLength);

            case 'SourceDebugExtension':
                readSourceDebugExtension(attributeNameIndex, attributeLength);

            case 'LineNumberTable':
                readLineNumberTable(attributeNameIndex, attributeLength);

            case 'LocalVariableTable':
                readLocalVariableTable(attributeNameIndex, attributeLength);

            case 'LocalVariableTypeTable':
                readLocalVariableTypeTable(attributeNameIndex, attributeLength);

            case 'Deprecated':
                readDeprecated(attributeNameIndex, attributeLength);

            case 'RuntimeVisibleAnnotations':
                readRuntimeVisibleAnnotations(attributeNameIndex, attributeLength);

            case 'RuntimeInvisibleAnnotations':
                readRuntimeInvisibleAnnotations(attributeNameIndex, attributeLength);

            case 'RuntimeVisibleParameterAnnotations':
                readRuntimeVisibleParameterAnnotations(attributeNameIndex, attributeLength);

            case 'RuntimeInvisibleParameterAnnotations':
                readRuntimeInvisibleParameterAnnotations(attributeNameIndex, attributeLength);

            case 'AnnotationDefault':
                readAnnotationDefault(attributeNameIndex, attributeLength);

            case 'BootstrapMethods':
                readBootstrapMethods(attributeNameIndex, attributeLength);

            case 'MethodParameters':
                readMethodParameters(attributeNameIndex, attributeLength);

            default :
                throw "LinkageError";
        }
    }

    inline function readConstantValue(attributeNameIndex, attributeLength):AttributeInfo {
        return AttributeInfo.ConstantValue(attributeNameIndex, attributeLength, source.readU2());
    }

    function readCode(attributeNameIndex, attributeLength):AttributeInfo {
        var maxStack = source.readU2();
        var maxLocals = source.readU2();
        var codeLength = source.readU4();
        var code;
        var exceptionTableLength;
        var exceptionTable = new Array<ExceptionTableEntry>();
        var attributesCount;
        var attributes = new Array<AttributeInfo>();

        var codeBinary = new Array<Int>();
        for (i in 0...codeLength) {
            codeBinary.push(source.readU1());
        }
        code = ByteCodeParser.parse(codeBinary);

        exceptionTableLength = source.readU2();
        for (i in 0...exceptionTableLength) {
            exceptionTable.push(readExceptionTable());
        }

        attributesCount = source.readU2();
        for (i in 0...attributesCount) {
            attributes.push(readAttribute());
        }

        return AttributeInfo.Code(
            attributeNameIndex,
            attributeLength,
            maxStack,
            maxLocals,
            codeLength,
            code,
            exceptionTableLength,
            exceptionTable,
            attributesCount,
            attributes
        );

    }

    inline function readExceptionTable():ExceptionTableEntry {
        return {
        startPC: source.readU2(),
        endPC: source.readU2(),
        handlerPC: source.readU2(),
        catchType: source.readU2()
        }
    }

    function readStackMapTable(attributeNameIndex, attributeLength):AttributeInfo {
        var numberOfEntries = source.readU2();
        var entries = new Array<StackMapFrameEntry>();

        for (i in 0...numberOfEntries) {
            entries.push(readStackMapFrame());
        }

        return AttributeInfo.StackMapTable(
            attributeNameIndex,
            attributeLength,
            numberOfEntries,
            entries
        );
    }

    inline function readStackMapFrame():StackMapFrameEntry {
        var frameType = source.readU1();
        return if (frameType < 64) {
//same_frame
            StackMapFrameEntry.SameFrame(frameType);

        } else if (frameType < 128) {
//same_locals_1_stack_item_frame
            var stack = readVerificationTypeInfo();
            StackMapFrameEntry.SameLocals1StackItemFrame(frameType, stack);

        } else if (frameType == 247) {
//same_locals_1_stack_item_frame_extended
            var offsetDelta = source.readU2();
            var stack = readVerificationTypeInfo();
            StackMapFrameEntry.SameLocals1StackItemFrameExtended(frameType, offsetDelta, stack);

        } else if (248 <= frameType && frameType <= 250) {
//chop_frame
            var offsetDelta = source.readU2();
            StackMapFrameEntry.ChopFrame(frameType, offsetDelta);

        } else if (frameType == 251) {
//same_frame_extended
            var offsetDelta = source.readU2();
            StackMapFrameEntry.SameFrameExtended(frameType, offsetDelta);

        } else if (252 <= frameType && frameType <= 254) {
//append_frame
            var len = frameType - 251;
            var offsetDelta = source.readU2();
            var locals = new Array<VerificationTypeInfo>();

            for (i in 0...len) {
                locals.push(readVerificationTypeInfo());
            }
            StackMapFrameEntry.AppendFrame(frameType, offsetDelta, locals);

        } else if (frameType == 255) {
//full_frame
            var offsetDelta = source.readU2();
            var numberOfLocals = source.readU2();
            var locals = new Array<VerificationTypeInfo>();

            for (i in 0...numberOfLocals) {
                locals.push(readVerificationTypeInfo());
            }

            var numberOfStackItems = source.readU2();
            var stack = new Array<VerificationTypeInfo>();
            for (i in 0...numberOfStackItems) {
                stack.push(readVerificationTypeInfo());
            }
            StackMapFrameEntry.FullFrame(frameType, offsetDelta, numberOfLocals, locals, numberOfStackItems, stack);

        } else {
            throw "LinkageError";
        }

    }

    function readVerificationTypeInfo():VerificationTypeInfo {
        var tag = source.readU1();
        return switch(tag){
            case 0:
                VerificationTypeInfo.TopVariableInfo(tag);
            case 1:
                VerificationTypeInfo.IntegerVariableInfo(tag);
            case 2:
                VerificationTypeInfo.FloatVariableInfo(tag);
            case 3:
                VerificationTypeInfo.DoubleVariableInfo(tag);
            case 4:
                VerificationTypeInfo.LongVariableInfo(tag);
            case 5:
                VerificationTypeInfo.NullVariableInfo(tag);
            case 6:
                VerificationTypeInfo.UninitializedThisVariableInfo(tag);
            case 7:
                var cpoolIndex = source.readU2();
                VerificationTypeInfo.ObjectVariableInfo(tag, cpoolIndex);
            case 8:
                var offset = source.readU2();
                VerificationTypeInfo.UninitializedVariableInfo(tag, offset);
            default:
                throw "LinkageError";
        }
    }

    function readExceptions(attributeNameIndex, attributeLength):AttributeInfo {
        var numberOfExceptions = source.readU2();
        var exceptionIndexTable = new Array<Int>();
        for (i in 0...numberOfExceptions) {
            exceptionIndexTable.push(source.readU2());
        }

        return AttributeInfo.Exceptions(
            attributeNameIndex,
            attributeLength,
            numberOfExceptions,
            exceptionIndexTable
        );
    }

    function readInnerClasses(attributeNameIndex, attributeLength):AttributeInfo {
        var numberOfClasses = source.readU2();
        var classes = new Array<ClassesEntry>();
        for (i in 0...numberOfClasses) {
            classes.push({
            innerClassInfoIndex: source.readU2(),
            outerClassInfoIndex: source.readU2(),
            innerNameIndex: source.readU2(),
            innerClassAccessFlags: source.readU2()
            });
        }

        return AttributeInfo.InnerClasses(
            attributeNameIndex,
            attributeLength,
            numberOfClasses,
            classes
        );
    }

    function readEnclosingMethod(attributeNameIndex, attributeLength):AttributeInfo {
        return AttributeInfo.EnclosingMethod(
            attributeNameIndex,
            attributeLength,
            source.readU2(),
            source.readU2()
        );
    }

    function readSynthetic(attributeNameIndex, attributeLength):AttributeInfo {
        return AttributeInfo.Synthetic(attributeNameIndex, attributeLength);
    }

    function readSignature(attributeNameIndex, attributeLength):AttributeInfo {
        return AttributeInfo.Signature(attributeNameIndex, attributeLength, source.readU2());
    }

    function readSourceFile(attributeNameIndex, attributeLength):AttributeInfo {
        return AttributeInfo.SourceFile(attributeNameIndex, attributeLength, source.readU2());
    }

    function readSourceDebugExtension(attributeNameIndex, attributeLength):AttributeInfo {
        var debugExtension = new Array<Int>();
        for (i in 0...attributeLength) {
            debugExtension.push(source.readU1());
        }
        return AttributeInfo.SourceDebugExtension(attributeNameIndex, attributeLength, debugExtension);
    }

    function readLineNumberTable(attributeNameIndex, attributeLength):AttributeInfo {
        var lineNumberTableLength = source.readU2();
        var lineNumberTable = new Array<LineNumberTableEntry>();
        for (i in 0...lineNumberTableLength) {
            lineNumberTable.push({startPC: source.readU2(), lineNumber: source.readU2()});
        }
        return AttributeInfo.LineNumberTable(attributeNameIndex, attributeLength, lineNumberTableLength, lineNumberTable);
    }

    function readLocalVariableTable(attributeNameIndex, attributeLength):AttributeInfo {
        var localVariableTableLength = source.readU2();
        var localVariableTable = new Array<LocalVariableTableEntry>();
        for (i in 0...localVariableTableLength) {
            localVariableTable.push(
                {startPC: source.readU2(),
                length: source.readU2(),
                nameIndex: source.readU2(),
                descriptorIndex: source.readU2(),
                index: source.readU2()
                }
            );
        }
        return AttributeInfo.LocalVariableTable(
            attributeNameIndex,
            attributeLength,
            localVariableTableLength,
            localVariableTable
        );
    }

    function readLocalVariableTypeTable(attributeNameIndex, attributeLength):AttributeInfo {
        var localVariableTypeTableLength = source.readU2();
        var localVariableTypeTable = new Array<LocalVariableTypeTableEntry>();
        for (i in 0...localVariableTypeTableLength) {
            localVariableTypeTable.push(
                {startPC: source.readU2(),
                length: source.readU2(),
                nameIndex: source.readU2(),
                signatureIndex: source.readU2(),
                index: source.readU2()
                }
            );
        }
        return AttributeInfo.LocalVariableTypeTable(
            attributeNameIndex,
            attributeLength,
            localVariableTypeTableLength,
            localVariableTypeTable
        );
    }

    function readDeprecated(attributeNameIndex, attributeLength):AttributeInfo {
        return AttributeInfo.Deprecated(attributeNameIndex, attributeLength);
    }

    function readRuntimeVisibleAnnotations(attributeNameIndex, attributeLength):AttributeInfo {
        var numAnnotations = source.readU2();
        var annotations = new Array<Annotation>();
        for (i in 0... numAnnotations) {
            annotations.push(readAnnotation());
        }

        return AttributeInfo.RuntimeVisibleAnnotations(
            attributeNameIndex,
            attributeLength,
            numAnnotations,
            annotations
        );
    }

    function readAnnotation():Annotation {
        var typeIndex = source.readU2();
        var numElementValuePairs = source.readU2();
        var elementValuePairs = new Array<ElementValuePair>();
        for (i in 0...numElementValuePairs) {
            elementValuePairs.push(readElementValuePair());
        }

        return {
        typeIndex:typeIndex,
        numElementValuePairs:numElementValuePairs,
        elementValuePairs:elementValuePairs
        };
    }

    function readElementValuePair():ElementValuePair {
        var elementNameIndex = source.readU2();
        var value = readElementValue();

        return {elementNameIndex:elementNameIndex, value:value};
    }

    function readElementValue():ElementValue {
        var tag = source.readU1();

        return switch(tag){
            case 0x42: // B byte
                ElementValue.ByteType(tag);
            case 0x43: // C char
                ElementValue.CharType(tag);
            case 0x44: // D double
                ElementValue.DoubleType(tag);
            case 0x46: // F float
                ElementValue.FloatType(tag);
            case 0x49: // I int
                ElementValue.IntType(tag);
            case 0x4a: // J long
                ElementValue.LongType(tag);
            case 0x53: // S short
                ElementValue.ShortType(tag);
            case 0x5a: // Z boolean
                ElementValue.BooleanType(tag);
            case 0x73: // s String
                ElementValue.StringType(tag, source.readU2());
            case 0x65: // e enum
                var enumConstValue = {
                typeNameIndex:source.readU2(),
                constNameIndex:source.readU2()
                }
                ElementValue.EnumType(tag, enumConstValue);
            case 0x63: // c class
                ElementValue.ClassType(tag, source.readU2());
            case 0x40: // @ annotation
                ElementValue.AnnotationType(tag, source.readU2());
            case 0x5b: // [ array
                var numValues = source.readU2();
                var values = new Array<ElementValue>();
                for (i in 0...numValues) {
                    values.push(readElementValue());
                }
                ElementValue.ArrayType(tag, numValues, values);
            default:
                throw "LinkageError";
        }
    }

    function readRuntimeInvisibleAnnotations(attributeNameIndex, attributeLength):AttributeInfo {
        var numAnnotations = source.readU2();
        var annotations = new Array<Annotation>();
        for (i in 0... numAnnotations) {
            annotations.push(readAnnotation());
        }

        return AttributeInfo.RuntimeInvisibleAnnotations(
            attributeNameIndex,
            attributeLength,
            numAnnotations,
            annotations
        );
    }

    function readRuntimeVisibleParameterAnnotations(attributeNameIndex, attributeLength):AttributeInfo {
        var numParameters = source.readU1();
        var parameterAnnotations = new Array<ParameterAnnotation>();
        for (i in 0...numParameters) {
            var numAnnotations = source.readU2();
            var annotations = new Array<Annotation>();
            for (j in 0...numAnnotations) {
                annotations.push(readAnnotation());
            }

            parameterAnnotations.push({numAnnotations:numAnnotations, annotations:annotations});
        }

        return AttributeInfo.RuntimeVisibleParameterAnnotations(
            attributeNameIndex,
            attributeLength,
            numParameters,
            parameterAnnotations
        );
    }

    function readRuntimeInvisibleParameterAnnotations(attributeNameIndex, attributeLength):AttributeInfo {
        var numParameters = source.readU1();
        var parameterAnnotations = new Array<ParameterAnnotation>();
        for (i in 0...numParameters) {
            var numAnnotations = source.readU2();
            var annotations = new Array<Annotation>();
            for (j in 0...numAnnotations) {
                annotations.push(readAnnotation());
            }

            parameterAnnotations.push({numAnnotations:numAnnotations, annotations:annotations});
        }

        return AttributeInfo.RuntimeInvisibleParameterAnnotations(
            attributeNameIndex,
            attributeLength,
            numParameters,
            parameterAnnotations
        );
    }

    function readAnnotationDefault(attributeNameIndex, attributeLength):AttributeInfo {
        var defaultValue = readElementValue();

        return AttributeInfo.AnnotationDefault(
            attributeNameIndex,
            attributeLength,
            defaultValue
        );
    }

    function readBootstrapMethods(attributeNameIndex, attributeLength):AttributeInfo {
        var numBootstrapMethods = source.readU2();
        var bootstrapMethods = new Array<BootstrapMethod>();
        for (i in 0...numBootstrapMethods) {
            bootstrapMethods.push(readBootstrapMethod());
        }

        return AttributeInfo.BootstrapMethods(
            attributeNameIndex,
            attributeLength,
            bootstrapMethods
        );
    }

    inline function readBootstrapMethod():BootstrapMethod {
        var bootstrapMethodRef = source.readU2();
        var numBootstrapArguments = source.readU2();
        var bootstrapArguments = new Array<Int>();
        for (i in 0...numBootstrapArguments) {
            bootstrapArguments.push(source.readU2());
        }

        return {
        bootstrapMethodRef:bootstrapMethodRef,
        numBootstrapArguments:numBootstrapArguments,
        bootstrapArguments:bootstrapArguments
        };
    }


    function readMethodParameters(attributeNameIndex, attributeLength):AttributeInfo {
        var numMethodParameters = source.readU1();
        var methodParameters = new Array<MethodParameter>();
        for (i in 0...numMethodParameters) {
            methodParameters.push({
            nameIndex:source.readU2(),
            flag:source.readU4()
            });
        }

        return AttributeInfo.MethodParameters(
            attributeNameIndex,
            attributeLength,
            numMethodParameters,
            methodParameters
        );
    }
}
