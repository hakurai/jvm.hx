package javap;
import internal.html.DataView;
class ClassSource {

    var dataView:DataView;
    var offset:Int = 0;

    public function new(binary:Dynamic) {
        dataView = new DataView(binary);
    }

    public function readU1():Int {
        var byte = dataView.getInt8(offset) & 0x000000FF;
        offset += 1;
        return byte;
    }

    public function readU2():Int {
        var bytes = dataView.getUint16(offset, false) & 0x0000FFFF;
        offset += 2;
        return bytes;
    }

    public function readU4():Int {
        var bytes = dataView.getUint32(offset, false);
        offset += 4;
        return bytes;
    }
}
