package internal.html;

@:native("DataView")
extern
class DataView {

    public function new(buffer:Dynamic):Void;

    public function getInt8( byteOffset:Int ):Int;

    public function getUint16( byteOffset:Int, ?littleEndian:Bool ):Int;

    public function getUint32( byteOffset:Int, ?littleEndian:Bool ):Int;
}
