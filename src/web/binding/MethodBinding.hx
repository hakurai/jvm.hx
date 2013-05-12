package web.binding;
import js.html.Element;
import knockout.BindingContext;
import jQuery.JQuery;
class MethodBinding {
    public function new() {
    }

    public function init(element:Element, valueAccessor:Void -> Dynamic, allBindingsAccessor:Void -> Dynamic, viewModel:Dynamic, bindingContext:BindingContext):Void{
    }

    public function update(element:Element, valueAccessor:Void -> Dynamic, allBindingsAccessor:Void -> Dynamic, viewModel:Dynamic, bindingContext:BindingContext):Void {
        var value = valueAccessor();
        if (value != null) {
            new JQuery(element).text(
                bindingContext.root.getConstantUTF8Value(value.nameIndex) +
                bindingContext.root.getConstantUTF8Value(value.descriptorIndex)
            );
        } else {
            new JQuery(element).text('');
        }
    }
}
