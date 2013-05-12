(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
var javap = {}
javap.AttributeParser = function(source,constantPool) {
	this.source = source;
	this.constantPool = constantPool;
};
javap.AttributeParser.__name__ = true;
javap.AttributeParser.prototype = {
	readMethodParameters: function(attributeNameIndex,attributeLength) {
		var numMethodParameters = this.source.readU1();
		var methodParameters = new Array();
		var _g = 0;
		while(_g < numMethodParameters) {
			var i = _g++;
			methodParameters.push({ nameIndex : this.source.readU2(), flag : this.source.readU4()});
		}
		return jvm.klass.AttributeInfo.MethodParameters({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, numMethodParameters : numMethodParameters, methodParameters : methodParameters});
	}
	,readBootstrapMethod: function() {
		var bootstrapMethodRef = this.source.readU2();
		var numBootstrapArguments = this.source.readU2();
		var bootstrapArguments = new Array();
		var _g = 0;
		while(_g < numBootstrapArguments) {
			var i = _g++;
			bootstrapArguments.push(this.source.readU2());
		}
		return { bootstrapMethodRef : bootstrapMethodRef, numBootstrapArguments : numBootstrapArguments, bootstrapArguments : bootstrapArguments};
	}
	,readBootstrapMethods: function(attributeNameIndex,attributeLength) {
		var numBootstrapMethods = this.source.readU2();
		var bootstrapMethods = new Array();
		var _g = 0;
		while(_g < numBootstrapMethods) {
			var i = _g++;
			bootstrapMethods.push(this.readBootstrapMethod());
		}
		return jvm.klass.AttributeInfo.BootstrapMethods({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, bootstrapMethods : bootstrapMethods});
	}
	,readAnnotationDefault: function(attributeNameIndex,attributeLength) {
		var defaultValue = this.readElementValue();
		return jvm.klass.AttributeInfo.AnnotationDefault({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, defaultValue : defaultValue});
	}
	,readRuntimeInvisibleParameterAnnotations: function(attributeNameIndex,attributeLength) {
		var numParameters = this.source.readU1();
		var parameterAnnotations = new Array();
		var _g = 0;
		while(_g < numParameters) {
			var i = _g++;
			var numAnnotations = this.source.readU2();
			var annotations = new Array();
			var _g1 = 0;
			while(_g1 < numAnnotations) {
				var j = _g1++;
				annotations.push(this.readAnnotation());
			}
			parameterAnnotations.push({ numAnnotations : numAnnotations, annotations : annotations});
		}
		return jvm.klass.AttributeInfo.RuntimeInvisibleParameterAnnotations({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, numParameters : numParameters, parameterAnnotations : parameterAnnotations});
	}
	,readRuntimeVisibleParameterAnnotations: function(attributeNameIndex,attributeLength) {
		var numParameters = this.source.readU1();
		var parameterAnnotations = new Array();
		var _g = 0;
		while(_g < numParameters) {
			var i = _g++;
			var numAnnotations = this.source.readU2();
			var annotations = new Array();
			var _g1 = 0;
			while(_g1 < numAnnotations) {
				var j = _g1++;
				annotations.push(this.readAnnotation());
			}
			parameterAnnotations.push({ numAnnotations : numAnnotations, annotations : annotations});
		}
		return jvm.klass.AttributeInfo.RuntimeVisibleParameterAnnotations({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, numParameters : numParameters, parameterAnnotations : parameterAnnotations});
	}
	,readRuntimeInvisibleAnnotations: function(attributeNameIndex,attributeLength) {
		var numAnnotations = this.source.readU2();
		var annotations = new Array();
		var _g = 0;
		while(_g < numAnnotations) {
			var i = _g++;
			annotations.push(this.readAnnotation());
		}
		return jvm.klass.AttributeInfo.RuntimeInvisibleAnnotations({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, numAnnotations : numAnnotations, annotations : annotations});
	}
	,readElementValue: function() {
		var tag = this.source.readU1();
		return (function($this) {
			var $r;
			switch(tag) {
			case 66:
				$r = jvm.klass.ElementValue.ByteType(tag);
				break;
			case 67:
				$r = jvm.klass.ElementValue.CharType(tag);
				break;
			case 68:
				$r = jvm.klass.ElementValue.DoubleType(tag);
				break;
			case 70:
				$r = jvm.klass.ElementValue.FloatType(tag);
				break;
			case 73:
				$r = jvm.klass.ElementValue.IntType(tag);
				break;
			case 74:
				$r = jvm.klass.ElementValue.LongType(tag);
				break;
			case 83:
				$r = jvm.klass.ElementValue.ShortType(tag);
				break;
			case 90:
				$r = jvm.klass.ElementValue.BooleanType(tag);
				break;
			case 115:
				$r = jvm.klass.ElementValue.StringType(tag,$this.source.readU2());
				break;
			case 101:
				$r = (function($this) {
					var $r;
					var enumConstValue = { typeNameIndex : $this.source.readU2(), constNameIndex : $this.source.readU2()};
					$r = jvm.klass.ElementValue.EnumType(tag,enumConstValue);
					return $r;
				}($this));
				break;
			case 99:
				$r = jvm.klass.ElementValue.ClassType(tag,$this.source.readU2());
				break;
			case 64:
				$r = jvm.klass.ElementValue.AnnotationType(tag,$this.source.readU2());
				break;
			case 91:
				$r = (function($this) {
					var $r;
					var numValues = $this.source.readU2();
					var values = new Array();
					{
						var _g = 0;
						while(_g < numValues) {
							var i = _g++;
							values.push($this.readElementValue());
						}
					}
					$r = jvm.klass.ElementValue.ArrayType(tag,numValues,values);
					return $r;
				}($this));
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "LinkageError";
					return $r;
				}($this));
			}
			return $r;
		}(this));
	}
	,readElementValuePair: function() {
		var elementNameIndex = this.source.readU2();
		var value = this.readElementValue();
		return { elementNameIndex : elementNameIndex, value : value};
	}
	,readAnnotation: function() {
		var typeIndex = this.source.readU2();
		var numElementValuePairs = this.source.readU2();
		var elementValuePairs = new Array();
		var _g = 0;
		while(_g < numElementValuePairs) {
			var i = _g++;
			elementValuePairs.push(this.readElementValuePair());
		}
		return { typeIndex : typeIndex, numElementValuePairs : numElementValuePairs, elementValuePairs : elementValuePairs};
	}
	,readRuntimeVisibleAnnotations: function(attributeNameIndex,attributeLength) {
		var numAnnotations = this.source.readU2();
		var annotations = new Array();
		var _g = 0;
		while(_g < numAnnotations) {
			var i = _g++;
			annotations.push(this.readAnnotation());
		}
		return jvm.klass.AttributeInfo.RuntimeVisibleAnnotations({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, numAnnotations : numAnnotations, annotations : annotations});
	}
	,readDeprecated: function(attributeNameIndex,attributeLength) {
		return jvm.klass.AttributeInfo.Deprecated({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength});
	}
	,readLocalVariableTypeTable: function(attributeNameIndex,attributeLength) {
		var localVariableTypeTableLength = this.source.readU2();
		var localVariableTypeTable = new Array();
		var _g = 0;
		while(_g < localVariableTypeTableLength) {
			var i = _g++;
			localVariableTypeTable.push({ startPC : this.source.readU2(), length : this.source.readU2(), nameIndex : this.source.readU2(), signatureIndex : this.source.readU2(), index : this.source.readU2()});
		}
		return jvm.klass.AttributeInfo.LocalVariableTypeTable({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, localVariableTypeTableLength : localVariableTypeTableLength, localVariableTypeTable : localVariableTypeTable});
	}
	,readLocalVariableTable: function(attributeNameIndex,attributeLength) {
		var localVariableTableLength = this.source.readU2();
		var localVariableTable = new Array();
		var _g = 0;
		while(_g < localVariableTableLength) {
			var i = _g++;
			localVariableTable.push({ startPC : this.source.readU2(), length : this.source.readU2(), nameIndex : this.source.readU2(), descriptorIndex : this.source.readU2(), index : this.source.readU2()});
		}
		return jvm.klass.AttributeInfo.LocalVariableTable({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, localVariableTableLength : localVariableTableLength, localVariableTable : localVariableTable});
	}
	,readLineNumberTable: function(attributeNameIndex,attributeLength) {
		var lineNumberTableLength = this.source.readU2();
		var lineNumberTable = new Array();
		var _g = 0;
		while(_g < lineNumberTableLength) {
			var i = _g++;
			lineNumberTable.push({ startPC : this.source.readU2(), lineNumber : this.source.readU2()});
		}
		return jvm.klass.AttributeInfo.LineNumberTable({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, lineNumberTableLength : lineNumberTableLength, lineNumberTable : lineNumberTable});
	}
	,readSourceDebugExtension: function(attributeNameIndex,attributeLength) {
		var debugExtension = new Array();
		var _g = 0;
		while(_g < attributeLength) {
			var i = _g++;
			debugExtension.push(this.source.readU1());
		}
		return jvm.klass.AttributeInfo.SourceDebugExtension({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, debugExtension : debugExtension});
	}
	,readSourceFile: function(attributeNameIndex,attributeLength) {
		return jvm.klass.AttributeInfo.SourceFile({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, sourcefileIndex : this.source.readU2()});
	}
	,readSignature: function(attributeNameIndex,attributeLength) {
		return jvm.klass.AttributeInfo.Signature({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, signatureIndex : this.source.readU2()});
	}
	,readSynthetic: function(attributeNameIndex,attributeLength) {
		return jvm.klass.AttributeInfo.Synthetic({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength});
	}
	,readEnclosingMethod: function(attributeNameIndex,attributeLength) {
		return jvm.klass.AttributeInfo.EnclosingMethod({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, classIndex : this.source.readU2(), methodIndex : this.source.readU2()});
	}
	,readInnerClasses: function(attributeNameIndex,attributeLength) {
		var numberOfClasses = this.source.readU2();
		var classes = new Array();
		var _g = 0;
		while(_g < numberOfClasses) {
			var i = _g++;
			classes.push({ innerClassInfoIndex : this.source.readU2(), outerClassInfoIndex : this.source.readU2(), innerNameIndex : this.source.readU2(), innerClassAccessFlags : this.source.readU2()});
		}
		return jvm.klass.AttributeInfo.InnerClasses({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, numberOfClasses : numberOfClasses, classes : classes});
	}
	,readExceptions: function(attributeNameIndex,attributeLength) {
		var numberOfExceptions = this.source.readU2();
		var exceptionIndexTable = new Array();
		var _g = 0;
		while(_g < numberOfExceptions) {
			var i = _g++;
			exceptionIndexTable.push(this.source.readU2());
		}
		return jvm.klass.AttributeInfo.Exceptions({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, numberOfExceptions : numberOfExceptions, exceptionIndexTable : exceptionIndexTable});
	}
	,readVerificationTypeInfo: function() {
		var tag = this.source.readU1();
		return (function($this) {
			var $r;
			switch(tag) {
			case 0:
				$r = jvm.klass.VerificationTypeInfo.TopVariableInfo({ tag : tag});
				break;
			case 1:
				$r = jvm.klass.VerificationTypeInfo.IntegerVariableInfo({ tag : tag});
				break;
			case 2:
				$r = jvm.klass.VerificationTypeInfo.FloatVariableInfo({ tag : tag});
				break;
			case 3:
				$r = jvm.klass.VerificationTypeInfo.DoubleVariableInfo({ tag : tag});
				break;
			case 4:
				$r = jvm.klass.VerificationTypeInfo.LongVariableInfo({ tag : tag});
				break;
			case 5:
				$r = jvm.klass.VerificationTypeInfo.NullVariableInfo({ tag : tag});
				break;
			case 6:
				$r = jvm.klass.VerificationTypeInfo.UninitializedThisVariableInfo({ tag : tag});
				break;
			case 7:
				$r = (function($this) {
					var $r;
					var cpoolIndex = $this.source.readU2();
					$r = jvm.klass.VerificationTypeInfo.ObjectVariableInfo({ tag : tag, cpoolIndex : cpoolIndex});
					return $r;
				}($this));
				break;
			case 8:
				$r = (function($this) {
					var $r;
					var offset = $this.source.readU2();
					$r = jvm.klass.VerificationTypeInfo.UninitializedVariableInfo({ tag : tag, offset : offset});
					return $r;
				}($this));
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "LinkageError";
					return $r;
				}($this));
			}
			return $r;
		}(this));
	}
	,readStackMapFrame: function() {
		var frameType = this.source.readU1();
		return frameType < 64?jvm.klass.StackMapFrameEntry.SameFrame({ frameType : frameType}):frameType < 128?(function($this) {
			var $r;
			var stack = $this.readVerificationTypeInfo();
			$r = jvm.klass.StackMapFrameEntry.SameLocals1StackItemFrame({ frameType : frameType, stack : stack});
			return $r;
		}(this)):frameType == 247?(function($this) {
			var $r;
			var offsetDelta = $this.source.readU2();
			var stack = $this.readVerificationTypeInfo();
			$r = jvm.klass.StackMapFrameEntry.SameLocals1StackItemFrameExtended({ frameType : frameType, offsetDelta : offsetDelta, stack : stack});
			return $r;
		}(this)):248 <= frameType && frameType <= 250?(function($this) {
			var $r;
			var offsetDelta = $this.source.readU2();
			$r = jvm.klass.StackMapFrameEntry.ChopFrame({ frameType : frameType, offsetDelta : offsetDelta});
			return $r;
		}(this)):frameType == 251?(function($this) {
			var $r;
			var offsetDelta = $this.source.readU2();
			$r = jvm.klass.StackMapFrameEntry.SameFrameExtended({ frameType : frameType, offsetDelta : offsetDelta});
			return $r;
		}(this)):252 <= frameType && frameType <= 254?(function($this) {
			var $r;
			var len = frameType - 251;
			var offsetDelta = $this.source.readU2();
			var locals = new Array();
			{
				var _g = 0;
				while(_g < len) {
					var i = _g++;
					locals.push($this.readVerificationTypeInfo());
				}
			}
			$r = jvm.klass.StackMapFrameEntry.AppendFrame({ frameType : frameType, offsetDelta : offsetDelta, locals : locals});
			return $r;
		}(this)):frameType == 255?(function($this) {
			var $r;
			var offsetDelta = $this.source.readU2();
			var numberOfLocals = $this.source.readU2();
			var locals = new Array();
			{
				var _g = 0;
				while(_g < numberOfLocals) {
					var i = _g++;
					locals.push($this.readVerificationTypeInfo());
				}
			}
			var numberOfStackItems = $this.source.readU2();
			var stack = new Array();
			{
				var _g = 0;
				while(_g < numberOfStackItems) {
					var i = _g++;
					stack.push($this.readVerificationTypeInfo());
				}
			}
			$r = jvm.klass.StackMapFrameEntry.FullFrame({ frameType : frameType, offsetDelta : offsetDelta, numberOfLocals : numberOfLocals, locals : locals, numberOfStackItems : numberOfStackItems, stack : stack});
			return $r;
		}(this)):(function($this) {
			var $r;
			throw "LinkageError";
			return $r;
		}(this));
	}
	,readStackMapTable: function(attributeNameIndex,attributeLength) {
		var numberOfEntries = this.source.readU2();
		var entries = new Array();
		var _g = 0;
		while(_g < numberOfEntries) {
			var i = _g++;
			entries.push(this.readStackMapFrame());
		}
		return jvm.klass.AttributeInfo.StackMapTable({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, numberOfEntries : numberOfEntries, entries : entries});
	}
	,readCode: function(attributeNameIndex,attributeLength) {
		var maxStack = this.source.readU2();
		var maxLocals = this.source.readU2();
		var codeLength = this.source.readU4();
		var code;
		var exceptionTableLength;
		var exceptionTable = new Array();
		var attributesCount;
		var attributes = new Array();
		var codeBinary = new Array();
		var _g = 0;
		while(_g < codeLength) {
			var i = _g++;
			codeBinary.push(this.source.readU1());
		}
		code = javap.ByteCodeParser.parse(codeBinary);
		exceptionTableLength = this.source.readU2();
		var _g = 0;
		while(_g < exceptionTableLength) {
			var i = _g++;
			exceptionTable.push({ startPC : this.source.readU2(), endPC : this.source.readU2(), handlerPC : this.source.readU2(), catchType : this.source.readU2()});
		}
		attributesCount = this.source.readU2();
		var _g = 0;
		while(_g < attributesCount) {
			var i = _g++;
			attributes.push(this.readAttribute());
		}
		return jvm.klass.AttributeInfo.Code({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, maxStack : maxStack, maxLocals : maxLocals, codeLength : codeLength, code : code, exceptionTableLength : exceptionTableLength, exceptionTable : exceptionTable, attributesCount : attributesCount, attributes : attributes});
	}
	,readAttribute: function() {
		var attributeNameIndex = this.source.readU2();
		var attributeLength = this.source.readU4();
		var attributeName = (function($this) {
			var $r;
			var _g = $this.constantPool[attributeNameIndex];
			$r = (function($this) {
				var $r;
				var $e = (_g);
				switch( $e[1] ) {
				case 1:
					var _g_eUtf8Info_0 = $e[2];
					$r = _g_eUtf8Info_0.bytes;
					break;
				default:
					$r = (function($this) {
						var $r;
						throw "LinkageError";
						return $r;
					}($this));
				}
				return $r;
			}($this));
			return $r;
		}(this));
		return (function($this) {
			var $r;
			switch(attributeName) {
			case "ConstantValue":
				$r = jvm.klass.AttributeInfo.ConstantValue({ attributeNameIndex : attributeNameIndex, attributeLength : attributeLength, constantValueIndex : $this.source.readU2()});
				break;
			case "Code":
				$r = $this.readCode(attributeNameIndex,attributeLength);
				break;
			case "StackMapTable":
				$r = $this.readStackMapTable(attributeNameIndex,attributeLength);
				break;
			case "Exceptions":
				$r = $this.readExceptions(attributeNameIndex,attributeLength);
				break;
			case "InnerClasses":
				$r = $this.readInnerClasses(attributeNameIndex,attributeLength);
				break;
			case "EnclosingMethod":
				$r = $this.readEnclosingMethod(attributeNameIndex,attributeLength);
				break;
			case "Synthetic":
				$r = $this.readSynthetic(attributeNameIndex,attributeLength);
				break;
			case "Signature":
				$r = $this.readSignature(attributeNameIndex,attributeLength);
				break;
			case "SourceFile":
				$r = $this.readSourceFile(attributeNameIndex,attributeLength);
				break;
			case "SourceDebugExtension":
				$r = $this.readSourceDebugExtension(attributeNameIndex,attributeLength);
				break;
			case "LineNumberTable":
				$r = $this.readLineNumberTable(attributeNameIndex,attributeLength);
				break;
			case "LocalVariableTable":
				$r = $this.readLocalVariableTable(attributeNameIndex,attributeLength);
				break;
			case "LocalVariableTypeTable":
				$r = $this.readLocalVariableTypeTable(attributeNameIndex,attributeLength);
				break;
			case "Deprecated":
				$r = $this.readDeprecated(attributeNameIndex,attributeLength);
				break;
			case "RuntimeVisibleAnnotations":
				$r = $this.readRuntimeVisibleAnnotations(attributeNameIndex,attributeLength);
				break;
			case "RuntimeInvisibleAnnotations":
				$r = $this.readRuntimeInvisibleAnnotations(attributeNameIndex,attributeLength);
				break;
			case "RuntimeVisibleParameterAnnotations":
				$r = $this.readRuntimeVisibleParameterAnnotations(attributeNameIndex,attributeLength);
				break;
			case "RuntimeInvisibleParameterAnnotations":
				$r = $this.readRuntimeInvisibleParameterAnnotations(attributeNameIndex,attributeLength);
				break;
			case "AnnotationDefault":
				$r = $this.readAnnotationDefault(attributeNameIndex,attributeLength);
				break;
			case "BootstrapMethods":
				$r = $this.readBootstrapMethods(attributeNameIndex,attributeLength);
				break;
			case "MethodParameters":
				$r = $this.readMethodParameters(attributeNameIndex,attributeLength);
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "LinkageError";
					return $r;
				}($this));
			}
			return $r;
		}(this));
	}
}
javap.ByteCodeParser = function() { }
javap.ByteCodeParser.__name__ = true;
javap.ByteCodeParser.parse = function(codeArray) {
	var len = codeArray.length;
	var byteCodeArray = new Array();
	var i = 0;
	while(i < len) {
		var byteCode = javap.ByteCodeParser.parseCode(codeArray,i);
		byteCodeArray.push(byteCode);
		i++;
		i += byteCode.operand.length;
	}
	return byteCodeArray;
}
javap.ByteCodeParser.parseCode = function(codeArray,index) {
	var opcode = codeArray[index];
	if(opcode < 0 || opcode > 201) throw "Illegal opcode: " + opcode;
	var parser = javap.ByteCodeParser.get_PARSER()[opcode].parser;
	return parser(codeArray,index);
}
javap.ByteCodeParser.get_PARSER = function() {
	if(javap.ByteCodeParser.BYTECODE_PARSER == null) {
		javap.ByteCodeParser.BYTECODE_PARSER = new Array();
		javap.ByteCodeParser.BYTECODE_PARSER[0] = javap.ByteCodeParser.bytecode("nop",0);
		javap.ByteCodeParser.BYTECODE_PARSER[1] = javap.ByteCodeParser.bytecode("aconst_null",0);
		javap.ByteCodeParser.BYTECODE_PARSER[2] = javap.ByteCodeParser.bytecode("iconst_m1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[3] = javap.ByteCodeParser.bytecode("iconst_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[4] = javap.ByteCodeParser.bytecode("iconst_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[5] = javap.ByteCodeParser.bytecode("iconst_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[6] = javap.ByteCodeParser.bytecode("iconst_3",0);
		javap.ByteCodeParser.BYTECODE_PARSER[7] = javap.ByteCodeParser.bytecode("iconst_4",0);
		javap.ByteCodeParser.BYTECODE_PARSER[8] = javap.ByteCodeParser.bytecode("iconst_5",0);
		javap.ByteCodeParser.BYTECODE_PARSER[9] = javap.ByteCodeParser.bytecode("lconst_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[10] = javap.ByteCodeParser.bytecode("lconst_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[11] = javap.ByteCodeParser.bytecode("fconst_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[12] = javap.ByteCodeParser.bytecode("fconst_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[13] = javap.ByteCodeParser.bytecode("fconst_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[14] = javap.ByteCodeParser.bytecode("dconst_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[15] = javap.ByteCodeParser.bytecode("dconst_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[16] = javap.ByteCodeParser.bytecode("bipush",1);
		javap.ByteCodeParser.BYTECODE_PARSER[17] = javap.ByteCodeParser.bytecode("sipush",2);
		javap.ByteCodeParser.BYTECODE_PARSER[18] = javap.ByteCodeParser.bytecode("ldc",1);
		javap.ByteCodeParser.BYTECODE_PARSER[19] = javap.ByteCodeParser.bytecode("ldc_w",2);
		javap.ByteCodeParser.BYTECODE_PARSER[20] = javap.ByteCodeParser.bytecode("ldc2_w",2);
		javap.ByteCodeParser.BYTECODE_PARSER[21] = javap.ByteCodeParser.bytecode("iload",1);
		javap.ByteCodeParser.BYTECODE_PARSER[22] = javap.ByteCodeParser.bytecode("lload",1);
		javap.ByteCodeParser.BYTECODE_PARSER[23] = javap.ByteCodeParser.bytecode("fload",1);
		javap.ByteCodeParser.BYTECODE_PARSER[24] = javap.ByteCodeParser.bytecode("dload",1);
		javap.ByteCodeParser.BYTECODE_PARSER[25] = javap.ByteCodeParser.bytecode("aload",1);
		javap.ByteCodeParser.BYTECODE_PARSER[26] = javap.ByteCodeParser.bytecode("iload_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[27] = javap.ByteCodeParser.bytecode("iload_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[28] = javap.ByteCodeParser.bytecode("iload_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[29] = javap.ByteCodeParser.bytecode("iload_3",0);
		javap.ByteCodeParser.BYTECODE_PARSER[30] = javap.ByteCodeParser.bytecode("lload_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[31] = javap.ByteCodeParser.bytecode("lload_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[32] = javap.ByteCodeParser.bytecode("lload_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[33] = javap.ByteCodeParser.bytecode("lload_3",0);
		javap.ByteCodeParser.BYTECODE_PARSER[34] = javap.ByteCodeParser.bytecode("fload_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[35] = javap.ByteCodeParser.bytecode("fload_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[36] = javap.ByteCodeParser.bytecode("fload_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[37] = javap.ByteCodeParser.bytecode("fload_3",0);
		javap.ByteCodeParser.BYTECODE_PARSER[38] = javap.ByteCodeParser.bytecode("dload_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[39] = javap.ByteCodeParser.bytecode("dload_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[40] = javap.ByteCodeParser.bytecode("dload_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[41] = javap.ByteCodeParser.bytecode("dload_3",0);
		javap.ByteCodeParser.BYTECODE_PARSER[42] = javap.ByteCodeParser.bytecode("aload_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[43] = javap.ByteCodeParser.bytecode("aload_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[44] = javap.ByteCodeParser.bytecode("aload_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[45] = javap.ByteCodeParser.bytecode("aload_3",0);
		javap.ByteCodeParser.BYTECODE_PARSER[46] = javap.ByteCodeParser.bytecode("iaload",0);
		javap.ByteCodeParser.BYTECODE_PARSER[47] = javap.ByteCodeParser.bytecode("laload",0);
		javap.ByteCodeParser.BYTECODE_PARSER[48] = javap.ByteCodeParser.bytecode("faload",0);
		javap.ByteCodeParser.BYTECODE_PARSER[49] = javap.ByteCodeParser.bytecode("daload",0);
		javap.ByteCodeParser.BYTECODE_PARSER[50] = javap.ByteCodeParser.bytecode("aaload",0);
		javap.ByteCodeParser.BYTECODE_PARSER[51] = javap.ByteCodeParser.bytecode("baload",0);
		javap.ByteCodeParser.BYTECODE_PARSER[52] = javap.ByteCodeParser.bytecode("caload",0);
		javap.ByteCodeParser.BYTECODE_PARSER[53] = javap.ByteCodeParser.bytecode("saload",0);
		javap.ByteCodeParser.BYTECODE_PARSER[54] = javap.ByteCodeParser.bytecode("istore",1);
		javap.ByteCodeParser.BYTECODE_PARSER[55] = javap.ByteCodeParser.bytecode("lstore",1);
		javap.ByteCodeParser.BYTECODE_PARSER[56] = javap.ByteCodeParser.bytecode("fstore",1);
		javap.ByteCodeParser.BYTECODE_PARSER[57] = javap.ByteCodeParser.bytecode("dstore",1);
		javap.ByteCodeParser.BYTECODE_PARSER[58] = javap.ByteCodeParser.bytecode("astore",1);
		javap.ByteCodeParser.BYTECODE_PARSER[59] = javap.ByteCodeParser.bytecode("istore_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[60] = javap.ByteCodeParser.bytecode("istore_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[61] = javap.ByteCodeParser.bytecode("istore_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[62] = javap.ByteCodeParser.bytecode("istore_3",0);
		javap.ByteCodeParser.BYTECODE_PARSER[63] = javap.ByteCodeParser.bytecode("lstore_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[64] = javap.ByteCodeParser.bytecode("lstore_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[65] = javap.ByteCodeParser.bytecode("lstore_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[66] = javap.ByteCodeParser.bytecode("lstore_3",0);
		javap.ByteCodeParser.BYTECODE_PARSER[67] = javap.ByteCodeParser.bytecode("fstore_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[68] = javap.ByteCodeParser.bytecode("fstore_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[69] = javap.ByteCodeParser.bytecode("fstore_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[70] = javap.ByteCodeParser.bytecode("fstore_3",0);
		javap.ByteCodeParser.BYTECODE_PARSER[71] = javap.ByteCodeParser.bytecode("dstore_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[72] = javap.ByteCodeParser.bytecode("dstore_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[73] = javap.ByteCodeParser.bytecode("dstore_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[74] = javap.ByteCodeParser.bytecode("dstore_3",0);
		javap.ByteCodeParser.BYTECODE_PARSER[75] = javap.ByteCodeParser.bytecode("astore_0",0);
		javap.ByteCodeParser.BYTECODE_PARSER[76] = javap.ByteCodeParser.bytecode("astore_1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[77] = javap.ByteCodeParser.bytecode("astore_2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[78] = javap.ByteCodeParser.bytecode("astore_3",0);
		javap.ByteCodeParser.BYTECODE_PARSER[79] = javap.ByteCodeParser.bytecode("iastore",0);
		javap.ByteCodeParser.BYTECODE_PARSER[80] = javap.ByteCodeParser.bytecode("lastore",0);
		javap.ByteCodeParser.BYTECODE_PARSER[81] = javap.ByteCodeParser.bytecode("fastore",0);
		javap.ByteCodeParser.BYTECODE_PARSER[82] = javap.ByteCodeParser.bytecode("dastore",0);
		javap.ByteCodeParser.BYTECODE_PARSER[83] = javap.ByteCodeParser.bytecode("aastore",0);
		javap.ByteCodeParser.BYTECODE_PARSER[84] = javap.ByteCodeParser.bytecode("bastore",0);
		javap.ByteCodeParser.BYTECODE_PARSER[85] = javap.ByteCodeParser.bytecode("castore",0);
		javap.ByteCodeParser.BYTECODE_PARSER[86] = javap.ByteCodeParser.bytecode("sastore",0);
		javap.ByteCodeParser.BYTECODE_PARSER[87] = javap.ByteCodeParser.bytecode("pop",0);
		javap.ByteCodeParser.BYTECODE_PARSER[88] = javap.ByteCodeParser.bytecode("pop2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[89] = javap.ByteCodeParser.bytecode("dup",0);
		javap.ByteCodeParser.BYTECODE_PARSER[90] = javap.ByteCodeParser.bytecode("dup_x1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[91] = javap.ByteCodeParser.bytecode("dup_x2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[92] = javap.ByteCodeParser.bytecode("dup2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[93] = javap.ByteCodeParser.bytecode("dup2_x1",0);
		javap.ByteCodeParser.BYTECODE_PARSER[94] = javap.ByteCodeParser.bytecode("dup2_x2",0);
		javap.ByteCodeParser.BYTECODE_PARSER[95] = javap.ByteCodeParser.bytecode("swap",0);
		javap.ByteCodeParser.BYTECODE_PARSER[96] = javap.ByteCodeParser.bytecode("iadd",0);
		javap.ByteCodeParser.BYTECODE_PARSER[97] = javap.ByteCodeParser.bytecode("ladd",0);
		javap.ByteCodeParser.BYTECODE_PARSER[98] = javap.ByteCodeParser.bytecode("fadd",0);
		javap.ByteCodeParser.BYTECODE_PARSER[99] = javap.ByteCodeParser.bytecode("dadd",0);
		javap.ByteCodeParser.BYTECODE_PARSER[100] = javap.ByteCodeParser.bytecode("isub",0);
		javap.ByteCodeParser.BYTECODE_PARSER[101] = javap.ByteCodeParser.bytecode("lsub",0);
		javap.ByteCodeParser.BYTECODE_PARSER[102] = javap.ByteCodeParser.bytecode("fsub",0);
		javap.ByteCodeParser.BYTECODE_PARSER[103] = javap.ByteCodeParser.bytecode("dsub",0);
		javap.ByteCodeParser.BYTECODE_PARSER[104] = javap.ByteCodeParser.bytecode("imul",0);
		javap.ByteCodeParser.BYTECODE_PARSER[105] = javap.ByteCodeParser.bytecode("lmul",0);
		javap.ByteCodeParser.BYTECODE_PARSER[106] = javap.ByteCodeParser.bytecode("fmul",0);
		javap.ByteCodeParser.BYTECODE_PARSER[107] = javap.ByteCodeParser.bytecode("dmul",0);
		javap.ByteCodeParser.BYTECODE_PARSER[108] = javap.ByteCodeParser.bytecode("idiv",0);
		javap.ByteCodeParser.BYTECODE_PARSER[109] = javap.ByteCodeParser.bytecode("ldiv",0);
		javap.ByteCodeParser.BYTECODE_PARSER[110] = javap.ByteCodeParser.bytecode("fdiv",0);
		javap.ByteCodeParser.BYTECODE_PARSER[111] = javap.ByteCodeParser.bytecode("ddiv",0);
		javap.ByteCodeParser.BYTECODE_PARSER[112] = javap.ByteCodeParser.bytecode("irem",0);
		javap.ByteCodeParser.BYTECODE_PARSER[113] = javap.ByteCodeParser.bytecode("lrem",0);
		javap.ByteCodeParser.BYTECODE_PARSER[114] = javap.ByteCodeParser.bytecode("frem",0);
		javap.ByteCodeParser.BYTECODE_PARSER[115] = javap.ByteCodeParser.bytecode("drem",0);
		javap.ByteCodeParser.BYTECODE_PARSER[116] = javap.ByteCodeParser.bytecode("ineg",0);
		javap.ByteCodeParser.BYTECODE_PARSER[117] = javap.ByteCodeParser.bytecode("lneg",0);
		javap.ByteCodeParser.BYTECODE_PARSER[118] = javap.ByteCodeParser.bytecode("fneg",0);
		javap.ByteCodeParser.BYTECODE_PARSER[119] = javap.ByteCodeParser.bytecode("dneg",0);
		javap.ByteCodeParser.BYTECODE_PARSER[120] = javap.ByteCodeParser.bytecode("ishl",0);
		javap.ByteCodeParser.BYTECODE_PARSER[121] = javap.ByteCodeParser.bytecode("lshl",0);
		javap.ByteCodeParser.BYTECODE_PARSER[122] = javap.ByteCodeParser.bytecode("ishr",0);
		javap.ByteCodeParser.BYTECODE_PARSER[123] = javap.ByteCodeParser.bytecode("lshr",0);
		javap.ByteCodeParser.BYTECODE_PARSER[124] = javap.ByteCodeParser.bytecode("iushr",0);
		javap.ByteCodeParser.BYTECODE_PARSER[125] = javap.ByteCodeParser.bytecode("lushr",0);
		javap.ByteCodeParser.BYTECODE_PARSER[126] = javap.ByteCodeParser.bytecode("iadn",0);
		javap.ByteCodeParser.BYTECODE_PARSER[127] = javap.ByteCodeParser.bytecode("land",0);
		javap.ByteCodeParser.BYTECODE_PARSER[128] = javap.ByteCodeParser.bytecode("ior",0);
		javap.ByteCodeParser.BYTECODE_PARSER[129] = javap.ByteCodeParser.bytecode("lor",0);
		javap.ByteCodeParser.BYTECODE_PARSER[130] = javap.ByteCodeParser.bytecode("ixor",0);
		javap.ByteCodeParser.BYTECODE_PARSER[131] = javap.ByteCodeParser.bytecode("lxor",0);
		javap.ByteCodeParser.BYTECODE_PARSER[132] = javap.ByteCodeParser.bytecode("iinc",2);
		javap.ByteCodeParser.BYTECODE_PARSER[133] = javap.ByteCodeParser.bytecode("i2l",0);
		javap.ByteCodeParser.BYTECODE_PARSER[134] = javap.ByteCodeParser.bytecode("i2f",0);
		javap.ByteCodeParser.BYTECODE_PARSER[135] = javap.ByteCodeParser.bytecode("i2d",0);
		javap.ByteCodeParser.BYTECODE_PARSER[136] = javap.ByteCodeParser.bytecode("l2i",0);
		javap.ByteCodeParser.BYTECODE_PARSER[137] = javap.ByteCodeParser.bytecode("l2f",0);
		javap.ByteCodeParser.BYTECODE_PARSER[138] = javap.ByteCodeParser.bytecode("l2d",0);
		javap.ByteCodeParser.BYTECODE_PARSER[139] = javap.ByteCodeParser.bytecode("f2i",0);
		javap.ByteCodeParser.BYTECODE_PARSER[140] = javap.ByteCodeParser.bytecode("f2l",0);
		javap.ByteCodeParser.BYTECODE_PARSER[141] = javap.ByteCodeParser.bytecode("f2d",0);
		javap.ByteCodeParser.BYTECODE_PARSER[142] = javap.ByteCodeParser.bytecode("d2i",0);
		javap.ByteCodeParser.BYTECODE_PARSER[143] = javap.ByteCodeParser.bytecode("d2l",0);
		javap.ByteCodeParser.BYTECODE_PARSER[144] = javap.ByteCodeParser.bytecode("d2f",0);
		javap.ByteCodeParser.BYTECODE_PARSER[145] = javap.ByteCodeParser.bytecode("i2b",0);
		javap.ByteCodeParser.BYTECODE_PARSER[146] = javap.ByteCodeParser.bytecode("i2c",0);
		javap.ByteCodeParser.BYTECODE_PARSER[147] = javap.ByteCodeParser.bytecode("i2s",0);
		javap.ByteCodeParser.BYTECODE_PARSER[148] = javap.ByteCodeParser.bytecode("lcmp",0);
		javap.ByteCodeParser.BYTECODE_PARSER[149] = javap.ByteCodeParser.bytecode("fcmpl",0);
		javap.ByteCodeParser.BYTECODE_PARSER[150] = javap.ByteCodeParser.bytecode("fcmpg",0);
		javap.ByteCodeParser.BYTECODE_PARSER[151] = javap.ByteCodeParser.bytecode("dcmpl",0);
		javap.ByteCodeParser.BYTECODE_PARSER[152] = javap.ByteCodeParser.bytecode("dcmpg",0);
		javap.ByteCodeParser.BYTECODE_PARSER[153] = javap.ByteCodeParser.bytecode("ifeq",2);
		javap.ByteCodeParser.BYTECODE_PARSER[154] = javap.ByteCodeParser.bytecode("ifne",2);
		javap.ByteCodeParser.BYTECODE_PARSER[155] = javap.ByteCodeParser.bytecode("iflt",2);
		javap.ByteCodeParser.BYTECODE_PARSER[156] = javap.ByteCodeParser.bytecode("ifge",2);
		javap.ByteCodeParser.BYTECODE_PARSER[157] = javap.ByteCodeParser.bytecode("ifgt",2);
		javap.ByteCodeParser.BYTECODE_PARSER[158] = javap.ByteCodeParser.bytecode("ifle",2);
		javap.ByteCodeParser.BYTECODE_PARSER[159] = javap.ByteCodeParser.bytecode("if_icmpeq",2);
		javap.ByteCodeParser.BYTECODE_PARSER[160] = javap.ByteCodeParser.bytecode("if_icmpne",2);
		javap.ByteCodeParser.BYTECODE_PARSER[161] = javap.ByteCodeParser.bytecode("if_icmplt",2);
		javap.ByteCodeParser.BYTECODE_PARSER[162] = javap.ByteCodeParser.bytecode("if_icmpge",2);
		javap.ByteCodeParser.BYTECODE_PARSER[163] = javap.ByteCodeParser.bytecode("if_icmpgt",2);
		javap.ByteCodeParser.BYTECODE_PARSER[164] = javap.ByteCodeParser.bytecode("if_icmple",2);
		javap.ByteCodeParser.BYTECODE_PARSER[165] = javap.ByteCodeParser.bytecode("if_acmpeq",2);
		javap.ByteCodeParser.BYTECODE_PARSER[166] = javap.ByteCodeParser.bytecode("if_acmpne",2);
		javap.ByteCodeParser.BYTECODE_PARSER[167] = javap.ByteCodeParser.bytecode("goto",2);
		javap.ByteCodeParser.BYTECODE_PARSER[168] = javap.ByteCodeParser.bytecode("jsr",2);
		javap.ByteCodeParser.BYTECODE_PARSER[169] = javap.ByteCodeParser.bytecode("ret",1);
		javap.ByteCodeParser.BYTECODE_PARSER[170] = javap.ByteCodeParser.bytecode("tableswitch");
		javap.ByteCodeParser.BYTECODE_PARSER[171] = javap.ByteCodeParser.bytecode("lookupswitch");
		javap.ByteCodeParser.BYTECODE_PARSER[172] = javap.ByteCodeParser.bytecode("ireturn",0);
		javap.ByteCodeParser.BYTECODE_PARSER[173] = javap.ByteCodeParser.bytecode("lreturn",0);
		javap.ByteCodeParser.BYTECODE_PARSER[174] = javap.ByteCodeParser.bytecode("freturn",0);
		javap.ByteCodeParser.BYTECODE_PARSER[175] = javap.ByteCodeParser.bytecode("dreturn",0);
		javap.ByteCodeParser.BYTECODE_PARSER[176] = javap.ByteCodeParser.bytecode("areturn",0);
		javap.ByteCodeParser.BYTECODE_PARSER[177] = javap.ByteCodeParser.bytecode("return",0);
		javap.ByteCodeParser.BYTECODE_PARSER[178] = javap.ByteCodeParser.bytecode("getstatic",2);
		javap.ByteCodeParser.BYTECODE_PARSER[179] = javap.ByteCodeParser.bytecode("putstatic",2);
		javap.ByteCodeParser.BYTECODE_PARSER[180] = javap.ByteCodeParser.bytecode("getfield",2);
		javap.ByteCodeParser.BYTECODE_PARSER[181] = javap.ByteCodeParser.bytecode("putfield",2);
		javap.ByteCodeParser.BYTECODE_PARSER[182] = javap.ByteCodeParser.bytecode("invokevirtual",2);
		javap.ByteCodeParser.BYTECODE_PARSER[183] = javap.ByteCodeParser.bytecode("involespecial",2);
		javap.ByteCodeParser.BYTECODE_PARSER[184] = javap.ByteCodeParser.bytecode("invokestatic",2);
		javap.ByteCodeParser.BYTECODE_PARSER[185] = javap.ByteCodeParser.bytecode("invokeinterface",4);
		javap.ByteCodeParser.BYTECODE_PARSER[186] = javap.ByteCodeParser.bytecode("invokedynamic",4);
		javap.ByteCodeParser.BYTECODE_PARSER[187] = javap.ByteCodeParser.bytecode("new",2);
		javap.ByteCodeParser.BYTECODE_PARSER[188] = javap.ByteCodeParser.bytecode("newarray",1);
		javap.ByteCodeParser.BYTECODE_PARSER[189] = javap.ByteCodeParser.bytecode("anewarray",2);
		javap.ByteCodeParser.BYTECODE_PARSER[190] = javap.ByteCodeParser.bytecode("arraylength",0);
		javap.ByteCodeParser.BYTECODE_PARSER[191] = javap.ByteCodeParser.bytecode("athrow",0);
		javap.ByteCodeParser.BYTECODE_PARSER[192] = javap.ByteCodeParser.bytecode("checkcast",2);
		javap.ByteCodeParser.BYTECODE_PARSER[193] = javap.ByteCodeParser.bytecode("instanceof",2);
		javap.ByteCodeParser.BYTECODE_PARSER[194] = javap.ByteCodeParser.bytecode("monitorenter",0);
		javap.ByteCodeParser.BYTECODE_PARSER[195] = javap.ByteCodeParser.bytecode("monitorexit",0);
		javap.ByteCodeParser.BYTECODE_PARSER[196] = javap.ByteCodeParser.bytecode("wide");
		javap.ByteCodeParser.BYTECODE_PARSER[197] = javap.ByteCodeParser.bytecode("multianewarray",3);
		javap.ByteCodeParser.BYTECODE_PARSER[198] = javap.ByteCodeParser.bytecode("ifnull",2);
		javap.ByteCodeParser.BYTECODE_PARSER[199] = javap.ByteCodeParser.bytecode("ifnonnull",2);
		javap.ByteCodeParser.BYTECODE_PARSER[200] = javap.ByteCodeParser.bytecode("goto_w",4);
		javap.ByteCodeParser.BYTECODE_PARSER[201] = javap.ByteCodeParser.bytecode("jsr_w",4);
		javap.ByteCodeParser.BYTECODE_PARSER[202] = javap.ByteCodeParser.bytecode("breakpoint");
		javap.ByteCodeParser.BYTECODE_PARSER[254] = javap.ByteCodeParser.bytecode("impdep1");
		javap.ByteCodeParser.BYTECODE_PARSER[255] = javap.ByteCodeParser.bytecode("impdep2");
	}
	return javap.ByteCodeParser.BYTECODE_PARSER;
}
javap.ByteCodeParser.bytecode = function(name,num) {
	var fn = null;
	if(name == "tableswitch") fn = javap.ByteCodeParser.parseTableswitch; else if(name == "lookupswitch") fn = javap.ByteCodeParser.parseLookupswitch; else if(name == "wide") fn = javap.ByteCodeParser.parseWide; else if(num == 0) fn = javap.ByteCodeParser.parse0; else if(num == 1) fn = javap.ByteCodeParser.parse1; else if(num == 2) fn = javap.ByteCodeParser.parse2; else if(num == 3) fn = javap.ByteCodeParser.parse3; else if(num == 4) fn = javap.ByteCodeParser.parse4;
	return { name : name, parser : fn};
}
javap.ByteCodeParser.parse0 = function(codeArray,index) {
	return { pc : index, opcode : codeArray[index], operand : []};
}
javap.ByteCodeParser.parse1 = function(codeArray,index) {
	return { pc : index, opcode : codeArray[index], operand : [codeArray[index + 1]]};
}
javap.ByteCodeParser.parse2 = function(codeArray,index) {
	return { pc : index, opcode : codeArray[index], operand : [codeArray[index + 1],codeArray[index + 2]]};
}
javap.ByteCodeParser.parse3 = function(codeArray,index) {
	return { pc : index, opcode : codeArray[index], operand : [codeArray[index + 1],codeArray[index + 2],codeArray[index + 3]]};
}
javap.ByteCodeParser.parse4 = function(codeArray,index) {
	return { pc : index, opcode : codeArray[index], operand : [codeArray[index + 1],codeArray[index + 2],codeArray[index + 3],codeArray[index + 4]]};
}
javap.ByteCodeParser.parseTableswitch = function(codeArray,index) {
	var defaultByteIndex = index + 1;
	while(defaultByteIndex % 4 != 0) defaultByteIndex++;
	var low = codeArray[defaultByteIndex + 4] << 24 | codeArray[defaultByteIndex + 5] << 16 | codeArray[defaultByteIndex + 6] << 8 | codeArray[defaultByteIndex + 7];
	var high = codeArray[defaultByteIndex + 8] << 24 | codeArray[defaultByteIndex + 9] << 16 | codeArray[defaultByteIndex + 10] << 8 | codeArray[defaultByteIndex + 11];
	var numJumpOffset = high - low + 1;
	var len = defaultByteIndex + (3 + numJumpOffset) * 4 - index + 1;
	var i = index + 1;
	var operand = new Array();
	while(i < len) {
		operand.push(codeArray[i]);
		i++;
	}
	return { pc : index, opcode : codeArray[index], operand : operand};
}
javap.ByteCodeParser.parseLookupswitch = function(codeArray,index) {
	var defaultByteIndex = index + 1;
	while(defaultByteIndex % 4 != 0) defaultByteIndex++;
	var npairs = codeArray[defaultByteIndex + 4] << 24 | codeArray[defaultByteIndex + 5] << 16 | codeArray[defaultByteIndex + 6] << 8 | codeArray[defaultByteIndex + 7];
	var len = defaultByteIndex + (2 + npairs * 2) * 4 - index + 1;
	var i = index + 1;
	var operand = new Array();
	while(i < len) {
		operand.push(codeArray[i]);
		i++;
	}
	return { pc : index, opcode : codeArray[index], operand : operand};
}
javap.ByteCodeParser.parseWide = function(codeArray,index) {
	var operand;
	if(codeArray[index + 1] == 132) operand = [codeArray[index + 1],codeArray[index + 2],codeArray[index + 3]]; else operand = [codeArray[index + 1],codeArray[index + 2],codeArray[index + 3],codeArray[index + 4],codeArray[index + 5]];
	return { pc : index, opcode : codeArray[index], operand : operand};
}
javap.ClassFileParser = function(source) {
	this.klass = new jvm.klass.Klass();
	this.source = source;
};
javap.ClassFileParser.__name__ = true;
javap.ClassFileParser.prototype = {
	readAttributes: function() {
		var count = this.klass.attributesCount;
		var attributeParser = new javap.AttributeParser(this.source,this.klass.constantPool);
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			this.klass.attributes.push(attributeParser.readAttribute());
		}
	}
	,readAttributesCount: function() {
		this.klass.attributesCount = this.source.readU2();
	}
	,readMethodInfo: function() {
		var accessFlags = this.source.readU2();
		var nameIndex = this.source.readU2();
		var descriptorIndex = this.source.readU2();
		var attributesCount = this.source.readU2();
		var attributes = new Array();
		var attributeParser = new javap.AttributeParser(this.source,this.klass.constantPool);
		var _g = 0;
		while(_g < attributesCount) {
			var i = _g++;
			attributes.push(attributeParser.readAttribute());
		}
		return { accessFlags : accessFlags, nameIndex : nameIndex, descriptorIndex : descriptorIndex, attributesCount : attributesCount, attributes : attributes};
	}
	,readMethods: function() {
		var count = this.klass.methodsCount;
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			this.klass.methods.push(this.readMethodInfo());
		}
	}
	,readMethodsCount: function() {
		this.klass.methodsCount = this.source.readU2();
	}
	,readFieldInfo: function() {
		var accessFlags = this.source.readU2();
		var nameIndex = this.source.readU2();
		var descriptorIndex = this.source.readU2();
		var attributeCount = this.source.readU2();
		var attributes = new Array();
		var attributeParser = new javap.AttributeParser(this.source,this.klass.constantPool);
		var _g = 0;
		while(_g < attributeCount) {
			var i = _g++;
			attributes.push(attributeParser.readAttribute());
		}
		return { accessFlags : accessFlags, nameIndex : nameIndex, descriptorIndex : descriptorIndex, attributeCount : attributeCount, attributes : attributes};
	}
	,readFields: function() {
		var count = this.klass.fieldsCount;
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			this.klass.fields.push(this.readFieldInfo());
		}
	}
	,readFieldsCount: function() {
		this.klass.fieldsCount = this.source.readU2();
	}
	,readInterfaces: function() {
		var count = this.klass.interfacesCount;
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			this.klass.interfaces.push(this.source.readU2());
		}
	}
	,readInterfacesCount: function() {
		this.klass.interfacesCount = this.source.readU2();
	}
	,readSuperClass: function() {
		this.klass.superClass = this.source.readU2();
	}
	,readThisClass: function() {
		this.klass.thisClass = this.source.readU2();
	}
	,readAccessFlags: function() {
		this.klass.accessFlags = this.source.readU2();
	}
	,readConstantPool: function() {
		var count = this.klass.constantPoolCount;
		this.klass.constantPool.push(jvm.klass.ConstantPoolInfo.Empty);
		var constantPoolParser = new javap.ConstantPoolParser(this.source);
		var i = 1;
		while(i < count) {
			var info = constantPoolParser.readConstantPoolInfo();
			this.klass.constantPool.push(info);
			switch( (info)[1] ) {
			case 4:
			case 5:
				this.klass.constantPool.push(jvm.klass.ConstantPoolInfo.Empty);
				i++;
				break;
			default:
			}
			i++;
		}
	}
	,readConstantPoolCount: function() {
		this.klass.constantPoolCount = this.source.readU2();
	}
	,readMajorVersion: function() {
		this.klass.majorVersion = this.source.readU2();
	}
	,readMinorVersion: function() {
		this.klass.minorVersion = this.source.readU2();
	}
	,readMagic: function() {
		this.klass.magic = this.source.readU4();
	}
	,parse: function() {
		try {
			this.readMagic();
			this.readMinorVersion();
			this.readMajorVersion();
			this.readConstantPoolCount();
			this.readConstantPool();
			this.readAccessFlags();
			this.readThisClass();
			this.readSuperClass();
			this.readInterfacesCount();
			this.readInterfaces();
			this.readFieldsCount();
			this.readFields();
			this.readMethodsCount();
			this.readMethods();
			this.readAttributesCount();
			this.readAttributes();
		} catch( e ) {
			console.log(e);
		}
		return this.klass;
	}
}
javap.ClassSource = function(binary) {
	this.offset = 0;
	this.dataView = new DataView(binary);
};
javap.ClassSource.__name__ = true;
javap.ClassSource.prototype = {
	readU4: function() {
		var bytes = this.dataView.getUint32(this.offset,false);
		this.offset += 4;
		return bytes;
	}
	,readU2: function() {
		var bytes = this.dataView.getUint16(this.offset,false) & 65535;
		this.offset += 2;
		return bytes;
	}
	,readU1: function() {
		var $byte = this.dataView.getInt8(this.offset) & 255;
		this.offset += 1;
		return $byte;
	}
}
javap.ConstantPoolParser = function(source) {
	this.source = source;
};
javap.ConstantPoolParser.__name__ = true;
javap.ConstantPoolParser.prototype = {
	readConstantUTF8: function(tag) {
		var length = this.source.readU2();
		var bytes = new StringBuf();
		var i = 0;
		while(i < length) {
			var c;
			var b = this.source.readU1();
			if(b <= 127) bytes.b += String.fromCharCode(b); else if(b <= 223) {
				c = (b & 31) << 6;
				i++;
				c += this.source.readU1() & 63;
				bytes.b += String.fromCharCode(c);
			} else if(b <= 239) {
				c = (b & 15) << 12;
				i++;
				c += (this.source.readU1() & 63) << 6;
				i++;
				c += this.source.readU1() & 63;
				bytes.b += String.fromCharCode(c);
			} else {
				i++;
				c = (b & 15) << 6;
				i++;
				c += this.source.readU1() & 63;
				bytes.b += String.fromCharCode(c);
				i++;
				this.source.readU1();
				i++;
				c = (b & 15) << 6;
				i++;
				c += this.source.readU1() & 63;
				bytes.b += String.fromCharCode(c);
			}
			i++;
		}
		return jvm.klass.ConstantPoolInfo.Utf8Info({ tag : tag, length : length, bytes : bytes.b});
	}
	,readConstantPoolInfo: function() {
		var tag = this.source.readU1();
		console.log(tag);
		var info;
		switch(tag) {
		case 1:
			info = this.readConstantUTF8(tag);
			break;
		case 3:
			info = jvm.klass.ConstantPoolInfo.IntegerInfo({ tag : tag, bytes : this.source.readU4()});
			break;
		case 4:
			info = jvm.klass.ConstantPoolInfo.FloatInfo({ tag : tag, bytes : this.source.readU4()});
			break;
		case 5:
			info = jvm.klass.ConstantPoolInfo.LongInfo({ tag : tag, highBytes : this.source.readU4(), lowBytes : this.source.readU4()});
			break;
		case 6:
			info = jvm.klass.ConstantPoolInfo.DoubleInfo({ tag : tag, highBytes : this.source.readU4(), lowBytes : this.source.readU4()});
			break;
		case 7:
			info = jvm.klass.ConstantPoolInfo.ClassInfo({ tag : tag, nameIndex : this.source.readU2()});
			break;
		case 8:
			info = jvm.klass.ConstantPoolInfo.StringInfo({ tag : tag, stringIndex : this.source.readU2()});
			break;
		case 9:
			info = jvm.klass.ConstantPoolInfo.FieldrefInfo({ tag : tag, classIndex : this.source.readU2(), nameAndTypeIndex : this.source.readU2()});
			break;
		case 10:
			info = jvm.klass.ConstantPoolInfo.MethodrefInfo({ tag : tag, classIndex : this.source.readU2(), nameAndTypeIndex : this.source.readU2()});
			break;
		case 11:
			info = jvm.klass.ConstantPoolInfo.InterfaceMethodrefInfo({ tag : tag, classIndex : this.source.readU2(), nameAndTypeIndex : this.source.readU2()});
			break;
		case 12:
			info = jvm.klass.ConstantPoolInfo.NameAndTypeInfo({ tag : tag, nameIndex : this.source.readU2(), descriptorIndex : this.source.readU2()});
			break;
		case 15:
			info = jvm.klass.ConstantPoolInfo.MethodHandleInfo({ tag : tag, referenceKind : this.source.readU1(), referenceIndex : this.source.readU2()});
			break;
		case 16:
			info = jvm.klass.ConstantPoolInfo.ConstantMethodTypeInfo({ tag : tag, descriptorIndex : this.source.readU2()});
			break;
		case 18:
			info = jvm.klass.ConstantPoolInfo.ConstantInvokeDynamicInfo({ tag : tag, bootstrapMethodAttrIndex : this.source.readU2(), nameAndTypeIndex : this.source.readU2()});
			break;
		default:
			throw "LinkageError";
		}
		return info;
	}
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
var jvm = {}
jvm.klass = {}
jvm.klass.AttributeInfo = { __ename__ : true, __constructs__ : ["ConstantValue","Code","StackMapTable","Exceptions","InnerClasses","EnclosingMethod","Synthetic","Signature","SourceFile","SourceDebugExtension","LineNumberTable","LocalVariableTable","LocalVariableTypeTable","Deprecated","RuntimeVisibleAnnotations","RuntimeInvisibleAnnotations","RuntimeVisibleParameterAnnotations","RuntimeInvisibleParameterAnnotations","AnnotationDefault","BootstrapMethods","MethodParameters"] }
jvm.klass.AttributeInfo.ConstantValue = function(body) { var $x = ["ConstantValue",0,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.Code = function(body) { var $x = ["Code",1,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.StackMapTable = function(body) { var $x = ["StackMapTable",2,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.Exceptions = function(body) { var $x = ["Exceptions",3,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.InnerClasses = function(body) { var $x = ["InnerClasses",4,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.EnclosingMethod = function(body) { var $x = ["EnclosingMethod",5,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.Synthetic = function(body) { var $x = ["Synthetic",6,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.Signature = function(body) { var $x = ["Signature",7,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.SourceFile = function(body) { var $x = ["SourceFile",8,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.SourceDebugExtension = function(body) { var $x = ["SourceDebugExtension",9,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.LineNumberTable = function(body) { var $x = ["LineNumberTable",10,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.LocalVariableTable = function(body) { var $x = ["LocalVariableTable",11,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.LocalVariableTypeTable = function(body) { var $x = ["LocalVariableTypeTable",12,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.Deprecated = function(body) { var $x = ["Deprecated",13,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.RuntimeVisibleAnnotations = function(body) { var $x = ["RuntimeVisibleAnnotations",14,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.RuntimeInvisibleAnnotations = function(body) { var $x = ["RuntimeInvisibleAnnotations",15,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.RuntimeVisibleParameterAnnotations = function(body) { var $x = ["RuntimeVisibleParameterAnnotations",16,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.RuntimeInvisibleParameterAnnotations = function(body) { var $x = ["RuntimeInvisibleParameterAnnotations",17,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.AnnotationDefault = function(body) { var $x = ["AnnotationDefault",18,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.BootstrapMethods = function(body) { var $x = ["BootstrapMethods",19,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.AttributeInfo.MethodParameters = function(body) { var $x = ["MethodParameters",20,body]; $x.__enum__ = jvm.klass.AttributeInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo = { __ename__ : true, __constructs__ : ["Empty","Utf8Info","IntegerInfo","FloatInfo","LongInfo","DoubleInfo","ClassInfo","StringInfo","FieldrefInfo","MethodrefInfo","InterfaceMethodrefInfo","NameAndTypeInfo","MethodHandleInfo","ConstantMethodTypeInfo","ConstantInvokeDynamicInfo"] }
jvm.klass.ConstantPoolInfo.Empty = ["Empty",0];
jvm.klass.ConstantPoolInfo.Empty.toString = $estr;
jvm.klass.ConstantPoolInfo.Empty.__enum__ = jvm.klass.ConstantPoolInfo;
jvm.klass.ConstantPoolInfo.Utf8Info = function(body) { var $x = ["Utf8Info",1,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.IntegerInfo = function(body) { var $x = ["IntegerInfo",2,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.FloatInfo = function(body) { var $x = ["FloatInfo",3,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.LongInfo = function(body) { var $x = ["LongInfo",4,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.DoubleInfo = function(body) { var $x = ["DoubleInfo",5,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.ClassInfo = function(body) { var $x = ["ClassInfo",6,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.StringInfo = function(body) { var $x = ["StringInfo",7,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.FieldrefInfo = function(body) { var $x = ["FieldrefInfo",8,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.MethodrefInfo = function(body) { var $x = ["MethodrefInfo",9,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.InterfaceMethodrefInfo = function(body) { var $x = ["InterfaceMethodrefInfo",10,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.NameAndTypeInfo = function(body) { var $x = ["NameAndTypeInfo",11,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.MethodHandleInfo = function(body) { var $x = ["MethodHandleInfo",12,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.ConstantMethodTypeInfo = function(body) { var $x = ["ConstantMethodTypeInfo",13,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.ConstantPoolInfo.ConstantInvokeDynamicInfo = function(body) { var $x = ["ConstantInvokeDynamicInfo",14,body]; $x.__enum__ = jvm.klass.ConstantPoolInfo; $x.toString = $estr; return $x; }
jvm.klass.Klass = function() {
	this.constantPool = new Array();
	this.interfaces = new Array();
	this.fields = new Array();
	this.methods = new Array();
	this.attributes = new Array();
};
jvm.klass.Klass.__name__ = true;
jvm.klass.ElementValue = { __ename__ : true, __constructs__ : ["ByteType","CharType","DoubleType","FloatType","IntType","LongType","ShortType","BooleanType","StringType","EnumType","ClassType","AnnotationType","ArrayType"] }
jvm.klass.ElementValue.ByteType = function(tag) { var $x = ["ByteType",0,tag]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.CharType = function(tag) { var $x = ["CharType",1,tag]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.DoubleType = function(tag) { var $x = ["DoubleType",2,tag]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.FloatType = function(tag) { var $x = ["FloatType",3,tag]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.IntType = function(tag) { var $x = ["IntType",4,tag]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.LongType = function(tag) { var $x = ["LongType",5,tag]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.ShortType = function(tag) { var $x = ["ShortType",6,tag]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.BooleanType = function(tag) { var $x = ["BooleanType",7,tag]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.StringType = function(tag,constValueIndex) { var $x = ["StringType",8,tag,constValueIndex]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.EnumType = function(tag,enumConstValue) { var $x = ["EnumType",9,tag,enumConstValue]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.ClassType = function(tag,classInfoIndex) { var $x = ["ClassType",10,tag,classInfoIndex]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.AnnotationType = function(tag,annotationValue) { var $x = ["AnnotationType",11,tag,annotationValue]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.ElementValue.ArrayType = function(tag,numValues,values) { var $x = ["ArrayType",12,tag,numValues,values]; $x.__enum__ = jvm.klass.ElementValue; $x.toString = $estr; return $x; }
jvm.klass.StackMapFrameEntry = { __ename__ : true, __constructs__ : ["SameFrame","SameLocals1StackItemFrame","SameLocals1StackItemFrameExtended","ChopFrame","SameFrameExtended","AppendFrame","FullFrame"] }
jvm.klass.StackMapFrameEntry.SameFrame = function(body) { var $x = ["SameFrame",0,body]; $x.__enum__ = jvm.klass.StackMapFrameEntry; $x.toString = $estr; return $x; }
jvm.klass.StackMapFrameEntry.SameLocals1StackItemFrame = function(body) { var $x = ["SameLocals1StackItemFrame",1,body]; $x.__enum__ = jvm.klass.StackMapFrameEntry; $x.toString = $estr; return $x; }
jvm.klass.StackMapFrameEntry.SameLocals1StackItemFrameExtended = function(body) { var $x = ["SameLocals1StackItemFrameExtended",2,body]; $x.__enum__ = jvm.klass.StackMapFrameEntry; $x.toString = $estr; return $x; }
jvm.klass.StackMapFrameEntry.ChopFrame = function(body) { var $x = ["ChopFrame",3,body]; $x.__enum__ = jvm.klass.StackMapFrameEntry; $x.toString = $estr; return $x; }
jvm.klass.StackMapFrameEntry.SameFrameExtended = function(body) { var $x = ["SameFrameExtended",4,body]; $x.__enum__ = jvm.klass.StackMapFrameEntry; $x.toString = $estr; return $x; }
jvm.klass.StackMapFrameEntry.AppendFrame = function(body) { var $x = ["AppendFrame",5,body]; $x.__enum__ = jvm.klass.StackMapFrameEntry; $x.toString = $estr; return $x; }
jvm.klass.StackMapFrameEntry.FullFrame = function(body) { var $x = ["FullFrame",6,body]; $x.__enum__ = jvm.klass.StackMapFrameEntry; $x.toString = $estr; return $x; }
jvm.klass.VerificationTypeInfo = { __ename__ : true, __constructs__ : ["TopVariableInfo","IntegerVariableInfo","FloatVariableInfo","DoubleVariableInfo","LongVariableInfo","NullVariableInfo","UninitializedThisVariableInfo","ObjectVariableInfo","UninitializedVariableInfo"] }
jvm.klass.VerificationTypeInfo.TopVariableInfo = function(body) { var $x = ["TopVariableInfo",0,body]; $x.__enum__ = jvm.klass.VerificationTypeInfo; $x.toString = $estr; return $x; }
jvm.klass.VerificationTypeInfo.IntegerVariableInfo = function(body) { var $x = ["IntegerVariableInfo",1,body]; $x.__enum__ = jvm.klass.VerificationTypeInfo; $x.toString = $estr; return $x; }
jvm.klass.VerificationTypeInfo.FloatVariableInfo = function(body) { var $x = ["FloatVariableInfo",2,body]; $x.__enum__ = jvm.klass.VerificationTypeInfo; $x.toString = $estr; return $x; }
jvm.klass.VerificationTypeInfo.DoubleVariableInfo = function(body) { var $x = ["DoubleVariableInfo",3,body]; $x.__enum__ = jvm.klass.VerificationTypeInfo; $x.toString = $estr; return $x; }
jvm.klass.VerificationTypeInfo.LongVariableInfo = function(body) { var $x = ["LongVariableInfo",4,body]; $x.__enum__ = jvm.klass.VerificationTypeInfo; $x.toString = $estr; return $x; }
jvm.klass.VerificationTypeInfo.NullVariableInfo = function(body) { var $x = ["NullVariableInfo",5,body]; $x.__enum__ = jvm.klass.VerificationTypeInfo; $x.toString = $estr; return $x; }
jvm.klass.VerificationTypeInfo.UninitializedThisVariableInfo = function(body) { var $x = ["UninitializedThisVariableInfo",6,body]; $x.__enum__ = jvm.klass.VerificationTypeInfo; $x.toString = $estr; return $x; }
jvm.klass.VerificationTypeInfo.ObjectVariableInfo = function(body) { var $x = ["ObjectVariableInfo",7,body]; $x.__enum__ = jvm.klass.VerificationTypeInfo; $x.toString = $estr; return $x; }
jvm.klass.VerificationTypeInfo.UninitializedVariableInfo = function(body) { var $x = ["UninitializedVariableInfo",8,body]; $x.__enum__ = jvm.klass.VerificationTypeInfo; $x.toString = $estr; return $x; }
var knockout = {}
knockout.BindingContext = function() { }
knockout.BindingContext.__name__ = true;
knockout.BindingHandlerMap = function() { }
knockout.BindingHandlerMap.__name__ = true;
var web = {}
web.Main = function() {
	this.viewModel = new web.ViewModel();
};
web.Main.__name__ = true;
web.Main.main = function() {
	var instance = new web.Main();
	ko.bindingHandlers.constantPool = new web.binding.ConstantPoolBinding();
	ko.bindingHandlers.method = new web.binding.MethodBinding();
	ko.bindingHandlers.bytecode = new web.binding.ByteCodeBinding();
	instance.init();
	instance.applyBindings();
}
web.Main.prototype = {
	readFile: function(file) {
		var _g = this;
		var reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			var source = new javap.ClassSource(data);
			var parser = new javap.ClassFileParser(source);
			var klass = parser.parse();
			_g.viewModel.klass = klass;
			_g.viewModel.minorVersion(klass.minorVersion);
			_g.viewModel.majorVersion(klass.majorVersion);
			_g.viewModel.constantPoolCount(klass.constantPoolCount);
			_g.viewModel.accessFlags(klass.accessFlags);
			_g.viewModel.thisClass(klass.thisClass);
			_g.viewModel.superClass(klass.superClass);
			_g.viewModel.interfacesCount(klass.interfacesCount);
			_g.viewModel.fieldsCount(klass.fieldsCount);
			_g.viewModel.methodsCount(klass.methodsCount);
			_g.viewModel.attributesCount(klass.attributesCount);
			_g.viewModel.constantPool.removeAll();
			_g.viewModel.interfaces.removeAll();
			_g.viewModel.fields.removeAll();
			_g.viewModel.methods.removeAll();
			_g.viewModel.attributes.removeAll();
			ko.utils.arrayPushAll(_g.viewModel.constantPool,klass.constantPool);
			ko.utils.arrayPushAll(_g.viewModel.interfaces,klass.interfaces);
			ko.utils.arrayPushAll(_g.viewModel.fields,klass.fields);
			ko.utils.arrayPushAll(_g.viewModel.methods,klass.methods);
			ko.utils.arrayPushAll(_g.viewModel.attributes,klass.attributes);
		};
		reader.readAsArrayBuffer(file);
	}
	,applyBindings: function() {
		ko.applyBindings(this.viewModel);
	}
	,init: function() {
		var _g = this;
		new $("#drop").on("dragover",null,function(event) {
			event.preventDefault();
		}).on("drop",null,function(event) {
			event.preventDefault();
			var file = event.originalEvent.dataTransfer.files[0];
			_g.readFile(file);
		});
		new $("#file").change(function(event) {
			event.preventDefault();
			var file = event.target.files[0];
			_g.readFile(file);
		});
		new $("#getFromURL").on("click",null,function() {
			var url = new $("#url").val();
			var xhr = new XMLHttpRequest();
			xhr.open("GET",url,true);
			xhr.responseType = "blob";
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xhr.onreadystatechange = function(event) {
				if(xhr.readyState == 4) {
					if(xhr.status == 200 || xhr.status == 0) _g.readFile(xhr.response); else console.log(xhr.status);
				}
			};
			xhr.send(null);
		});
	}
}
web.ViewModel = function() {
	this.minorVersion = ko.observable();
	this.majorVersion = ko.observable();
	this.constantPoolCount = ko.observable();
	this.accessFlags = ko.observable();
	this.thisClass = ko.observable();
	this.superClass = ko.observable();
	this.constantPool = ko.observableArray();
	this.interfacesCount = ko.observable();
	this.interfaces = ko.observableArray();
	this.fieldsCount = ko.observable();
	this.fields = ko.observableArray();
	this.methodsCount = ko.observable();
	this.methods = ko.observableArray();
	this.attributesCount = ko.observable();
	this.attributes = ko.observableArray();
};
web.ViewModel.__name__ = true;
web.ViewModel.prototype = {
	getConstantHref: function(index) {
		return "#constant" + index;
	}
	,getConstantType: function(tag) {
		return (function($this) {
			var $r;
			switch(tag) {
			case 1:
				$r = "CONSTANT_Utf8";
				break;
			case 3:
				$r = "CONSTANT_Integer";
				break;
			case 4:
				$r = "CONSTANT_Float";
				break;
			case 5:
				$r = "CONSTANT_Long";
				break;
			case 6:
				$r = "CONSTANT_Double";
				break;
			case 7:
				$r = "CONSTANT_Class";
				break;
			case 8:
				$r = "CONSTANT_String";
				break;
			case 9:
				$r = "CONSTANT_Fieldref";
				break;
			case 10:
				$r = "CONSTANT_Methodref";
				break;
			case 11:
				$r = "CONSTANT_InterfaceMethodref";
				break;
			case 12:
				$r = "CONSTANT_NameAndType";
				break;
			case 15:
				$r = "CONSTANT_MethodHandle";
				break;
			case 16:
				$r = "CONSTANT_MethodType";
				break;
			case 18:
				$r = "CONSTANT_InvokeDynamic";
				break;
			default:
				$r = "";
			}
			return $r;
		}(this));
	}
	,getConstantUTF8Value: function(index) {
		var pool = this.constantPool();
		return (function($this) {
			var $r;
			var _g = pool[index];
			$r = (function($this) {
				var $r;
				var $e = (_g);
				switch( $e[1] ) {
				case 1:
					var _g_eUtf8Info_0 = $e[2];
					$r = _g_eUtf8Info_0.bytes;
					break;
				default:
					$r = "";
				}
				return $r;
			}($this));
			return $r;
		}(this));
	}
	,unwrapEnum: function(info) {
		return info[2];
	}
	,getConstantPoolTemplateName: function(info) {
		return info.length > 2?"constant-" + info[2].tag:"constant-empty";
	}
	,elementValueTemplate: function(tag) {
		switch(tag) {
		case 66:case 67:case 68:case 70:case 73:case 74:case 83:case 90:case 115:
			return "elementValue-other";
		case 101:
			return "elementValue-enum";
		case 99:
			return "elementValue-class";
		case 64:
			return "elementValue-annotation";
		case 91:
			return "elementValue-array";
		default:
			throw "LinkageError";
		}
	}
}
web.binding = {}
web.binding.BindingHelper = function() { }
web.binding.BindingHelper.__name__ = true;
web.binding.BindingHelper.constantPoolLink = function(value) {
	return "<a href=\"#constant" + value + "\">" + "#" + value + "</a>";
}
web.binding.BindingHelper.escape = function(text) {
	return new $("<div>").text(text).html();
}
web.binding.ByteCodeBinding = function() {
};
web.binding.ByteCodeBinding.__name__ = true;
web.binding.ByteCodeBinding.printOperand = function(bytecode,constantPool) {
	var op0, op1, op2, op3, index;
	if(bytecode.opcode == 170) return web.binding.ByteCodeBinding.printTableSwitch(bytecode); else if(bytecode.opcode == 171) return web.binding.ByteCodeBinding.printLookupSwitch(bytecode); else if(bytecode.operand.length == 0) return ""; else if(bytecode.operand.length == 1) switch(bytecode.opcode) {
	case 16:
		return web.binding.ByteCodeBinding.signExtensionByte(bytecode.operand[0]);
	case 18:
		op0 = bytecode.operand[0];
		return web.binding.ByteCodeBinding.printConstantPoolValue(constantPool,op0);
	default:
		return Std.string(bytecode.operand[0]);
	} else if(bytecode.operand.length == 2) {
		op0 = bytecode.operand[0];
		op1 = bytecode.operand[1];
		switch(bytecode.opcode) {
		case 17:case 198:case 199:
			return web.binding.ByteCodeBinding.signExtensionShort(bytecode);
		case 19:case 178:case 179:case 180:case 181:case 182:case 183:case 184:case 187:case 189:case 192:case 193:
			index = op0 << 8 | op1;
			return web.binding.ByteCodeBinding.printConstantPoolValue(constantPool,index);
		case 132:
			return op0 + "  " + web.binding.ByteCodeBinding.signExtensionByte(op1);
		case 153:case 154:case 155:case 156:case 157:case 158:case 159:case 160:case 161:case 162:case 163:case 164:case 167:case 168:
			return Std.string(bytecode.pc + (op0 << 8 | op1));
		default:
			return op0 + ", " + op1;
		}
	} else if(bytecode.operand.length == 3) {
		op0 = bytecode.operand[0];
		op1 = bytecode.operand[1];
		op2 = bytecode.operand[2];
		index = op0 << 8 | op1;
		return web.binding.ByteCodeBinding.printConstantPoolValue(constantPool,index) + ", " + op2;
	} else if(bytecode.operand.length == 4) {
		op0 = bytecode.operand[0];
		op1 = bytecode.operand[1];
		op2 = bytecode.operand[2];
		op3 = bytecode.operand[3];
		switch(bytecode.opcode) {
		case 185:case 186:
			index = op0 << 8 | op1;
			return web.binding.ByteCodeBinding.printConstantPoolValue(constantPool,index) + ", " + op2;
		case 200:case 201:
			return Std.string(bytecode.pc + (op0 << 24 | op1 << 16 | op2 << 18 | op3));
		}
	}
	return "";
}
web.binding.ByteCodeBinding.printTableSwitch = function(bytecode) {
	var index = bytecode.pc;
	var defaultByteIndex = index + 1;
	var i = 0;
	var operand = bytecode.operand;
	while(defaultByteIndex % 4 != 0) {
		defaultByteIndex++;
		i++;
	}
	var def = operand[i] << 24 | operand[i + 1] << 16 | operand[i + 2] << 8 | operand[i + 3];
	var low = operand[i + 4] << 24 | operand[i + 5] << 16 | operand[i + 6] << 8 | operand[i + 7];
	var high = operand[i + 8] << 24 | operand[i + 9] << 16 | operand[i + 10] << 8 | operand[i + 11];
	i += 12;
	var offsetArray = new Array();
	while(i < operand.length) {
		var offset = operand[i++] << 24 | operand[i++] << 16 | operand[i++] << 8 | operand[i++];
		offsetArray.push(offset);
	}
	var print = "<div class=\"offset-table\"> { // " + low + " to " + high + "<br />";
	var _g1 = 0, _g = offsetArray.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		print += low + i1;
		print += ": ";
		print += index + offsetArray[i1];
		print += "<br />";
	}
	print += "default: ";
	print += index + def;
	print += "<br />";
	print += "}</div>";
	return print;
}
web.binding.ByteCodeBinding.printLookupSwitch = function(bytecode) {
	var index = bytecode.pc;
	var defaultByteIndex = index + 1;
	var i = 0;
	var pairArray = new Array();
	var operand = bytecode.operand;
	while(defaultByteIndex % 4 != 0) {
		defaultByteIndex++;
		i++;
	}
	var def = operand[i] << 24 | operand[i + 1] << 16 | operand[i + 2] << 8 | operand[i + 3];
	var npair = operand[i + 4] << 24 | operand[i + 5] << 16 | operand[i + 6] << 8 | operand[i + 7];
	i += 8;
	while(i < operand.length) {
		var pair = { match : operand[i++] << 24 | operand[i++] << 16 | operand[i++] << 8 | operand[i++], offset : operand[i++] << 24 | operand[i++] << 16 | operand[i++] << 8 | operand[i++]};
		pairArray.push(pair);
	}
	var print = "<div class=\"offset-table\"> { // " + npair + "<br />";
	var _g1 = 0, _g = pairArray.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		print += pairArray[i1].match;
		print += ": ";
		print += index + pairArray[i1].offset;
		print += "<br />";
	}
	print += "default: ";
	print += index + def;
	print += "<br />";
	print += "}</div>";
	return print;
}
web.binding.ByteCodeBinding.signExtensionByte = function(op0) {
	return Std.string(op0 > 127?op0 | -256:op0);
}
web.binding.ByteCodeBinding.signExtensionShort = function(bytecode) {
	var $short = bytecode.operand[0] << 8 | bytecode.operand[1];
	return Std.string($short > 32768?$short | -65536:$short);
}
web.binding.ByteCodeBinding.printConstantPoolValue = function(constantPool,index) {
	var value = constantPool[index];
	var desc = (function($this) {
		var $r;
		var $e = (value);
		switch( $e[1] ) {
		case 6:
			var value_eClassInfo_0 = $e[2];
			$r = " <span class=\"comment\">// Class " + web.binding.BindingHelper.escape(web.binding.ByteCodeBinding.printClass(constantPool,value_eClassInfo_0.nameIndex)) + "</span>";
			break;
		case 7:
			var value_eStringInfo_0 = $e[2];
			$r = " <span class=\"comment\">// String " + web.binding.BindingHelper.escape(web.binding.ByteCodeBinding.printString(constantPool,value_eStringInfo_0.stringIndex)) + "</span>";
			break;
		case 8:
			var value_eFieldrefInfo_0 = $e[2];
			$r = " <span class=\"comment\">// Field " + web.binding.BindingHelper.escape(web.binding.ByteCodeBinding.printField(constantPool,value_eFieldrefInfo_0.classIndex,value_eFieldrefInfo_0.nameAndTypeIndex)) + "</span>";
			break;
		case 9:
			var value_eMethodrefInfo_0 = $e[2];
			$r = " <span class=\"comment\">// Method " + web.binding.BindingHelper.escape(web.binding.ByteCodeBinding.printMethodref(constantPool,value_eMethodrefInfo_0.classIndex,value_eMethodrefInfo_0.nameAndTypeIndex)) + "</span>";
			break;
		case 10:
			var value_eInterfaceMethodrefInfo_0 = $e[2];
			$r = " <span class=\"comment\">// InterfaceMethod " + web.binding.BindingHelper.escape(web.binding.ByteCodeBinding.printMethodref(constantPool,value_eInterfaceMethodrefInfo_0.classIndex,value_eInterfaceMethodrefInfo_0.nameAndTypeIndex)) + "</span>";
			break;
		default:
			$r = "";
		}
		return $r;
	}(this));
	return web.binding.ByteCodeBinding.constantPoolLink(index) + desc;
}
web.binding.ByteCodeBinding.printClass = function(constantPool,nameIndex) {
	return (function($this) {
		var $r;
		var _g = constantPool[nameIndex];
		$r = (function($this) {
			var $r;
			var $e = (_g);
			switch( $e[1] ) {
			case 1:
				var _g_eUtf8Info_0 = $e[2];
				$r = _g_eUtf8Info_0.bytes;
				break;
			default:
				$r = "Error!";
			}
			return $r;
		}($this));
		return $r;
	}(this));
}
web.binding.ByteCodeBinding.printString = function(constantPool,stringIndex) {
	return (function($this) {
		var $r;
		var _g = constantPool[stringIndex];
		$r = (function($this) {
			var $r;
			var $e = (_g);
			switch( $e[1] ) {
			case 1:
				var _g_eUtf8Info_0 = $e[2];
				$r = _g_eUtf8Info_0.bytes;
				break;
			default:
				$r = "Error!";
			}
			return $r;
		}($this));
		return $r;
	}(this));
}
web.binding.ByteCodeBinding.printField = function(constantPool,classIndex,nameAndTypeIndex) {
	var className = (function($this) {
		var $r;
		var _g = constantPool[classIndex];
		$r = (function($this) {
			var $r;
			var $e = (_g);
			switch( $e[1] ) {
			case 6:
				var _g_eClassInfo_0 = $e[2];
				$r = web.binding.ByteCodeBinding.printClass(constantPool,_g_eClassInfo_0.nameIndex);
				break;
			default:
				$r = "Error!";
			}
			return $r;
		}($this));
		return $r;
	}(this));
	var nameAndType = (function($this) {
		var $r;
		var _g1 = constantPool[nameAndTypeIndex];
		$r = (function($this) {
			var $r;
			var $e = (_g1);
			switch( $e[1] ) {
			case 11:
				var _g1_eNameAndTypeInfo_0 = $e[2];
				$r = web.binding.ByteCodeBinding.printNameAndType(constantPool,_g1_eNameAndTypeInfo_0.nameIndex,_g1_eNameAndTypeInfo_0.descriptorIndex);
				break;
			default:
				$r = "Error!";
			}
			return $r;
		}($this));
		return $r;
	}(this));
	return className + "." + nameAndType;
}
web.binding.ByteCodeBinding.printMethodref = function(constantPool,classIndex,nameAndTypeIndex) {
	var className = (function($this) {
		var $r;
		var _g = constantPool[classIndex];
		$r = (function($this) {
			var $r;
			var $e = (_g);
			switch( $e[1] ) {
			case 6:
				var _g_eClassInfo_0 = $e[2];
				$r = web.binding.ByteCodeBinding.printClass(constantPool,_g_eClassInfo_0.nameIndex);
				break;
			default:
				$r = "Error!";
			}
			return $r;
		}($this));
		return $r;
	}(this));
	var nameAndType = (function($this) {
		var $r;
		var _g1 = constantPool[nameAndTypeIndex];
		$r = (function($this) {
			var $r;
			var $e = (_g1);
			switch( $e[1] ) {
			case 11:
				var _g1_eNameAndTypeInfo_0 = $e[2];
				$r = web.binding.ByteCodeBinding.printNameAndType(constantPool,_g1_eNameAndTypeInfo_0.nameIndex,_g1_eNameAndTypeInfo_0.descriptorIndex);
				break;
			default:
				$r = "Error!";
			}
			return $r;
		}($this));
		return $r;
	}(this));
	return className + "." + nameAndType;
}
web.binding.ByteCodeBinding.printNameAndType = function(constantPool,nameIndex,descriptorIndex) {
	var name = (function($this) {
		var $r;
		var _g = constantPool[nameIndex];
		$r = (function($this) {
			var $r;
			var $e = (_g);
			switch( $e[1] ) {
			case 1:
				var _g_eUtf8Info_0 = $e[2];
				$r = _g_eUtf8Info_0.bytes;
				break;
			default:
				$r = "Error!";
			}
			return $r;
		}($this));
		return $r;
	}(this));
	var desc = (function($this) {
		var $r;
		var _g1 = constantPool[descriptorIndex];
		$r = (function($this) {
			var $r;
			var $e = (_g1);
			switch( $e[1] ) {
			case 1:
				var _g1_eUtf8Info_0 = $e[2];
				$r = _g1_eUtf8Info_0.bytes;
				break;
			default:
				$r = "Error!";
			}
			return $r;
		}($this));
		return $r;
	}(this));
	return name + ":" + desc;
}
web.binding.ByteCodeBinding.constantPoolLink = function(value) {
	return "<a href=\"#constant" + Std.string(value) + "\">" + "#" + Std.string(value) + "</a>";
}
web.binding.ByteCodeBinding.prototype = {
	update: function(element,valueAccessor,allBindingsAccessor,viewModel,bindingContext) {
		var value = valueAccessor();
		if(value != null) {
			var name = javap.ByteCodeParser.get_PARSER()[value.opcode].name;
			var operand = web.binding.ByteCodeBinding.printOperand(value,bindingContext.$root.klass.constantPool);
			new $(element).html(name + "<span class=\"operand\">" + operand + "</span>");
		} else new $(element).text("");
	}
	,init: function(element,valueAccessor,allBindingsAccessor,viewModel,bindingContext) {
	}
}
web.binding.ConstantPoolBinding = function() {
};
web.binding.ConstantPoolBinding.__name__ = true;
web.binding.ConstantPoolBinding.prototype = {
	update: function(element,valueAccessor,allBindingsAccessor,viewModel,bindingContext) {
		var value = valueAccessor();
		if(value != null && value != "") new $(element).html(web.binding.BindingHelper.constantPoolLink(value)); else new $(element).html("");
	}
	,init: function(element,valueAccessor,allBindingsAccessor,viewModel,bindingContext) {
	}
}
web.binding.MethodBinding = function() {
};
web.binding.MethodBinding.__name__ = true;
web.binding.MethodBinding.prototype = {
	update: function(element,valueAccessor,allBindingsAccessor,viewModel,bindingContext) {
		var value = valueAccessor();
		if(value != null) new $(element).text(bindingContext.$root.getConstantUTF8Value(value.nameIndex) + bindingContext.$root.getConstantUTF8Value(value.descriptorIndex)); else new $(element).text("");
	}
	,init: function(element,valueAccessor,allBindingsAccessor,viewModel,bindingContext) {
	}
}
String.__name__ = true;
Array.__name__ = true;
web.Main.main();
})();

//@ sourceMappingURL=App.js.map