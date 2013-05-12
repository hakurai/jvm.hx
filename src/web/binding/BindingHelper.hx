package web.binding;
import jQuery.JQuery;
class BindingHelper {

    public static function constantPoolLink(value:String):String {
        return '<a href="#constant' + value + '">' + '#' + value + '</a>';
    }

    public static function escape(text:String):String {
        return new JQuery("<div>").text(text).html();
    }
}
