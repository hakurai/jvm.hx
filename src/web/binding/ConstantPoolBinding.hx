package web.binding;
import js.html.Element;
import web.binding.BindingHelper;
import knockout.BindingContext;
import jQuery.JQuery;

class ConstantPoolBinding {
    public function new() {
    }

    public function init(element:Element, valueAccessor:Void -> Dynamic, allBindingsAccessor:Void -> Dynamic, viewModel:Dynamic, bindingContext:BindingContext):Void{
    }

    public function update(element:Element, valueAccessor:Void -> Dynamic, allBindingsAccessor:Void -> Dynamic, viewModel:Dynamic, bindingContext:BindingContext):Void {
        var value = valueAccessor();
        if (value != null && value != '') {
            new JQuery(element).html(BindingHelper.constantPoolLink(value));
        } else {
            new JQuery(element).html('');
        }
    }
}
